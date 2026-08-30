namespace Backend.Infrastructure.Security;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Key { get; set; } = string.Empty;

    public string Issuer { get; set; } = "FinancialTracker";

    public string Audience { get; set; } = "FinancialTracker";

    public int ExpiryDays { get; set; } = 30;
}

