using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[Route("api/categories")]
public sealed class CategoriesController : ApiControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService) => _categoryService = categoryService;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CategoryDto>>> List([FromQuery] bool includeInactive = true, CancellationToken cancellationToken = default)
    {
        return Ok(await _categoryService.ListAsync(CurrentUserId, includeInactive, cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CategoryDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _categoryService.GetAsync(CurrentUserId, id, cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create(SaveCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _categoryService.CreateAsync(CurrentUserId, request, cancellationToken);

        return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<CategoryDto>> Update(Guid id, SaveCategoryRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _categoryService.UpdateAsync(CurrentUserId, id, request, cancellationToken));
    }

    [HttpPost("{id:guid}/deactivate")]
    public async Task<ActionResult<CategoryDto>> Deactivate(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _categoryService.SetActiveAsync(CurrentUserId, id, false, cancellationToken));
    }

    [HttpPost("{id:guid}/reactivate")]
    public async Task<ActionResult<CategoryDto>> Reactivate(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _categoryService.SetActiveAsync(CurrentUserId, id, true, cancellationToken));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _categoryService.DeleteAsync(CurrentUserId, id, cancellationToken);

        return NoContent();
    }
}
