using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly AppDbContext dbContext;

    public WeatherForecastController(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IEnumerable<string>> Get()
    {
        var portfolios = await dbContext.Portfolios.Select(x => x.Name).ToListAsync();

        return portfolios;
    }
}
