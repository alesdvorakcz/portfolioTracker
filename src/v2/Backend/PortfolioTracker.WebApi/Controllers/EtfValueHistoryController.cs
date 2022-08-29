using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/etf")]
public class EtfValueHistoryController : BaseController
{
    public EtfValueHistoryController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpPost("{id}/history")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddValueToHistory([Required] int id, [FromBody] EtfValueHistoryToAdd value)
    {
        var etf = await DbContext.Etfs.FirstOrDefaultAsync(x => x.Id == id);

        if (etf == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.EtfValueHistory.AnyAsync(x => x.EtfId == id && x.Date == value.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.EtfValueHistory
        {
            EtfId = id,
            Date = value.Date,
            Value = value.Value,
        };

        DbContext.EtfValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditValueFromHistory([Required] int id, [Required] int valueHistoryId, [FromBody] EtfValueHistoryToEdit value)
    {
        var entity = await DbContext.EtfValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.EtfId == id);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.EtfValueHistory.AnyAsync(x => x.EtfId == id && x.Date == value.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        entity.Date = value.Date;
        entity.Value = value.Value;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteValueFromHistory([Required] int id, [Required] int valueHistoryId)
    {
        var entity = await DbContext.EtfValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.EtfId == id);

        if (entity == null)
            return NotFound();

        DbContext.EtfValueHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
