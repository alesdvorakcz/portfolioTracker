using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : BaseController
{
    public DashboardController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(string), 200)]
    public async Task<IActionResult> Get()
    {
        await Task.Delay(10);

        return Ok("ahoj");
    }
}
