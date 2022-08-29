using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/crypto")]
public class CryptoController : BaseController
{
    public CryptoController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Crypto>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var instruments = await Mapper.ProjectTo<Crypto>(
                DbContext.Cryptos
            ).ToListAsync();

        return Ok(instruments);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CryptoDetail), 200)]
    public async Task<IActionResult> Get(int id)
    {
        var crypto = await Mapper.ProjectTo<CryptoDetail>(
                DbContext.Cryptos.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (crypto == null)
            return NotFound();

        var valueHistory = await Mapper.ProjectTo<CryptoValueHistory>(
                DbContext.CryptoValueHistory
                    .Where(x => x.CryptoId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        crypto.History = valueHistory;

        return Ok(crypto);
    }

    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Post([FromBody] CryptoToAdd crypto)
    {
        //TODO: validaton

        var entity = new Database.Entity.Crypto
        {
            Ticker = crypto.Ticker,
            Name = crypto.Name,
            CurrencyId = crypto.CurrencyId
        };

        DbContext.Cryptos.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Put(int id, [FromBody] CryptoToEdit crypto)
    {
        //TODO: validaton

        var entity = await DbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        entity.Ticker = crypto.Ticker;
        entity.Name = crypto.Name;
        entity.CurrencyId = crypto.CurrencyId;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await DbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        DbContext.Cryptos.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
