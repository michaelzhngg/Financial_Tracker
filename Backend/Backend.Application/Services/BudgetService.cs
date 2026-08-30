using Backend.Application.Common;
using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public sealed class BudgetService : IBudgetService
{
    private readonly IBudgetRepository _budgets;
    private readonly ICategoryRepository _categories;
    private readonly ITransactionRepository _transactions;
    private readonly IUnitOfWork _unitOfWork;

    public BudgetService(
        IBudgetRepository budgets,
        ICategoryRepository categories,
        ITransactionRepository transactions,
        IUnitOfWork unitOfWork)
    {
        _budgets = budgets;
        _categories = categories;
        _transactions = transactions;
        _unitOfWork = unitOfWork;
    }

    public async Task<IReadOnlyList<BudgetDto>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default)
    {
        var budgets = await _budgets.ListAsync(userId, includeInactive, cancellationToken);

        return await BuildDtosAsync(userId, budgets, cancellationToken);
    }

    public async Task<BudgetDto> GetAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken = default)
    {
        var budget = await GetOwnedAsync(userId, budgetId, cancellationToken);
        var dtos = await BuildDtosAsync(userId, [budget], cancellationToken);

        return dtos[0];
    }

    public async Task<BudgetDto> CreateAsync(Guid userId, SaveBudgetRequest request, CancellationToken cancellationToken = default)
    {
        var category = await RequireExpenseCategoryAsync(userId, request.CategoryId, cancellationToken);
        var existing = await _budgets.GetByCategoryAsync(userId, category.Id, cancellationToken);

        if (existing is not null)
        {
            throw new AppValidationException($"A budget for '{category.Name}' already exists.");
        }

        var budget = Budget.Create(userId, category.Id, request.Amount, request.Period);

        await _budgets.AddAsync(budget, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return await GetAsync(userId, budget.Id, cancellationToken);
    }

    public async Task<BudgetDto> UpdateAsync(Guid userId, Guid budgetId, SaveBudgetRequest request, CancellationToken cancellationToken = default)
    {
        var budget = await GetOwnedAsync(userId, budgetId, cancellationToken);
        var category = await RequireExpenseCategoryAsync(userId, request.CategoryId, cancellationToken);

        if (category.Id != budget.CategoryId)
        {
            var existing = await _budgets.GetByCategoryAsync(userId, category.Id, cancellationToken);

            if (existing is not null && existing.Id != budget.Id)
            {
                throw new AppValidationException($"A budget for '{category.Name}' already exists.");
            }
        }

        budget.UpdateDetails(category.Id, request.Amount, request.Period);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return await GetAsync(userId, budget.Id, cancellationToken);
    }

    public async Task<BudgetDto> SetActiveAsync(Guid userId, Guid budgetId, bool isActive, CancellationToken cancellationToken = default)
    {
        var budget = await GetOwnedAsync(userId, budgetId, cancellationToken);

        if (isActive)
        {
            budget.Reactivate();
        }
        else
        {
            budget.Deactivate();
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return await GetAsync(userId, budget.Id, cancellationToken);
    }

    public async Task DeleteAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken = default)
    {
        var budget = await GetOwnedAsync(userId, budgetId, cancellationToken);

        _budgets.Remove(budget);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Enriches budgets with spend, remaining, and the dynamic daily allowance for the
    /// current budget period.
    /// </summary>
    public async Task<IReadOnlyList<BudgetDto>> BuildDtosAsync(Guid userId, IReadOnlyList<Budget> budgets, CancellationToken cancellationToken)
    {
        if (budgets.Count == 0)
        {
            return [];
        }

        var now = DateTimeOffset.Now;
        var results = new List<BudgetDto>(budgets.Count);
        var categories = await _categories.ListAsync(userId, true, cancellationToken);
        var categoryLookup = categories.ToDictionary(category => category.Id);

        foreach (var budget in budgets)
        {
            var (start, end) = Mapping.GetPeriodRange(budget.Period, now);

            var spent = await _transactions.Query(userId)
                .Where(transaction => transaction.Type == TransactionType.Expense
                    && transaction.CategoryId == budget.CategoryId
                    && transaction.TransactionDate >= start
                    && transaction.TransactionDate < end)
                .SumAsync(transaction => (decimal?)transaction.Amount, cancellationToken) ?? 0m;

            spent = decimal.Round(spent, 2, MidpointRounding.AwayFromZero);

            var remaining = decimal.Round(budget.Amount - spent, 2, MidpointRounding.AwayFromZero);
            var isOverBudget = remaining < 0;

            var totalDays = (int)Math.Round((end - start).TotalDays);
            var daysRemaining = CalculateDaysRemaining(now, end);

            // Over budget shows a zero allowance so the UI never suggests a misleading amount.
            var dailyAllowance = isOverBudget || daysRemaining <= 0
                ? 0m
                : decimal.Round(remaining / daysRemaining, 2, MidpointRounding.AwayFromZero);

            var percentUsed = budget.Amount <= 0
                ? 0m
                : decimal.Round(spent / budget.Amount * 100m, 2, MidpointRounding.AwayFromZero);

            categoryLookup.TryGetValue(budget.CategoryId, out var category);

            results.Add(new BudgetDto(
                budget.Id,
                budget.CategoryId,
                category?.Name ?? "Unknown",
                category?.Color ?? "#4647d3",
                budget.Amount,
                budget.Period,
                budget.Period.ToString(),
                budget.IsActive,
                spent,
                remaining,
                percentUsed,
                daysRemaining,
                totalDays,
                dailyAllowance,
                isOverBudget,
                start,
                end.AddTicks(-1)));
        }

        return results;
    }

    /// <summary>
    /// Days left in the period, counting today as a full spendable day.
    /// </summary>
    private static int CalculateDaysRemaining(DateTimeOffset now, DateTimeOffset periodEnd)
    {
        if (now >= periodEnd)
        {
            return 0;
        }

        var today = now.ToLocalTime().Date;
        var lastDay = periodEnd.ToLocalTime().AddTicks(-1).Date;

        return (int)(lastDay - today).TotalDays + 1;
    }

    private async Task<Category> RequireExpenseCategoryAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken)
    {
        var category = await _categories.GetAsync(userId, categoryId, cancellationToken)
            ?? throw new NotFoundException("Category not found.");

        if (category.Type != CategoryType.Expense)
        {
            throw new AppValidationException("Budgets can only be created for expense categories.");
        }

        return category;
    }

    private async Task<Budget> GetOwnedAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken)
    {
        return await _budgets.GetAsync(userId, budgetId, cancellationToken)
            ?? throw new NotFoundException("Budget not found.");
    }
}

