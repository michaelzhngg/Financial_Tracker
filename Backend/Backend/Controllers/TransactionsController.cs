using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[Route("api/transactions")]
public sealed class TransactionsController : ApiControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService) => _transactionService = transactionService;

    [HttpGet]
    public async Task<ActionResult<PagedResult<TransactionDto>>> List([FromQuery] TransactionFilter filter, CancellationToken cancellationToken)
    {
        return Ok(await _transactionService.ListAsync(CurrentUserId, filter, cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TransactionDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _transactionService.GetAsync(CurrentUserId, id, cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<TransactionDto>> Create(CreateTransactionRequest request, CancellationToken cancellationToken)
    {
        var transaction = await _transactionService.CreateAsync(CurrentUserId, request, cancellationToken);

        return CreatedAtAction(nameof(Get), new { id = transaction.Id }, transaction);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TransactionDto>> Update(Guid id, UpdateTransactionRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _transactionService.UpdateAsync(CurrentUserId, id, request, cancellationToken));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _transactionService.DeleteAsync(CurrentUserId, id, cancellationToken);

        return NoContent();
    }
}
