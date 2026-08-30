using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.DTOs;

public sealed record BudgetDto(
    Guid Id,
    Guid CategoryId,
    string CategoryName,
    string CategoryColor,
    decimal Amount,
    BudgetPeriod Period,
    string PeriodName,
    bool IsActive,
    decimal Spent,
    decimal Remaining,
    decimal PercentUsed,
    int DaysRemaining,
    int TotalDaysInPeriod,
    decimal DailyAllowance,
    bool IsOverBudget,
    DateTimeOffset PeriodStart,
    DateTimeOffset PeriodEnd);

public sealed record SaveBudgetRequest
{
    [Required]
    public Guid CategoryId { get; init; }

    [Range(0.01, 999999999)]
    public decimal Amount { get; init; }

    public BudgetPeriod Period { get; init; } = BudgetPeriod.Monthly;
}

