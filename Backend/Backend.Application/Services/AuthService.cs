using Backend.Application.Common;
using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Services;

public sealed class AuthService : IAuthService
{
    private static readonly (string Name, CategoryType Type, string Color)[] DefaultCategories =
    [
        ("Food", CategoryType.Expense, "#f5a623"),
        ("Transportation", CategoryType.Expense, "#00628c"),
        ("Entertainment", CategoryType.Expense, "#9e00b4"),
        ("Shopping", CategoryType.Expense, "#e44870"),
        ("Bills", CategoryType.Expense, "#4647d3"),
        ("Education", CategoryType.Expense, "#008b87"),
        ("Salary", CategoryType.Income, "#10a86c"),
        ("Freelance", CategoryType.Income, "#22c55e"),
        ("Allowance", CategoryType.Income, "#7ddfb1"),
        ("Other Income", CategoryType.Income, "#81ccff")
    ];

    private readonly IUserRepository _users;
    private readonly ICategoryRepository _categories;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IUnitOfWork _unitOfWork;

    public AuthService(
        IUserRepository users,
        ICategoryRepository categories,
        IPasswordHasher passwordHasher,
        ITokenService tokenService,
        IUnitOfWork unitOfWork)
    {
        _users = users;
        _categories = categories;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _unitOfWork = unitOfWork;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        if (await _users.EmailExistsAsync(email, cancellationToken))
        {
            throw new AppValidationException("An account with this email already exists.");
        }

        var baseCurrency = string.IsNullOrWhiteSpace(request.BaseCurrency) ? "MYR" : request.BaseCurrency;
        var user = User.Create(email, request.DisplayName, _passwordHasher.Hash(request.Password), baseCurrency);

        await _users.AddAsync(user, cancellationToken);

        foreach (var (name, type, color) in DefaultCategories)
        {
            await _categories.AddAsync(Category.Create(user.Id, name, type, color), cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var (token, expiresAt) = _tokenService.CreateToken(user);

        return new AuthResponse(token, expiresAt, user.ToDto());
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _users.GetByEmailAsync(email, cancellationToken);

        if (user is null || !_passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new AppValidationException("Invalid email or password.");
        }

        var (token, expiresAt) = _tokenService.CreateToken(user);

        return new AuthResponse(token, expiresAt, user.ToDto());
    }

    public async Task<UserDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await _users.GetByIdAsync(userId, cancellationToken)
            ?? throw new NotFoundException("User not found.");

        return user.ToDto();
    }

    public async Task<UserDto> UpdateProfileAsync(Guid userId, UpdateProfileRequest request, CancellationToken cancellationToken = default)
    {
        var user = await _users.GetByIdAsync(userId, cancellationToken)
            ?? throw new NotFoundException("User not found.");

        user.UpdateProfile(request.DisplayName, request.BaseCurrency);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return user.ToDto();
    }

    public async Task ChangePasswordAsync(Guid userId, ChangePasswordRequest request, CancellationToken cancellationToken = default)
    {
        var user = await _users.GetByIdAsync(userId, cancellationToken)
            ?? throw new NotFoundException("User not found.");

        if (!_passwordHasher.Verify(request.CurrentPassword, user.PasswordHash))
        {
            throw new AppValidationException("Current password is incorrect.");
        }

        user.ChangePassword(_passwordHasher.Hash(request.NewPassword));

        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}


