using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[Route("api/accounts")]
public sealed class AccountsController : ApiControllerBase
{
    private readonly IAccountService _accountService;

    public AccountsController(IAccountService accountService) => _accountService = accountService;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AccountDto>>> List([FromQuery] bool includeInactive = true, CancellationToken cancellationToken = default)
    {
        return Ok(await _accountService.ListAsync(CurrentUserId, includeInactive, cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AccountDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _accountService.GetAsync(CurrentUserId, id, cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<AccountDto>> Create(CreateAccountRequest request, CancellationToken cancellationToken)
    {
        var account = await _accountService.CreateAsync(CurrentUserId, request, cancellationToken);

        return CreatedAtAction(nameof(Get), new { id = account.Id }, account);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<AccountDto>> Update(Guid id, UpdateAccountRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _accountService.UpdateAsync(CurrentUserId, id, request, cancellationToken));
    }

    [HttpPost("{id:guid}/deactivate")]
    public async Task<ActionResult<AccountDto>> Deactivate(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _accountService.SetActiveAsync(CurrentUserId, id, false, cancellationToken));
    }

    [HttpPost("{id:guid}/reactivate")]
    public async Task<ActionResult<AccountDto>> Reactivate(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _accountService.SetActiveAsync(CurrentUserId, id, true, cancellationToken));
    }

    [HttpPost("{id:guid}/adjust-balance")]
    public async Task<ActionResult<TransactionDto>> AdjustBalance(Guid id, AdjustBalanceRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _accountService.AdjustBalanceAsync(CurrentUserId, id, request, cancellationToken));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _accountService.DeleteAsync(CurrentUserId, id, cancellationToken);

        return NoContent();
    }
}

