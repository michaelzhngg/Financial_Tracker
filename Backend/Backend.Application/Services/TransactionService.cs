using Backend.Application.Common;
using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public sealed class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactions;
    private readonly IAccountRepository _accounts;
    private readonly ICategoryRepository _categories;
    private readonly IReceiptRepository _receipts;
    private readonly IUnitOfWork _unitOfWork;

    public TransactionService(
        ITransactionRepository transactions,
        IAccountRepository accounts,
        ICategoryRepository categories,
        IReceiptRepository receipts,
        IUnitOfWork unitOfWork)
    {
        _transactions = transactions;
        _accounts = accounts;
        _categories = categories;
        _receipts = receipts;
        _unitOfWork = unitOfWork;
    }

    public async Task<PagedResult<TransactionDto>> ListAsync(Guid userId, TransactionFilter filter, CancellationToken cancellationToken = default)
    {
        var query = ApplyFilter(_transactions.Query(userId), filter);

        var totalCount = await query.CountAsync(cancellationToken);
        var page = Math.Max(1, filter.Page);
        var pageSize = Math.Clamp(filter.PageSize, 1, 500);

        var items = await query
            .OrderByDescending(transaction => transaction.TransactionDate)
            .ThenByDescending(transaction => transaction.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<TransactionDto>(items.Select(item => item.ToDto()).ToList(), page, pageSize, totalCount);
    }

    public async Task<TransactionDto> GetAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken = default)
    {
        var transaction = await GetOwnedAsync(userId, transactionId, cancellationToken);

        return transaction.ToDto();
    }

    public async Task<TransactionDto> CreateAsync(Guid userId, CreateTransactionRequest request, CancellationToken cancellationToken = default)
    {
        if (request.Type == TransactionType.Adjustment)
        {
            throw new AppValidationException("Use the account balance adjustment endpoint to record adjustments.");
        }

        var hasReceipt = request.Receipt is not null && request.Receipt.Items.Count > 0;

        if (hasReceipt && request.Type == TransactionType.Transfer)
        {
            throw new AppValidationException("Receipts cannot be attached to transfer transactions.");
        }

        var date = request.TransactionDate ?? DateTimeOffset.Now;
        var account = await RequireActiveAccountAsync(userId, request.AccountId, cancellationToken);

        var amount = request.Amount;

        if (hasReceipt)
        {
            // The transaction does not exist yet, so compute the total from the
            // request first; the real receipt is built once the id is known.
            amount = CalculateReceiptTotal(request.Receipt!);

            if (amount <= 0)
            {
                throw new AppValidationException("Receipt total must be greater than zero.");
            }
        }

        Transaction transaction;

        switch (request.Type)
        {
            case TransactionType.Income:
            case TransactionType.Expense:
            {
                var expectedType = request.Type == TransactionType.Income ? CategoryType.Income : CategoryType.Expense;
                var category = await RequireCategoryAsync(userId, request.CategoryId, expectedType, cancellationToken);

                if (request.Type == TransactionType.Expense)
                {
                    EnsureSufficientBalance(account, amount);
                }

                transaction = request.Type == TransactionType.Income
                    ? Transaction.CreateIncome(userId, account.Id, category.Id, amount, request.Description, date)
                    : Transaction.CreateExpense(userId, account.Id, category.Id, amount, request.Description, date);
                break;
            }

            case TransactionType.Transfer:
            {
                if (request.ToAccountId is null)
                {
                    throw new AppValidationException("A destination account is required for transfers.");
                }

                var destination = await RequireActiveAccountAsync(userId, request.ToAccountId.Value, cancellationToken);

                if (destination.Id == account.Id)
                {
                    throw new AppValidationException("Source and destination accounts must be different.");
                }

                EnsureSufficientBalance(account, amount);

                transaction = Transaction.CreateTransfer(userId, account.Id, destination.Id, amount, request.Description, date);
                break;
            }

            default:
                throw new AppValidationException("Unsupported transaction type.");
        }

        await ApplyToBalancesAsync(userId, transaction, 1, cancellationToken);

        await _transactions.AddAsync(transaction, cancellationToken);

        if (hasReceipt)
        {
            var receipt = BuildReceipt(transaction.Id, request.Receipt!);
            await _receipts.AddAsync(receipt, cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var saved = await _transactions.GetAsync(userId, transaction.Id, cancellationToken);

        return (saved ?? transaction).ToDto();
    }

    public async Task<TransactionDto> UpdateAsync(Guid userId, Guid transactionId, UpdateTransactionRequest request, CancellationToken cancellationToken = default)
    {
        var transaction = await GetOwnedAsync(userId, transactionId, cancellationToken);

        if (transaction.Type == TransactionType.Adjustment)
        {
            throw new AppValidationException("Balance adjustments cannot be edited. Delete it and record a new adjustment.");
        }

        var hasReceipt = request.Receipt is not null && request.Receipt.Items.Count > 0;

        if (hasReceipt && transaction.Type == TransactionType.Transfer)
        {
            throw new AppValidationException("Receipts cannot be attached to transfer transactions.");
        }

        // Roll the old balance effect back before applying the new one.
        await ApplyToBalancesAsync(userId, transaction, -1, cancellationToken);

        var account = await RequireActiveAccountAsync(userId, request.AccountId, cancellationToken);
        Guid? toAccountId = null;
        Guid? categoryId = null;

        if (transaction.Type == TransactionType.Transfer)
        {
            if (request.ToAccountId is null)
            {
                throw new AppValidationException("A destination account is required for transfers.");
            }

            var destination = await RequireActiveAccountAsync(userId, request.ToAccountId.Value, cancellationToken);

            if (destination.Id == account.Id)
            {
                throw new AppValidationException("Source and destination accounts must be different.");
            }

            toAccountId = destination.Id;
        }
        else
        {
            var expectedType = transaction.Type == TransactionType.Income ? CategoryType.Income : CategoryType.Expense;
            var category = await RequireCategoryAsync(userId, request.CategoryId, expectedType, cancellationToken);

            categoryId = category.Id;
        }

        var amount = request.Amount;

        if (hasReceipt)
        {
            var existingReceipt = transaction.Receipt;

            if (existingReceipt is not null)
            {
                var items = request.Receipt!.Items.Select((item, index) =>
                    ReceiptItem.Create(item.Name, item.Quantity, item.UnitPrice, index));

                var charges = request.Receipt!.Charges.Select((charge, index) =>
                    ReceiptCharge.Create(charge.Label, charge.Type, charge.Value, index));

                existingReceipt.Replace(request.Receipt.Merchant, request.Receipt.Notes, items, charges);
                amount = existingReceipt.Total;
            }
            else
            {
                var receipt = BuildReceipt(transaction.Id, request.Receipt!);
                amount = receipt.Total;
                await _receipts.AddAsync(receipt, cancellationToken);
            }

            if (amount <= 0)
            {
                throw new AppValidationException("Receipt total must be greater than zero.");
            }
        }
        else if (transaction.Receipt is not null)
        {
            _receipts.Remove(transaction.Receipt);
        }

        // Check overdraft after computing final amount but before updating transaction.
        // The old balance effect was already reverted, so account.Balance reflects
        // the state as if this transaction didn't exist.
        if (transaction.Type == TransactionType.Expense || transaction.Type == TransactionType.Transfer)
        {
            EnsureSufficientBalance(account, amount);
        }

        try
        {
            transaction.UpdateDetails(
                account.Id,
                toAccountId,
                categoryId,
                amount,
                request.Description,
                request.TransactionDate ?? transaction.TransactionDate);
        }
        catch (Exception exception) when (exception is ArgumentException or ArgumentOutOfRangeException)
        {
            throw new AppValidationException(exception.Message);
        }

        await ApplyToBalancesAsync(userId, transaction, 1, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var saved = await _transactions.GetAsync(userId, transaction.Id, cancellationToken);

        return (saved ?? transaction).ToDto();
    }

    public async Task DeleteAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken = default)
    {
        var transaction = await GetOwnedAsync(userId, transactionId, cancellationToken);

        await ApplyToBalancesAsync(userId, transaction, -1, cancellationToken);

        _transactions.Remove(transaction);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    private static IQueryable<Transaction> ApplyFilter(IQueryable<Transaction> query, TransactionFilter filter)
    {
        if (filter.From is { } from)
        {
            query = query.Where(transaction => transaction.TransactionDate >= from);
        }

        if (filter.To is { } to)
        {
            query = query.Where(transaction => transaction.TransactionDate <= to);
        }

        if (filter.AccountId is { } accountId)
        {
            query = query.Where(transaction => transaction.AccountId == accountId || transaction.ToAccountId == accountId);
        }

        if (filter.CategoryId is { } categoryId)
        {
            query = query.Where(transaction => transaction.CategoryId == categoryId);
        }

        if (filter.Type is { } type)
        {
            query = query.Where(transaction => transaction.Type == type);
        }

        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var search = filter.Search.Trim();
            query = query.Where(transaction => EF.Functions.Like(transaction.Description, $"%{search}%"));
        }

        return query;
    }

    /// <summary>
    /// Applies (direction 1) or reverses (direction -1) the transaction's effect on account balances.
    /// </summary>
    private async Task ApplyToBalancesAsync(Guid userId, Transaction transaction, int direction, CancellationToken cancellationToken)
    {
        var source = await _accounts.GetAsync(userId, transaction.AccountId, cancellationToken)
            ?? throw new NotFoundException("Account not found.");

        source.AdjustBalance(transaction.SignedAmountForSourceAccount * direction);

        if (transaction.Type == TransactionType.Transfer && transaction.ToAccountId is { } toAccountId)
        {
            var destination = await _accounts.GetAsync(userId, toAccountId, cancellationToken)
                ?? throw new NotFoundException("Destination account not found.");

            destination.AdjustBalance(transaction.Amount * direction);
        }
    }

    private async Task<Account> RequireActiveAccountAsync(Guid userId, Guid accountId, CancellationToken cancellationToken)
    {
        var account = await _accounts.GetAsync(userId, accountId, cancellationToken)
            ?? throw new NotFoundException("Account not found.");

        if (!account.IsActive)
        {
            throw new AppValidationException($"Account '{account.Name}' is deactivated.");
        }

        return account;
    }

    private async Task<Category> RequireCategoryAsync(Guid userId, Guid? categoryId, CategoryType expectedType, CancellationToken cancellationToken)
    {
        if (categoryId is null || categoryId == Guid.Empty)
        {
            throw new AppValidationException("A category is required for income and expense transactions.");
        }

        var category = await _categories.GetAsync(userId, categoryId.Value, cancellationToken)
            ?? throw new NotFoundException("Category not found.");

        if (category.Type != expectedType)
        {
            throw new AppValidationException($"Category '{category.Name}' is not an {expectedType.ToString().ToLowerInvariant()} category.");
        }

        if (!category.IsActive)
        {
            throw new AppValidationException($"Category '{category.Name}' is deactivated.");
        }

        return category;
    }

    private async Task<Transaction> GetOwnedAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken)
    {
        return await _transactions.GetAsync(userId, transactionId, cancellationToken)
            ?? throw new NotFoundException("Transaction not found.");
    }

    private static Receipt BuildReceipt(Guid transactionId, ReceiptRequest request)
    {
        var items = request.Items.Select((item, index) =>
            ReceiptItem.Create(item.Name, item.Quantity, item.UnitPrice, index));

        var charges = request.Charges.Select((charge, index) =>
            ReceiptCharge.Create(charge.Label, charge.Type, charge.Value, index));

        return Receipt.Create(transactionId, request.Merchant, request.Notes, items, charges);
    }

    /// <summary>
    /// Computes a receipt total from the raw request, for use before the owning
    /// transaction exists. Mirrors <see cref="Receipt"/>'s own rounding.
    /// </summary>
    private static decimal CalculateReceiptTotal(ReceiptRequest request)
    {
        var subtotal = decimal.Round(
            request.Items.Sum(item => ReceiptItem.Create(item.Name, item.Quantity, item.UnitPrice, 0).LineTotal),
            2,
            MidpointRounding.AwayFromZero);

        var chargesTotal = decimal.Round(
            request.Charges.Sum(charge =>
                ReceiptCharge.Create(charge.Label, charge.Type, charge.Value, 0).ResolveAmount(subtotal)),
            2,
            MidpointRounding.AwayFromZero);

        return decimal.Round(subtotal + chargesTotal, 2, MidpointRounding.AwayFromZero);
    }

    /// <summary>
    /// Throws if the withdrawal would overdraw the account.
    /// Credit cards are exempt (they carry negative balances by design).
    /// Balance adjustments are exempt (they force the balance to match reality).
    /// </summary>
    private static void EnsureSufficientBalance(Account account, decimal withdrawalAmount)
    {
        if (account.Type == AccountType.CreditCard)
        {
            return;
        }

        var resultingBalance = account.Balance - withdrawalAmount;

        if (resultingBalance < 0)
        {
            var available = decimal.Round(account.Balance, 2, MidpointRounding.AwayFromZero);
            var required = decimal.Round(withdrawalAmount, 2, MidpointRounding.AwayFromZero);

            throw new AppValidationException(
                $"This transaction exceeds the available balance in '{account.Name}'. Available: {available}, required: {required}.");
        }
    }
}

