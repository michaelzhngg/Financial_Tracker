using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.DTOs;

public sealed record TransactionDto(
    Guid Id,
    TransactionType Type,
    string TypeName,
    Guid AccountId,
    string AccountName,
    string Currency,
    Guid? ToAccountId,
    string? ToAccountName,
    Guid? CategoryId,
    string? CategoryName,
    string? CategoryColor,
    decimal Amount,
    decimal SignedAmount,
    string Description,
    DateTimeOffset TransactionDate,
    DateTimeOffset CreatedAt,
    ReceiptDto? Receipt);

public sealed record ReceiptItemDto(
    Guid Id,
    string Name,
    decimal Quantity,
    decimal UnitPrice,
    decimal LineTotal,
    int SortOrder);

public sealed record ReceiptChargeDto(
    Guid Id,
    string Label,
    ChargeType Type,
    string TypeName,
    decimal Value,
    decimal Amount,
    int SortOrder);

public sealed record ReceiptDto(
    Guid Id,
    string Merchant,
    string Notes,
    decimal Subtotal,
    decimal ChargesTotal,
    decimal Total,
    IReadOnlyList<ReceiptItemDto> Items,
    IReadOnlyList<ReceiptChargeDto> Charges);

public sealed record ReceiptItemRequest
{
    [Required]
    [MaxLength(160)]
    public string Name { get; init; } = string.Empty;

    [Range(0.001, 1000000)]
    public decimal Quantity { get; init; } = 1;

    [Range(0, 999999999)]
    public decimal UnitPrice { get; init; }
}

public sealed record ReceiptChargeRequest
{
    [Required]
    [MaxLength(80)]
    public string Label { get; init; } = string.Empty;

    [Required]
    public ChargeType Type { get; init; } = ChargeType.Percentage;

    [Range(0, 999999999)]
    public decimal Value { get; init; }
}

public sealed record ReceiptRequest
{
    [MaxLength(160)]
    public string? Merchant { get; init; }

    [MaxLength(500)]
    public string? Notes { get; init; }

    public IReadOnlyList<ReceiptItemRequest> Items { get; init; } = [];

    public IReadOnlyList<ReceiptChargeRequest> Charges { get; init; } = [];
}

public sealed record CreateTransactionRequest
{
    [Required]
    public TransactionType Type { get; init; } = TransactionType.Expense;

    [Required]
    public Guid AccountId { get; init; }

    public Guid? ToAccountId { get; init; }

    public Guid? CategoryId { get; init; }

    [Range(0.01, 999999999)]
    public decimal Amount { get; init; }

    [MaxLength(240)]
    public string? Description { get; init; }

    public DateTimeOffset? TransactionDate { get; init; }

    public ReceiptRequest? Receipt { get; init; }
}

public sealed record UpdateTransactionRequest
{
    [Required]
    public Guid AccountId { get; init; }

    public Guid? ToAccountId { get; init; }

    public Guid? CategoryId { get; init; }

    [Range(0.01, 999999999)]
    public decimal Amount { get; init; }

    [MaxLength(240)]
    public string? Description { get; init; }

    public DateTimeOffset? TransactionDate { get; init; }

    public ReceiptRequest? Receipt { get; init; }
}

public sealed record TransactionFilter
{
    public DateTimeOffset? From { get; init; }

    public DateTimeOffset? To { get; init; }

    public Guid? AccountId { get; init; }

    public Guid? CategoryId { get; init; }

    public TransactionType? Type { get; init; }

    public string? Search { get; init; }

    [Range(1, 500)]
    public int PageSize { get; init; } = 50;

    [Range(1, int.MaxValue)]
    public int Page { get; init; } = 1;
}

public sealed record PagedResult<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount)
{
    public int TotalPages => PageSize <= 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);
}
