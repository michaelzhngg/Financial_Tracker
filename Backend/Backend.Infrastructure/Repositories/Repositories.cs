using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public sealed class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context) => _context = context;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        _context.SaveChangesAsync(cancellationToken);
}

public sealed class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context) => _context = context;

    public Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        _context.Users.FirstOrDefaultAsync(user => user.Id == id, cancellationToken);

    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default) =>
        _context.Users.FirstOrDefaultAsync(user => user.Email == email, cancellationToken);

    public Task<bool> EmailExistsAsync(string email, CancellationToken cancellationToken = default) =>
        _context.Users.AnyAsync(user => user.Email == email, cancellationToken);

    public async Task AddAsync(User user, CancellationToken cancellationToken = default) =>
        await _context.Users.AddAsync(user, cancellationToken);
}

public sealed class AccountRepository : IAccountRepository
{
    private readonly AppDbContext _context;

    public AccountRepository(AppDbContext context) => _context = context;

    public Task<Account?> GetAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default) =>
        _context.Accounts.FirstOrDefaultAsync(account => account.Id == accountId && account.UserId == userId, cancellationToken);

    public async Task<IReadOnlyList<Account>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default)
    {
        var query = _context.Accounts.Where(account => account.UserId == userId);

        if (!includeInactive)
        {
            query = query.Where(account => account.IsActive);
        }

        return await query
            .OrderByDescending(account => account.IsActive)
            .ThenBy(account => account.Name)
            .ToListAsync(cancellationToken);
    }

    public Task<bool> NameExistsAsync(Guid userId, string name, Guid? excludeId, CancellationToken cancellationToken = default) =>
        _context.Accounts.AnyAsync(
            account => account.UserId == userId
                && account.Name.ToLower() == name.ToLower()
                && (excludeId == null || account.Id != excludeId),
            cancellationToken);

    public async Task AddAsync(Account account, CancellationToken cancellationToken = default) =>
        await _context.Accounts.AddAsync(account, cancellationToken);

    public void Remove(Account account) => _context.Accounts.Remove(account);
}

public sealed class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context) => _context = context;

    public Task<Category?> GetAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default) =>
        _context.Categories.FirstOrDefaultAsync(category => category.Id == categoryId && category.UserId == userId, cancellationToken);

    public async Task<IReadOnlyList<Category>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default)
    {
        var query = _context.Categories.Where(category => category.UserId == userId);

        if (!includeInactive)
        {
            query = query.Where(category => category.IsActive);
        }

        return await query
            .OrderBy(category => category.Type)
            .ThenBy(category => category.Name)
            .ToListAsync(cancellationToken);
    }

    public Task<bool> NameExistsAsync(Guid userId, string name, Guid? excludeId, CancellationToken cancellationToken = default) =>
        _context.Categories.AnyAsync(
            category => category.UserId == userId
                && category.Name.ToLower() == name.ToLower()
                && (excludeId == null || category.Id != excludeId),
            cancellationToken);

    public async Task AddAsync(Category category, CancellationToken cancellationToken = default) =>
        await _context.Categories.AddAsync(category, cancellationToken);

    public void Remove(Category category) => _context.Categories.Remove(category);
}

public sealed class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context) => _context = context;

    public Task<Transaction?> GetAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken = default) =>
        Query(userId).FirstOrDefaultAsync(transaction => transaction.Id == transactionId, cancellationToken);

    public IQueryable<Transaction> Query(Guid userId) =>
        _context.Transactions
            .Include(transaction => transaction.Account)
            .Include(transaction => transaction.ToAccount)
            .Include(transaction => transaction.Category)
            .Include(transaction => transaction.Receipt)
                .ThenInclude(receipt => receipt!.Items)
            .Include(transaction => transaction.Receipt)
                .ThenInclude(receipt => receipt!.Charges)
            .Where(transaction => transaction.UserId == userId);

    public async Task AddAsync(Transaction transaction, CancellationToken cancellationToken = default) =>
        await _context.Transactions.AddAsync(transaction, cancellationToken);

    public void Remove(Transaction transaction) => _context.Transactions.Remove(transaction);

    public Task<bool> AnyForAccountAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default) =>
        _context.Transactions.AnyAsync(
            transaction => transaction.UserId == userId && (transaction.AccountId == accountId || transaction.ToAccountId == accountId),
            cancellationToken);

    public Task<bool> AnyForCategoryAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default) =>
        _context.Transactions.AnyAsync(
            transaction => transaction.UserId == userId && transaction.CategoryId == categoryId,
            cancellationToken);
}

public sealed class ReceiptRepository : IReceiptRepository
{
    private readonly AppDbContext _context;

    public ReceiptRepository(AppDbContext context) => _context = context;

    public Task<Receipt?> GetByTransactionIdAsync(Guid transactionId, CancellationToken cancellationToken = default) =>
        _context.Receipts
            .Include(receipt => receipt.Items)
            .Include(receipt => receipt.Charges)
            .FirstOrDefaultAsync(receipt => receipt.TransactionId == transactionId, cancellationToken);

    public async Task AddAsync(Receipt receipt, CancellationToken cancellationToken = default) =>
        await _context.Receipts.AddAsync(receipt, cancellationToken);

    public void Remove(Receipt receipt) => _context.Receipts.Remove(receipt);
}

public sealed class BudgetRepository : IBudgetRepository
{
    private readonly AppDbContext _context;

    public BudgetRepository(AppDbContext context) => _context = context;

    public Task<Budget?> GetAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken = default) =>
        _context.Budgets
            .Include(budget => budget.Category)
            .FirstOrDefaultAsync(budget => budget.Id == budgetId && budget.UserId == userId, cancellationToken);

    public async Task<IReadOnlyList<Budget>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default)
    {
        var query = _context.Budgets
            .Include(budget => budget.Category)
            .Where(budget => budget.UserId == userId);

        if (!includeInactive)
        {
            query = query.Where(budget => budget.IsActive);
        }

        return await query.ToListAsync(cancellationToken);
    }

    public Task<Budget?> GetByCategoryAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default) =>
        _context.Budgets
            .Include(budget => budget.Category)
            .FirstOrDefaultAsync(budget => budget.UserId == userId && budget.CategoryId == categoryId, cancellationToken);

    public async Task AddAsync(Budget budget, CancellationToken cancellationToken = default) =>
        await _context.Budgets.AddAsync(budget, cancellationToken);

    public void Remove(Budget budget) => _context.Budgets.Remove(budget);
}
