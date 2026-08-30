using Backend.Domain.Common;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities;

public sealed class Budget : AuditableEntity
{
    public Guid UserId { get; private set; }

    public Guid CategoryId { get; private set; }

    public decimal Amount { get; private set; }

    public BudgetPeriod Period { get; private set; }

    public bool IsActive { get; private set; }

    public Category? Category { get; private set; }

    private Budget()
    {
    }

    private Budget(Guid userId, Guid categoryId, decimal amount, BudgetPeriod period)
    {
        if (userId == Guid.Empty)
        {
            throw new ArgumentException("User ID cannot be empty.", nameof(userId));
        }

        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("Category ID cannot be empty.", nameof(categoryId));
        }

        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Budget amount must be greater than zero.");
        }

        UserId = userId;
        CategoryId = categoryId;
        Amount = decimal.Round(amount, 2, MidpointRounding.AwayFromZero);
        Period = period;
        IsActive = true;
    }

    public static Budget Create(Guid userId, Guid categoryId, decimal amount, BudgetPeriod period = BudgetPeriod.Monthly)
    {
        return new Budget(userId, categoryId, amount, period);
    }

    public void UpdateDetails(Guid categoryId, decimal amount, BudgetPeriod period)
    {
        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("Category ID cannot be empty.", nameof(categoryId));
        }

        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Budget amount must be greater than zero.");
        }

        CategoryId = categoryId;
        Amount = decimal.Round(amount, 2, MidpointRounding.AwayFromZero);
        Period = period;

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
}

