using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/crypto")]
public class CryptoValueHistoryController : BaseController
{
    public CryptoValueHistoryController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpPost("{id}/history")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddValueToHistory([Required] int id, [FromBody] CryptoValueHistoryToAdd value)
    {
        var crypto = await DbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == id);

        if (crypto == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CryptoValueHistory.AnyAsync(x => x.CryptoId == id && x.Date == value.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.CryptoValueHistory
        {
            CryptoId = id,
            Date = value.Date,
            Value = value.Value,
        };

        DbContext.CryptoValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditValueFromHistory([Required] int id, [Required] int valueHistoryId, [FromBody] CryptoValueHistoryToEdit value)
    {
        var entity = await DbContext.CryptoValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CryptoId == id);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CryptoValueHistory.AnyAsync(x => x.CryptoId == id && x.Date == value.Date && x.Id != entity.Id);
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
        var entity = await DbContext.CryptoValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.CryptoId == id);

        if (entity == null)
            return NotFound();

        DbContext.CryptoValueHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}