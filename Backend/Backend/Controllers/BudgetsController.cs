using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[Route("api/budgets")]
public sealed class BudgetsController : ApiControllerBase
{
    private readonly IBudgetService _budgetService;

    public BudgetsController(IBudgetService budgetService) => _budgetService = budgetService;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<BudgetDto>>> List([FromQuery] bool includeInactive = true, CancellationToken cancellationToken = default)
    {
        return Ok(await _budgetService.ListAsync(CurrentUserId, includeInactive, cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BudgetDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _budgetService.GetAsync(CurrentUserId, id, cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<BudgetDto>> Create(SaveBudgetRequest request, CancellationToken cancellationToken)
    {
        var budget = await _budgetService.CreateAsync(CurrentUserId, request, cancellationToken);

        return CreatedAtAction(nameof(Get), new { id = budget.Id }, budget);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<BudgetDto>> Update(Guid id, SaveBudgetRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _budgetService.UpdateAsync(CurrentUserId, id, request, cancellationToken));
    }

    [HttpPost("{id:guid}/deactivate")]
    public async Task<ActionResult<BudgetDto>> Deactivate(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _budgetService.SetActiveAsync(CurrentUserId, id, false, cancellationToken));
    }

    [HttpPost("{id:guid}/reactivate")]
    public async Task<ActionResult<BudgetDto>> Reactivate(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _budgetService.SetActiveAsync(CurrentUserId, id, true, cancellationToken));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _budgetService.DeleteAsync(CurrentUserId, id, cancellationToken);

        return NoContent();
    }
}
