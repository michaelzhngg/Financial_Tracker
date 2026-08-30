using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.DTOs;

public sealed record AccountDto(
    Guid Id,
    string Name,
    AccountType Type,
    string TypeName,
    string Currency,
    decimal Balance,
    bool IsActive,
    DateTimeOffset CreatedAt);

public sealed record CreateAccountRequest
{
    [Required, MinLength(1), MaxLength(80)]
    public string Name { get; init; } = string.Empty;

    [Required]
    public AccountType Type { get; init; } = AccountType.Bank;

    [Required, MinLength(3), MaxLength(3)]
    public string Currency { get; init; } = "MYR";

    public decimal InitialBalance { get; init; }
}

public sealed record UpdateAccountRequest
{
    [Required, MinLength(1), MaxLength(80)]
    public string Name { get; init; } = string.Empty;

    [Required]
    public AccountType Type { get; init; } = AccountType.Bank;

    [Required, MinLength(3), MaxLength(3)]
    public string Currency { get; init; } = "MYR";
}

public sealed record AdjustBalanceRequest
{
    /// <summary>
    /// The real-world balance the account should have after the adjustment.
    /// </summary>
    [Required]
    public decimal ActualBalance { get; init; }

    [MaxLength(240)]
    public string? Reason { get; init; }

    public DateTimeOffset? Date { get; init; }
}

