using Backend.Domain.Entities;

namespace Backend.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);

    Task<bool> EmailExistsAsync(string email, CancellationToken cancellationToken = default);

    Task AddAsync(User user, CancellationToken cancellationToken = default);
}

public interface IAccountRepository
{
    Task<Account?> GetAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Account>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default);

    Task<bool> NameExistsAsync(Guid userId, string name, Guid? excludeId, CancellationToken cancellationToken = default);

    Task AddAsync(Account account, CancellationToken cancellationToken = default);

    void Remove(Account account);
}

public interface ICategoryRepository
{
    Task<Category?> GetAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Category>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default);

    Task<bool> NameExistsAsync(Guid userId, string name, Guid? excludeId, CancellationToken cancellationToken = default);

    Task AddAsync(Category category, CancellationToken cancellationToken = default);

    void Remove(Category category);
}

public interface ITransactionRepository
{
    Task<Transaction?> GetAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken = default);

    IQueryable<Transaction> Query(Guid userId);

    Task AddAsync(Transaction transaction, CancellationToken cancellationToken = default);

    void Remove(Transaction transaction);

    Task<bool> AnyForAccountAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default);

    Task<bool> AnyForCategoryAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default);
}

public interface IReceiptRepository
{
    Task<Receipt?> GetByTransactionIdAsync(Guid transactionId, CancellationToken cancellationToken = default);

    Task AddAsync(Receipt receipt, CancellationToken cancellationToken = default);

    void Remove(Receipt receipt);
}

public interface IBudgetRepository
{
    Task<Budget?> GetAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Budget>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default);

    Task<Budget?> GetByCategoryAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default);

    Task AddAsync(Budget budget, CancellationToken cancellationToken = default);

    void Remove(Budget budget);
}

public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

