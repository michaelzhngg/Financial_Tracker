using Backend.Application.Common;
using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.ValueObjects;

namespace Backend.Application.Services;

public sealed class AccountService : IAccountService
{
    private readonly IAccountRepository _accounts;
    private readonly ITransactionRepository _transactions;
    private readonly IUnitOfWork _unitOfWork;

    public AccountService(IAccountRepository accounts, ITransactionRepository transactions, IUnitOfWork unitOfWork)
    {
        _accounts = accounts;
        _transactions = transactions;
        _unitOfWork = unitOfWork;
    }

    public async Task<IReadOnlyList<AccountDto>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default)
    {
        var accounts = await _accounts.ListAsync(userId, includeInactive, cancellationToken);

        return accounts.Select(account => account.ToDto()).ToList();
    }

    public async Task<AccountDto> GetAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default)
    {
        var account = await GetOwnedAsync(userId, accountId, cancellationToken);

        return account.ToDto();
    }

    public async Task<AccountDto> CreateAsync(Guid userId, CreateAccountRequest request, CancellationToken cancellationToken = default)
    {
        if (await _accounts.NameExistsAsync(userId, request.Name.Trim(), null, cancellationToken))
        {
            throw new AppValidationException($"An account named '{request.Name.Trim()}' already exists.");
        }

        var currency = CreateCurrency(request.Currency);
        var account = Account.Create(userId, request.Name, request.Type, currency, decimal.Round(request.InitialBalance, 2, MidpointRounding.AwayFromZero));

        await _accounts.AddAsync(account, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return account.ToDto();
    }

    public async Task<AccountDto> UpdateAsync(Guid userId, Guid accountId, UpdateAccountRequest request, CancellationToken cancellationToken = default)
    {
        var account = await GetOwnedAsync(userId, accountId, cancellationToken);

        if (await _accounts.NameExistsAsync(userId, request.Name.Trim(), accountId, cancellationToken))
        {
            throw new AppValidationException($"An account named '{request.Name.Trim()}' already exists.");
        }

        account.UpdateDetails(request.Name, request.Type, CreateCurrency(request.Currency));

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return account.ToDto();
    }

    public async Task<AccountDto> SetActiveAsync(Guid userId, Guid accountId, bool isActive, CancellationToken cancellationToken = default)
    {
        var account = await GetOwnedAsync(userId, accountId, cancellationToken);

        if (isActive)
        {
            account.Reactivate();
        }
        else
        {
            account.Deactivate();
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return account.ToDto();
    }

    public async Task<TransactionDto> AdjustBalanceAsync(Guid userId, Guid accountId, AdjustBalanceRequest request, CancellationToken cancellationToken = default)
    {
        var account = await GetOwnedAsync(userId, accountId, cancellationToken);

        var actual = decimal.Round(request.ActualBalance, 2, MidpointRounding.AwayFromZero);
        var difference = actual - decimal.Round(account.Balance, 2, MidpointRounding.AwayFromZero);

        if (difference == 0)
        {
            throw new AppValidationException("The recorded balance already matches the actual balance.");
        }

        var adjustment = Transaction.CreateAdjustment(
            userId,
            accountId,
            difference,
            request.Reason,
            request.Date ?? DateTimeOffset.Now);

        account.AdjustBalance(difference);

        await _transactions.AddAsync(adjustment, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var saved = await _transactions.GetAsync(userId, adjustment.Id, cancellationToken);

        return (saved ?? adjustment).ToDto();
    }

    public async Task DeleteAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default)
    {
        var account = await GetOwnedAsync(userId, accountId, cancellationToken);

        if (await _transactions.AnyForAccountAsync(userId, accountId, cancellationToken))
        {
            throw new AppValidationException("This account has transactions and cannot be deleted. Deactivate it instead.");
        }

        _accounts.Remove(account);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    private async Task<Account> GetOwnedAsync(Guid userId, Guid accountId, CancellationToken cancellationToken)
    {
        return await _accounts.GetAsync(userId, accountId, cancellationToken)
            ?? throw new NotFoundException("Account not found.");
    }

    private static Currency CreateCurrency(string code)
    {
        try
        {
            return Currency.Create(code);
        }
        catch (ArgumentException exception)
        {
            throw new AppValidationException(exception.Message);
        }
    }
}

