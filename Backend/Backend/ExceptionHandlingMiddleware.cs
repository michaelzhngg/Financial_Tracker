using Backend.Application.Common;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API;

/// <summary>
/// Translates domain and application exceptions into consistent problem responses.
/// </summary>
public sealed class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            var (statusCode, title) = exception switch
            {
                NotFoundException => (StatusCodes.Status404NotFound, "Not found"),
                AppValidationException => (StatusCodes.Status400BadRequest, "Invalid request"),
                ArgumentException => (StatusCodes.Status400BadRequest, "Invalid request"),
                InvalidOperationException => (StatusCodes.Status400BadRequest, "Invalid request"),
                _ => (StatusCodes.Status500InternalServerError, "Unexpected error")
            };

            if (statusCode == StatusCodes.Status500InternalServerError)
            {
                _logger.LogError(exception, "Unhandled exception while processing {Path}", context.Request.Path);
            }

            if (context.Response.HasStarted)
            {
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = statusCode;

            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = statusCode == StatusCodes.Status500InternalServerError
                    ? "Something went wrong. Please try again."
                    : exception.Message
            });
        }
    }
}

