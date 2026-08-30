namespace Backend.Application.Common;

/// <summary>
/// Thrown when a request is well-formed but violates a business rule.
/// Mapped to HTTP 400 by the API layer.
/// </summary>
public sealed class AppValidationException : Exception
{
    public AppValidationException(string message) : base(message)
    {
    }
}

/// <summary>
/// Thrown when a resource does not exist or does not belong to the current user.
/// Mapped to HTTP 404 by the API layer.
/// </summary>
public sealed class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
    }
}