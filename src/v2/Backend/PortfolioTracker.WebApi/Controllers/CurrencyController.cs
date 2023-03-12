using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/currency")]
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


        foreach (var currency in currencies)
        {
            currency.LastValue = await Mapper.ProjectTo<CurrencyValueHistoryRow>(
                    DbContext.CurrencyValueHistory
                        .Where(x => x.CurrencyId == currency.Id)
                        .OrderByDescending(x => x.Date)
                )
                .FirstOrDefaultAsync();
        }

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

        var valueHistory = await Mapper.ProjectTo<CurrencyValueHistoryRow>(
                DbContext.CurrencyValueHistory
                    .Where(x => x.CurrencyId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        currency.History = valueHistory;

        return Ok(currency);
    }

    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Add([FromBody] CurrencyToAdd data)
    {
        var exists = await DbContext.Currencies.AnyAsync(x => x.Id == data.Id);
        if (exists)
            return StatusCode(400, $"Currency with Id {data.Id} already exists");

        var currency = new Database.Entity.Currency
        {
            Id = data.Id,
            Name = data.Name
        };

        DbContext.Currencies.Add(currency);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Edit(string id, [FromBody] CurrencyToEdit data)
    {
        var entity = await DbContext.Currencies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound();

        entity.Name = data.Name;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(string id)
    {
        var entity = await DbContext.Currencies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound();

        DbContext.Currencies.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
