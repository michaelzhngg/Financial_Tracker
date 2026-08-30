using Backend.Domain.Common;
using Backend.Domain.Enums;
using Backend.Domain.ValueObjects;

namespace Backend.Domain.Entities;

public sealed class Account : AuditableEntity
{
    public Guid UserId { get; private set; }

    public string Name { get; private set; }

    public AccountType Type { get; private set; }

    public Currency Currency { get; private set; }

    public decimal Balance { get; private set; }

    public bool IsActive { get; private set; }

    private Account()
    {
        Name = string.Empty;
        Currency = Currency.Create("MYR");
    }

    private Account(
        Guid userId,
        string name,
        AccountType type,
        Currency currency,
        decimal initialBalance)
    {
        if (userId == Guid.Empty)
        {
            throw new ArgumentException(
                "User ID cannot be empty.",
                nameof(userId));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Account name cannot be empty.",
                nameof(name));
        }

        UserId = userId;
        Name = name.Trim();
        Type = type;
        Currency = currency;
        Balance = initialBalance;
        IsActive = true;
    }

    public static Account Create(
        Guid userId,
        string name,
        AccountType type,
        Currency currency,
        decimal initialBalance = 0)
    {
        return new Account(
            userId,
            name,
            type,
            currency,
            initialBalance);
    }

    public void Deposit(decimal amount)
    {
        ValidatePositiveAmount(amount);

        Balance += amount;

        MarkAsUpdated();
    }

    public void Withdraw(decimal amount)
    {
        ValidatePositiveAmount(amount);

        Balance -= amount;

        MarkAsUpdated();
    }

    public void AdjustBalance(decimal difference)
    {
        if (difference == 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(difference),
                "Balance adjustment cannot be zero.");
        }

        Balance += difference;

        MarkAsUpdated();
    }

    public void UpdateDetails(string name, AccountType type, Currency currency)
    {
        UpdateName(name);

        Type = type;
        Currency = currency;

        MarkAsUpdated();
    }

    public void UpdateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException(
                "Account name cannot be empty.",
                nameof(name));
        }

        Name = name.Trim();

        MarkAsUpdated();
    }

    public void Deactivate()
    {
        IsActive = false;

        MarkAsUpdated();
    }

    public void Reactivate()
    {
        IsActive = true;

        MarkAsUpdated();
    }

    private static void ValidatePositiveAmount(decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(amount),
                "Amount must be greater than zero.");
        }
    }
}

