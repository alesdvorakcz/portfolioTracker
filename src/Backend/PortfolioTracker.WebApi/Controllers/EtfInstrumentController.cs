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
public class EtfInstrumentController : BaseController
{
    public EtfInstrumentController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<EtfInstrument>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var instruments = await Mapper.ProjectTo<EtfInstrument>(
                DbContext.EtfInstruments
            ).ToListAsync();

        return Ok(instruments);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(EtfInstrumentDetail), 200)]
    public async Task<IActionResult> Get(int id)
    {
        var etfInstrument = await Mapper.ProjectTo<EtfInstrumentDetail>(
                DbContext.EtfInstruments.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (etfInstrument == null)
            return NotFound();

        var tradeHistory = await Mapper.ProjectTo<EtfTradeHistory>(
                DbContext.EtfTradeHistory
                    .Where(x => x.EtfInstrumentId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        var valueHistory = await Mapper.ProjectTo<EtfInstrumentValueHistory>(
                DbContext.EtfInstrumentValueHistory
                    .Where(x => x.EtfInstrumentId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        etfInstrument.TradeHistory = tradeHistory;
        etfInstrument.ValueHistory = valueHistory;

        return Ok(etfInstrument);
    }

    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Post([FromBody] EtfInstrumentToAdd etfInstrument)
    {
        //TODO: validaton

        var entity = new Database.Entity.EtfInstrument
        {
            Slug = etfInstrument.Slug,
            Name = etfInstrument.Name,
            Isin = etfInstrument.Isin,
            CurrencyId = etfInstrument.CurrencyId
        };

        DbContext.EtfInstruments.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Put(int id, [FromBody] EtfInstrumentToEdit etfInstrument)
    {
        //TODO: validaton

        var entity = await DbContext.EtfInstruments.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        entity.Slug = etfInstrument.Slug;
        entity.Name = etfInstrument.Name;
        entity.Isin = etfInstrument.Isin;
        entity.CurrencyId = etfInstrument.CurrencyId;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await DbContext.EtfInstruments.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        DbContext.EtfInstruments.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{etfInstrumentId}/trade")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddTradeToHistory([Required] int etfInstrumentId, [FromBody] EtfTradeHistoryToAdd trade)
    {
        var etf = await DbContext.EtfInstruments.FirstOrDefaultAsync(x => x.Id == etfInstrumentId);

        if (etf == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.EtfTradeHistory.AnyAsync(x => x.EtfInstrumentId == etfInstrumentId && x.Date == trade.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(trade.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.EtfTradeHistory
        {
            Date = trade.Date,
            Amount = trade.Amount,
            UnitPrice = trade.UnitPrice,
            EtfInstrumentId = etfInstrumentId
        };

        DbContext.EtfTradeHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{etfInstrumentId}/trade/{tradeId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditTradeFromHistory([Required] int etfInstrumentId, [Required] int tradeId, [FromBody] EtfTradeHistoryToEdit trade)
    {
        var entity = await DbContext.EtfTradeHistory.FirstOrDefaultAsync(x => x.Id == tradeId && x.EtfInstrumentId == etfInstrumentId);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.EtfTradeHistory.AnyAsync(x => x.EtfInstrumentId == etfInstrumentId && x.Date == trade.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(trade.Date), ValidationError.Duplicity);

        entity.Date = trade.Date;
        entity.Amount = trade.Amount;
        entity.UnitPrice = trade.UnitPrice;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{etfInstrumentId}/trade/{tradeId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteTradeFromHistory([Required] int etfInstrumentId, [Required] int tradeId)
    {
        var entity = await DbContext.EtfTradeHistory.FirstOrDefaultAsync(x => x.Id == tradeId && x.EtfInstrumentId == etfInstrumentId);

        if (entity == null)
            return NotFound();

        DbContext.EtfTradeHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{etfInstrumentId}/history")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddValueToHistory([Required] int etfInstrumentId, [FromBody] EtfInstrumentValueHistoryToAdd historyValue)
    {
        var etf = await DbContext.EtfInstruments.FirstOrDefaultAsync(x => x.Id == etfInstrumentId);

        if (etf == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.EtfInstrumentValueHistory.AnyAsync(x => x.EtfInstrumentId == etfInstrumentId && x.Date == historyValue.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(historyValue.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.EtfInstrumentValueHistory
        {
            Date = historyValue.Date,
            Value = historyValue.Value,
            EtfInstrumentId = etfInstrumentId
        };

        DbContext.EtfInstrumentValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{etfInstrumentId}/history/{valueId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditValueFromHistory([Required] int etfInstrumentId, [Required] int valueId, [FromBody] EtfInstrumentValueHistoryToDdit historyValue)
    {
        var entity = await DbContext.EtfInstrumentValueHistory.FirstOrDefaultAsync(x => x.Id == valueId && x.EtfInstrumentId == etfInstrumentId);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.EtfInstrumentValueHistory.AnyAsync(x => x.EtfInstrumentId == etfInstrumentId && x.Date == historyValue.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(historyValue.Date), ValidationError.Duplicity);

        entity.Date = historyValue.Date;
        entity.Value = historyValue.Value;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{etfInstrumentId}/history/{valueId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteValueFromHistory([Required] int etfInstrumentId, [Required] int valueId)
    {
        var entity = await DbContext.EtfInstrumentValueHistory.FirstOrDefaultAsync(x => x.Id == valueId && x.EtfInstrumentId == etfInstrumentId);

        if (entity == null)
            return NotFound();

        DbContext.EtfInstrumentValueHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
