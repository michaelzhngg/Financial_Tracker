using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs;

public sealed record RegisterRequest
{
    [Required, EmailAddress]
    public string Email { get; init; } = string.Empty;

    [Required, MinLength(2), MaxLength(80)]
    public string DisplayName { get; init; } = string.Empty;

    [Required, MinLength(6), MaxLength(128)]
    public string Password { get; init; } = string.Empty;

    [MaxLength(3)]
    public string BaseCurrency { get; init; } = "MYR";
}

public sealed record LoginRequest
{
    [Required, EmailAddress]
    public string Email { get; init; } = string.Empty;

    [Required]
    public string Password { get; init; } = string.Empty;
}

public sealed record UpdateProfileRequest
{
    [Required, MinLength(2), MaxLength(80)]
    public string DisplayName { get; init; } = string.Empty;

    [Required, MinLength(3), MaxLength(3)]
    public string BaseCurrency { get; init; } = "MYR";
}

public sealed record ChangePasswordRequest
{
    [Required]
    public string CurrentPassword { get; init; } = string.Empty;

    [Required, MinLength(6), MaxLength(128)]
    public string NewPassword { get; init; } = string.Empty;
}

public sealed record UserDto(Guid Id, string Email, string DisplayName, string BaseCurrency);

public sealed record AuthResponse(string Token, DateTimeOffset ExpiresAt, UserDto User);
