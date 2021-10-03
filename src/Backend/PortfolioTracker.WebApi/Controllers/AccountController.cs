using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly AppDbContext dbContext;

    public AccountController(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IEnumerable<Account>> GetAll()
    {
        var portfolios = await dbContext.Portfolios
            .Select(x => new Account { Id = x.Id, Name = x.Name })
            .ToListAsync();

        return portfolios;
    }
}
