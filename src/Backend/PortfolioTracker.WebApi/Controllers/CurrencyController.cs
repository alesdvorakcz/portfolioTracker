using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CurrencyController : BaseController
{
    public CurrencyController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Currency>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var currencies = await Mapper.ProjectTo<Currency>(
                DbContext.Currencies
            ).ToListAsync();

        return Ok(currencies);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CurrencyDetail), 200)]
    public async Task<IActionResult> Get(string id)
    {
        var currency = await Mapper.ProjectTo<CurrencyDetail>(
                DbContext.Currencies.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (currency == null)
            return NotFound();

        var valueHistory = await Mapper.ProjectTo<CurrencyValueHistory>(
                DbContext.CurrencyValueHistory
                    .Where(x => x.CurrencyId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        currency.History = valueHistory;

        return Ok(currency);
    }
}
