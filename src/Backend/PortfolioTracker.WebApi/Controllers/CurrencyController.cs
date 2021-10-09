using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Input;
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

    [HttpPost("{currencyId}/history")]
    [ProducesResponseType(typeof(CurrencyValueHistory), 201)]
    public async Task<IActionResult> AddValueToHistory([Required] string currencyId, [FromBody] CurrencyValueHistoryToAdd value)
    {
        var currency = await DbContext.Currencies.FirstOrDefaultAsync(x => x.Id == currencyId);

        if (currency == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CurrencyValueHistory.AnyAsync(x => x.CurrencyId == currencyId && x.Date == value.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.CurrencyValueHistory
        {
            CurrencyId = currencyId,
            Date = value.Date,
            ConversionRate = value.ConversionRate,
        };

        DbContext.CurrencyValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        //TODO: Query/Command segregation
        var valueHistoryToReturn = await Mapper.ProjectTo<CurrencyValueHistory>(
            DbContext.CurrencyValueHistory.Where(x => x.Id == entity.Id)
        ).FirstOrDefaultAsync();

        return Created(valueHistoryToReturn);
    }

    [HttpPut("{currencyId}/history/{valueHistoryId}")]
    [ProducesResponseType(typeof(CurrencyValueHistory), 200)]
    public async Task<IActionResult> EditValueFromHistory([Required] string currencyId, [Required] int valueHistoryId, [FromBody] CurrencyValueHistoryToEdit value)
    {
        var entity = await DbContext.CurrencyValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CurrencyId == currencyId);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CurrencyValueHistory.AnyAsync(x => x.CurrencyId == currencyId && x.Date == value.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        entity.Date = value.Date;
        entity.ConversionRate = value.ConversionRate;

        await DbContext.SaveChangesAsync();

        //TODO: Query/Command segregation
        var valueHistoryToReturn = Mapper.Map<CurrencyValueHistory>(entity);

        return Ok(valueHistoryToReturn);
    }

    [HttpPut("{currencyId}/history/load")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> LoadHistory([Required] string currencyId, [Required] DateTime from, [Required] DateTime to)
    {
        await Task.Delay(500);

        return NoContent();
    }
}
