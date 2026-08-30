using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Interfaces;

public interface IPasswordHasher
{
    string Hash(string password);

    bool Verify(string password, string hash);
}

public interface ITokenService
{
    (string Token, DateTimeOffset ExpiresAt) CreateToken(User user);
}

public interface ICurrentUser
{
    Guid UserId { get; }
}

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);

    Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    Task<UserDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default);

    Task<UserDto> UpdateProfileAsync(Guid userId, UpdateProfileRequest request, CancellationToken cancellationToken = default);

    Task ChangePasswordAsync(Guid userId, ChangePasswordRequest request, CancellationToken cancellationToken = default);
}

public interface IAccountService
{
    Task<IReadOnlyList<AccountDto>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default);

    Task<AccountDto> GetAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default);

    Task<AccountDto> CreateAsync(Guid userId, CreateAccountRequest request, CancellationToken cancellationToken = default);

    Task<AccountDto> UpdateAsync(Guid userId, Guid accountId, UpdateAccountRequest request, CancellationToken cancellationToken = default);

    Task<AccountDto> SetActiveAsync(Guid userId, Guid accountId, bool isActive, CancellationToken cancellationToken = default);

    Task<TransactionDto> AdjustBalanceAsync(Guid userId, Guid accountId, AdjustBalanceRequest request, CancellationToken cancellationToken = default);

    Task DeleteAsync(Guid userId, Guid accountId, CancellationToken cancellationToken = default);
}

public interface ICategoryService
{
    Task<IReadOnlyList<CategoryDto>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default);

    Task<CategoryDto> GetAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default);

    Task<CategoryDto> CreateAsync(Guid userId, SaveCategoryRequest request, CancellationToken cancellationToken = default);

    Task<CategoryDto> UpdateAsync(Guid userId, Guid categoryId, SaveCategoryRequest request, CancellationToken cancellationToken = default);

    Task<CategoryDto> SetActiveAsync(Guid userId, Guid categoryId, bool isActive, CancellationToken cancellationToken = default);

    Task DeleteAsync(Guid userId, Guid categoryId, CancellationToken cancellationToken = default);
}

public interface ITransactionService
{
    Task<PagedResult<TransactionDto>> ListAsync(Guid userId, TransactionFilter filter, CancellationToken cancellationToken = default);

    Task<TransactionDto> GetAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken = default);

    Task<TransactionDto> CreateAsync(Guid userId, CreateTransactionRequest request, CancellationToken cancellationToken = default);

    Task<TransactionDto> UpdateAsync(Guid userId, Guid transactionId, UpdateTransactionRequest request, CancellationToken cancellationToken = default);

    Task DeleteAsync(Guid userId, Guid transactionId, CancellationToken cancellationToken = default);
}

public interface IBudgetService
{
    Task<IReadOnlyList<BudgetDto>> ListAsync(Guid userId, bool includeInactive, CancellationToken cancellationToken = default);

    Task<BudgetDto> GetAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken = default);

    Task<BudgetDto> CreateAsync(Guid userId, SaveBudgetRequest request, CancellationToken cancellationToken = default);

    Task<BudgetDto> UpdateAsync(Guid userId, Guid budgetId, SaveBudgetRequest request, CancellationToken cancellationToken = default);

    Task<BudgetDto> SetActiveAsync(Guid userId, Guid budgetId, bool isActive, CancellationToken cancellationToken = default);

    Task DeleteAsync(Guid userId, Guid budgetId, CancellationToken cancellationToken = default);
}

public interface ISummaryService
{
    Task<MonthlySummaryDto> GetMonthlySummaryAsync(Guid userId, int year, int month, CancellationToken cancellationToken = default);

    Task<DashboardDto> GetDashboardAsync(Guid userId, CancellationToken cancellationToken = default);
}


