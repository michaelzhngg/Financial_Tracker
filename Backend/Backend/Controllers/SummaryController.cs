using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[Route("api/summary")]
public sealed class SummaryController : ApiControllerBase
{
    private readonly ISummaryService _summaryService;

    public SummaryController(ISummaryService summaryService) => _summaryService = summaryService;

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardDto>> Dashboard(CancellationToken cancellationToken)
    {
        return Ok(await _summaryService.GetDashboardAsync(CurrentUserId, cancellationToken));
    }

    [HttpGet("monthly")]
    public async Task<ActionResult<MonthlySummaryDto>> Monthly([FromQuery] int? year, [FromQuery] int? month, CancellationToken cancellationToken)
    {
        var now = DateTimeOffset.Now;

        return Ok(await _summaryService.GetMonthlySummaryAsync(CurrentUserId, year ?? now.Year, month ?? now.Month, cancellationToken));
    }
}
