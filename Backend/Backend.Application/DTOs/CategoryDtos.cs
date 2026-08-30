using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.DTOs;

public sealed record CategoryDto(
    Guid Id,
    string Name,
    CategoryType Type,
    string TypeName,
    string Color,
    string Icon,
    bool IsActive);

public sealed record SaveCategoryRequest
{
    [Required, MinLength(1), MaxLength(60)]
    public string Name { get; init; } = string.Empty;

    [Required]
    public CategoryType Type { get; init; } = CategoryType.Expense;

    [MaxLength(16)]
    public string? Color { get; init; }

    [MaxLength(40)]
    public string? Icon { get; init; }
}

