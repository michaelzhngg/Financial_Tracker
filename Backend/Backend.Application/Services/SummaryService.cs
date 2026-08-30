using Backend.Application.Common;
using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public sealed class SummaryService : ISummaryService
{
    private readonly ITransactionRepository _transactions;
    private readonly IAccountRepository _accounts;
    private readonly IBudgetRepository _budgets;
    private readonly IUserRepository _users;
    private readonly BudgetService _budgetService;

    public SummaryService(
        ITransactionRepository transactions,
        IAccountRepository accounts,
        IBudgetRepository budgets,
        IUserRepository users,
        BudgetService budgetService)
    {
        _transactions = transactions;
        _accounts = accounts;
        _budgets = budgets;
        _users = users;
        _budgetService = budgetService;
    }

    public async Task<MonthlySummaryDto> GetMonthlySummaryAsync(Guid userId, int year, int month, CancellationToken cancellationToken = default)
    {
        if (month is < 1 or > 12)
        {
            throw new AppValidationException("Month must be between 1 and 12.");
        }

        if (year is < 1900 or > 9999)
        {
            throw new AppValidationException("Year is out of range.");
        }

        var start = new DateTimeOffset(new DateTime(year, month, 1), DateTimeOffset.Now.Offset);
        var end = start.AddMonths(1);

        var transactions = await _transactions.Query(userId)
            .Where(transaction => transaction.TransactionDate >= start && transaction.TransactionDate < end)
            .ToListAsync(cancellationToken);

        var totalIncome = Sum(transactions.Where(item => item.Type == TransactionType.Income));
        var totalExpenses = Sum(transactions.Where(item => item.Type == TransactionType.Expense));
        var totalTransfers = Sum(transactions.Where(item => item.Type == TransactionType.Transfer));

        // Adjustments are kept out of income/expense totals but reported on their own.
        var totalAdjustments = decimal.Round(
            transactions
                .Where(item => item.Type == TransactionType.Adjustment)
                .Sum(item => item.SignedAmountForSourceAccount),
            2,
            MidpointRounding.AwayFromZero);

        var spendingByCategory = BuildCategoryBreakdown(transactions.Where(item => item.Type == TransactionType.Expense), totalExpenses);
        var incomeByCategory = BuildCategoryBreakdown(transactions.Where(item => item.Type == TransactionType.Income), totalIncome);

        return new MonthlySummaryDto(
            year,
            month,
            Mapping.ToMonthLabel(year, month),
            totalIncome,
            totalExpenses,
            decimal.Round(totalIncome - totalExpenses, 2, MidpointRounding.AwayFromZero),
            totalAdjustments,
            totalTransfers,
            transactions.Count,
            spendingByCategory,
            incomeByCategory);
    }

    public async Task<DashboardDto> GetDashboardAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await _users.GetByIdAsync(userId, cancellationToken)
            ?? throw new NotFoundException("User not found.");

        var accounts = await _accounts.ListAsync(userId, false, cancellationToken);

        var accountBalances = accounts
            .Select(account => new AccountBalanceDto(
                account.Id,
                account.Name,
                account.Currency.Code,
                decimal.Round(account.Balance, 2, MidpointRounding.AwayFromZero)))
            .ToList();

        var balanceByCurrency = accountBalances
            .GroupBy(account => account.Currency)
            .ToDictionary(group => group.Key, group => decimal.Round(group.Sum(item => item.Balance), 2, MidpointRounding.AwayFromZero));

        // No FX rates are applied: the headline total covers the user's base currency only.
        var totalBalance = balanceByCurrency.TryGetValue(user.BaseCurrency, out var baseTotal) ? baseTotal : 0m;

        var now = DateTimeOffset.Now;
        var currentMonth = await GetMonthlySummaryAsync(userId, now.Year, now.Month, cancellationToken);

        var budgets = await _budgets.ListAsync(userId, false, cancellationToken);
        var budgetDtos = await _budgetService.BuildDtosAsync(userId, budgets, cancellationToken);

        var recent = await _transactions.Query(userId)
            .OrderByDescending(transaction => transaction.TransactionDate)
            .ThenByDescending(transaction => transaction.CreatedAt)
            .Take(8)
            .ToListAsync(cancellationToken);

        return new DashboardDto(
            user.BaseCurrency,
            totalBalance,
            accountBalances,
            balanceByCurrency,
            currentMonth,
            budgetDtos,
            recent.Select(item => item.ToDto()).ToList());
    }

    private static decimal Sum(IEnumerable<Domain.Entities.Transaction> transactions) =>
        decimal.Round(transactions.Sum(item => item.Amount), 2, MidpointRounding.AwayFromZero);

    private static List<CategorySpendDto> BuildCategoryBreakdown(IEnumerable<Domain.Entities.Transaction> transactions, decimal total)
    {
        return transactions
            .Where(transaction => transaction.CategoryId is not null)
            .GroupBy(transaction => new
            {
                CategoryId = transaction.CategoryId!.Value,
                Name = transaction.Category?.Name ?? "Uncategorised",
                Color = transaction.Category?.Color ?? "#4647d3"
            })
            .Select(group =>
            {
                var amount = decimal.Round(group.Sum(item => item.Amount), 2, MidpointRounding.AwayFromZero);

                return new CategorySpendDto(
                    group.Key.CategoryId,
                    group.Key.Name,
                    group.Key.Color,
                    amount,
                    total <= 0 ? 0m : decimal.Round(amount / total * 100m, 2, MidpointRounding.AwayFromZero));
            })
            .OrderByDescending(item => item.Amount)
            .ToList();
    }
}

