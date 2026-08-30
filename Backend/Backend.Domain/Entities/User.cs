using Backend.Domain.Common;

namespace Backend.Domain.Entities;

public sealed class User : AuditableEntity
{
    public string Email { get; private set; }

    public string DisplayName { get; private set; }

    public string PasswordHash { get; private set; }

    public string BaseCurrency { get; private set; }

    private User()
    {
        Email = string.Empty;
        DisplayName = string.Empty;
        PasswordHash = string.Empty;
        BaseCurrency = "MYR";
    }

    private User(string email, string displayName, string passwordHash, string baseCurrency)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new ArgumentException("Email cannot be empty.", nameof(email));
        }

        if (string.IsNullOrWhiteSpace(displayName))
        {
            throw new ArgumentException("Display name cannot be empty.", nameof(displayName));
        }

        if (string.IsNullOrWhiteSpace(passwordHash))
        {
            throw new ArgumentException("Password hash cannot be empty.", nameof(passwordHash));
        }

        Email = email.Trim().ToLowerInvariant();
        DisplayName = displayName.Trim();
        PasswordHash = passwordHash;
        BaseCurrency = baseCurrency.Trim().ToUpperInvariant();
    }

    public static User Create(string email, string displayName, string passwordHash, string baseCurrency = "MYR")
    {
        return new User(email, displayName, passwordHash, baseCurrency);
    }

    public void UpdateProfile(string displayName, string baseCurrency)
    {
        if (string.IsNullOrWhiteSpace(displayName))
        {
            throw new ArgumentException("Display name cannot be empty.", nameof(displayName));
        }

        DisplayName = displayName.Trim();
        BaseCurrency = baseCurrency.Trim().ToUpperInvariant();

        MarkAsUpdated();
    }

    public void ChangePassword(string passwordHash)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
        {
            throw new ArgumentException("Password hash cannot be empty.", nameof(passwordHash));
        }

        PasswordHash = passwordHash;

        MarkAsUpdated();
    }
}
