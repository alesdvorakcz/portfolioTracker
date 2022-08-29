using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/currency")]
public class CurrencyValueHistoryController : BaseController
{
    public CurrencyValueHistoryController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpPost("{id}/history")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddValueToHistory([Required] string id, [FromBody] CurrencyValueHistoryToAdd value)
    {
        var currency = await DbContext.Currencies.FirstOrDefaultAsync(x => x.Id == id);

        if (currency == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CurrencyValueHistory.AnyAsync(x => x.CurrencyId == id && x.Date == value.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.CurrencyValueHistory
        {
            CurrencyId = id,
            Date = value.Date,
            ConversionRate = value.ConversionRate,
        };

        DbContext.CurrencyValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditValueFromHistory([Required] string id, [Required] int valueHistoryId, [FromBody] CurrencyValueHistoryToEdit value)
    {
        var entity = await DbContext.CurrencyValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CurrencyId == id);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CurrencyValueHistory.AnyAsync(x => x.CurrencyId == id && x.Date == value.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        entity.Date = value.Date;
        entity.ConversionRate = value.ConversionRate;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteValueFromHistory([Required] string id, [Required] int valueHistoryId)
    {
        var entity = await DbContext.CurrencyValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CurrencyId == id);

        if (entity == null)
            return NotFound();

        DbContext.CurrencyValueHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}