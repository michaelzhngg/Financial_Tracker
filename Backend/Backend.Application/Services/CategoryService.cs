using Backend.Application.Common;
using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;

namespace Backend.Application.Services;

public sealed class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categories;
    private readonly ITransactionRepository _transactions;
    private readonly IBudgetRepository _budgets;
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(
        ICategoryRepository categories,
        ITransactionRepository transactions,
        IBudgetRepository budgets,
        IUnitOfWork unitOfWork)
    {
        _categories = categories;
        _transactions = transactions;
        _budgets = budgets;
        _unitOfWork = unitOfWork;
    }

    public async Task<IReadOnlyList<CategoryDto>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default)
    {
        var categories = await _categories.ListAsync(userId, includeInactive, cancellationToken);

        return categories.Select(category => category.ToDto()).ToList();
    }

    public async Task<CategoryDto> GetAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default)
    {
        var category = await GetOwnedAsync(userId, categoryId, cancellationToken);

        return category.ToDto();
    }

    public async Task<CategoryDto> CreateAsync(Guid userId, SaveCategoryRequest request, CancellationToken cancellationToken = default)
    {
        if (await _categories.NameExistsAsync(userId, request.Name.Trim(), null, cancellationToken))
        {
            throw new AppValidationException($"A category named '{request.Name.Trim()}' already exists.");
        }

        var category = Category.Create(userId, request.Name, request.Type, request.Color, request.Icon);

        await _categories.AddAsync(category, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return category.ToDto();
    }

    public async Task<CategoryDto> UpdateAsync(Guid userId, Guid categoryId, SaveCategoryRequest request, CancellationToken cancellationToken = default)
    {
        var category = await GetOwnedAsync(userId, categoryId, cancellationToken);

        if (await _categories.NameExistsAsync(userId, request.Name.Trim(), categoryId, cancellationToken))
        {
            throw new AppValidationException($"A category named '{request.Name.Trim()}' already exists.");
        }

        if (category.Type != request.Type && await _transactions.AnyForCategoryAsync(userId, categoryId, cancellationToken))
        {
            throw new AppValidationException("The category type cannot be changed once it has transactions.");
        }

        category.UpdateDetails(request.Name, request.Type, request.Color, request.Icon);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return category.ToDto();
    }

    public async Task<CategoryDto> SetActiveAsync(Guid userId, Guid categoryId, bool isActive, CancellationToken cancellationToken = default)
    {
        var category = await GetOwnedAsync(userId, categoryId, cancellationToken);

        if (isActive)
        {
            category.Reactivate();
        }
        else
        {
            category.Deactivate();

            var budget = await _budgets.GetByCategoryAsync(userId, categoryId, cancellationToken);
            budget?.Deactivate();
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return category.ToDto();
    }

    public async Task DeleteAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default)
    {
        var category = await GetOwnedAsync(userId, categoryId, cancellationToken);

        if (await _transactions.AnyForCategoryAsync(userId, categoryId, cancellationToken))
        {
            throw new AppValidationException("This category has transactions and cannot be deleted. Deactivate it instead.");
        }

        var budget = await _budgets.GetByCategoryAsync(userId, categoryId, cancellationToken);

        if (budget is not null)
        {
            _budgets.Remove(budget);
        }

        _categories.Remove(category);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    private async Task<Category> GetOwnedAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken)
    {
        return await _categories.GetAsync(userId, categoryId, cancellationToken)
            ?? throw new NotFoundException("Category not found.");
    }
}
