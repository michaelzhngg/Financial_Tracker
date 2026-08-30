namespace Backend.Application.DTOs;

public sealed record CategorySpendDto(
    Guid CategoryId,
    string CategoryName,
    string CategoryColor,
    decimal Amount,
    decimal PercentOfTotal);

public sealed record AccountBalanceDto(
    Guid AccountId,
    string AccountName,
    string Currency,
    decimal Balance);

public sealed record MonthlySummaryDto(
    int Year,
    int Month,
    string MonthLabel,
    decimal TotalIncome,
    decimal TotalExpenses,
    decimal NetChange,
    decimal TotalAdjustments,
    decimal TotalTransfers,
    int TransactionCount,
    IReadOnlyList<CategorySpendDto> SpendingByCategory,
    IReadOnlyList<CategorySpendDto> IncomeByCategory);

public sealed record DashboardDto(
    string BaseCurrency,
    decimal TotalBalance,
    IReadOnlyList<AccountBalanceDto> Accounts,
    IReadOnlyDictionary<string, decimal> BalanceByCurrency,
    MonthlySummaryDto CurrentMonth,
    IReadOnlyList<BudgetDto> Budgets,
    IReadOnlyList<TransactionDto> RecentTransactions);
