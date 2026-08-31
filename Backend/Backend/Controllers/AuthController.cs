using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[Route("api/auth")]
public sealed class AuthController : ApiControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService) => _authService = authService;

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _authService.LoginAsync(request, cancellationToken));
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me(CancellationToken cancellationToken)
    {
        return Ok(await _authService.GetProfileAsync(CurrentUserId, cancellationToken));
    }

    [HttpPut("me")]
    public async Task<ActionResult<UserDto>> UpdateProfile(UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _authService.UpdateProfileAsync(CurrentUserId, request, cancellationToken));
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        await _authService.ChangePasswordAsync(CurrentUserId, request, cancellationToken);

        return NoContent();
    }
}
