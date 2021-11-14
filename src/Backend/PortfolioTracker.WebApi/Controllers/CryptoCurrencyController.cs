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
public class CryptoCurrencyController : BaseController
{
    public CryptoCurrencyController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<CryptoCurrency>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var currencies = await Mapper.ProjectTo<CryptoCurrency>(
                DbContext.CryptoCurrencies
            ).ToListAsync();

        return Ok(currencies);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CryptoCurrencyDetail), 200)]
    public async Task<IActionResult> Get(string id)
    {
        var currency = await Mapper.ProjectTo<CryptoCurrencyDetail>(
                DbContext.CryptoCurrencies.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (currency == null)
            return NotFound();

        var valueHistory = await Mapper.ProjectTo<CryptoCurrencyValueHistory>(
                DbContext.CryptoCurrencyValueHistory
                    .Where(x => x.CryptoCurrencyId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        currency.History = valueHistory;

        return Ok(currency);
    }

    [HttpPost("{cryptoCurrencyId}/history")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddValueToHistory([Required] string cryptoCurrencyId, [FromBody] CryptoCurrencyValueHistoryToAdd value)
    {
        var cryptoCurrency = await DbContext.CryptoCurrencies.FirstOrDefaultAsync(x => x.Id == cryptoCurrencyId);

        if (cryptoCurrency == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CryptoCurrencyValueHistory.AnyAsync(x => x.CryptoCurrencyId == cryptoCurrencyId && x.Date == value.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.CryptoCurrencyValueHistory
        {
            CryptoCurrencyId = cryptoCurrencyId,
            Date = value.Date,
            ConversionRateUSD = value.ConversionRateUSD,
            ConversionRateEUR = value.ConversionRateEUR,
        };

        DbContext.CryptoCurrencyValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{cryptoCurrencyId}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditValueFromHistory([Required] string cryptoCurrencyId, [Required] int valueHistoryId, [FromBody] CryptoCurrencyValueHistoryToEdit value)
    {
        var entity = await DbContext.CryptoCurrencyValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CryptoCurrencyId == cryptoCurrencyId);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CryptoCurrencyValueHistory.AnyAsync(x => x.CryptoCurrencyId == cryptoCurrencyId && x.Date == value.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        entity.Date = value.Date;
        entity.ConversionRateUSD = value.ConversionRateUSD;
        entity.ConversionRateEUR = value.ConversionRateEUR;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{cryptoCurrencyId}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteValueFromHistory([Required] string cryptoCurrencyId, [Required] int valueHistoryId)
    {
        var entity = await DbContext.CryptoCurrencyValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CryptoCurrencyId == cryptoCurrencyId);

        if (entity == null)
            return NotFound();

        DbContext.CryptoCurrencyValueHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
