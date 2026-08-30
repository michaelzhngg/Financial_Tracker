using Backend.Domain.Common;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities;

public sealed class Category : AuditableEntity
{
    public Guid UserId { get; private set; }

    public string Name { get; private set; }

    public CategoryType Type { get; private set; }

    public string Color { get; private set; }

    public string Icon { get; private set; }

    public bool IsActive { get; private set; }

    private Category()
    {
        Name = string.Empty;
        Color = "#4647d3";
        Icon = "tag";
    }

    private Category(Guid userId, string name, CategoryType type, string color, string icon)
    {
        if (userId == Guid.Empty)
        {
            throw new ArgumentException("User ID cannot be empty.", nameof(userId));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Category name cannot be empty.", nameof(name));
        }

        UserId = userId;
        Name = name.Trim();
        Type = type;
        Color = string.IsNullOrWhiteSpace(color) ? "#4647d3" : color.Trim();
        Icon = string.IsNullOrWhiteSpace(icon) ? "tag" : icon.Trim();
        IsActive = true;
    }

    public static Category Create(Guid userId, string name, CategoryType type, string? color = null, string? icon = null)
    {
        return new Category(userId, name, type, color ?? string.Empty, icon ?? string.Empty);
    }

    public void UpdateDetails(string name, CategoryType type, string? color, string? icon)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Category name cannot be empty.", nameof(name));
        }

        Name = name.Trim();
        Type = type;

        if (!string.IsNullOrWhiteSpace(color))
        {
            Color = color.Trim();
        }

        if (!string.IsNullOrWhiteSpace(icon))
        {
            Icon = icon.Trim();
        }

        MarkAsUpdated();
    }

    public void Deactivate()
    {
        IsActive = false;

        MarkAsUpdated();
    }

    public void Reactivate()
    {
        IsActive = true;

        MarkAsUpdated();
    }
}
