using Backend.Domain.Common;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities;

public sealed class Transaction : AuditableEntity
{
    public Guid UserId { get; private set; }

    public TransactionType Type { get; private set; }

    /// <summary>
    /// Source account. Money leaves this account for expenses and transfers,
    /// and enters it for income.
    /// </summary>
    public Guid AccountId { get; private set; }

    /// <summary>
    /// Destination account, only used by transfers.
    /// </summary>
    public Guid? ToAccountId { get; private set; }

    public Guid? CategoryId { get; private set; }

    /// <summary>
    /// Always a positive monetary value. The transaction type (and
    /// <see cref="IsIncrease"/> for adjustments) decides the balance direction.
    /// </summary>
    public decimal Amount { get; private set; }

    /// <summary>
    /// Only used by balance adjustments: true when the adjustment increases the
    /// recorded balance, false when it decreases it.
    /// </summary>
    public bool? IsIncrease { get; private set; }

    public string Description { get; private set; }

    public DateTimeOffset TransactionDate { get; private set; }

    public Account? Account { get; private set; }

    public Account? ToAccount { get; private set; }

    public Category? Category { get; private set; }

    public Receipt? Receipt { get; private set; }

    private Transaction()
    {
        Description = string.Empty;
    }

    private Transaction(
        Guid userId,
        TransactionType type,
        Guid accountId,
        Guid? toAccountId,
        Guid? categoryId,
        decimal amount,
        bool? isIncrease,
        string? description,
        DateTimeOffset transactionDate)
    {
        if (userId == Guid.Empty)
        {
            throw new ArgumentException("User ID cannot be empty.", nameof(userId));
        }

        if (accountId == Guid.Empty)
        {
            throw new ArgumentException("Account ID cannot be empty.", nameof(accountId));
        }

        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount must be greater than zero.");
        }

        switch (type)
        {
            case TransactionType.Income:
            case TransactionType.Expense:
                if (categoryId is null || categoryId == Guid.Empty)
                {
                    throw new ArgumentException("A category is required for income and expense transactions.", nameof(categoryId));
                }

                toAccountId = null;
                isIncrease = null;
                break;

            case TransactionType.Transfer:
                if (toAccountId is null || toAccountId == Guid.Empty)
                {
                    throw new ArgumentException("A destination account is required for transfers.", nameof(toAccountId));
                }

                if (toAccountId == accountId)
                {
                    throw new ArgumentException("Source and destination accounts must be different.", nameof(toAccountId));
                }

                categoryId = null;
                isIncrease = null;
                break;

            case TransactionType.Adjustment:
                if (isIncrease is null)
                {
                    throw new ArgumentException("Adjustment direction is required.", nameof(isIncrease));
                }

                categoryId = null;
                toAccountId = null;
                break;

            default:
                throw new ArgumentOutOfRangeException(nameof(type), "Unsupported transaction type.");
        }

        UserId = userId;
        Type = type;
        AccountId = accountId;
        ToAccountId = toAccountId;
        CategoryId = categoryId;
        Amount = decimal.Round(amount, 2, MidpointRounding.AwayFromZero);
        IsIncrease = isIncrease;
        Description = description?.Trim() ?? string.Empty;
        TransactionDate = transactionDate;
    }

    public static Transaction CreateIncome(Guid userId, Guid accountId, Guid categoryId, decimal amount, string? description, DateTimeOffset transactionDate)
    {
        return new Transaction(userId, TransactionType.Income, accountId, null, categoryId, amount, null, description, transactionDate);
    }

    public static Transaction CreateExpense(Guid userId, Guid accountId, Guid categoryId, decimal amount, string? description, DateTimeOffset transactionDate)
    {
        return new Transaction(userId, TransactionType.Expense, accountId, null, categoryId, amount, null, description, transactionDate);
    }

    public static Transaction CreateTransfer(Guid userId, Guid fromAccountId, Guid toAccountId, decimal amount, string? description, DateTimeOffset transactionDate)
    {
        return new Transaction(userId, TransactionType.Transfer, fromAccountId, toAccountId, null, amount, null, description, transactionDate);
    }

    public static Transaction CreateAdjustment(Guid userId, Guid accountId, decimal difference, string? reason, DateTimeOffset transactionDate)
    {
        if (difference == 0)
        {
            throw new ArgumentOutOfRangeException(nameof(difference), "Balance adjustment cannot be zero.");
        }

        return new Transaction(userId, TransactionType.Adjustment, accountId, null, null, Math.Abs(difference), difference > 0, reason, transactionDate);
    }

    /// <summary>
    /// The signed effect this transaction has on <see cref="AccountId"/>.
    /// </summary>
    public decimal SignedAmountForSourceAccount => Type switch
    {
        TransactionType.Income => Amount,
        TransactionType.Expense => -Amount,
        TransactionType.Transfer => -Amount,
        TransactionType.Adjustment => IsIncrease == true ? Amount : -Amount,
        _ => 0m
    };

    public void UpdateDetails(Guid accountId, Guid? toAccountId, Guid? categoryId, decimal amount, string? description, DateTimeOffset transactionDate)
    {
        var replacement = new Transaction(UserId, Type, accountId, toAccountId, categoryId, amount, IsIncrease, description, transactionDate);

        AccountId = replacement.AccountId;
        ToAccountId = replacement.ToAccountId;
        CategoryId = replacement.CategoryId;
        Amount = replacement.Amount;
        Description = replacement.Description;
        TransactionDate = replacement.TransactionDate;

        MarkAsUpdated();
    }
}
