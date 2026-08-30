using System.Security.Claims;
using Backend.Application.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
[Produces("application/json")]
public abstract class ApiControllerBase : ControllerBase
{
    /// <summary>
    /// The authenticated user's id. Every query in this API is scoped by it so
    /// one user can never read or modify another user's financial data.
    /// </summary>
    protected Guid CurrentUserId
    {
        get
        {
            var value = User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            return Guid.TryParse(value, out var userId)
                ? userId
                : throw new NotFoundException("User not found.");
        }
    }
}