using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/etf")]
public class EtfController : BaseController
{
    public EtfController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Etf>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var etfs = await Mapper.ProjectTo<Etf>(
                DbContext.Etfs
            ).ToListAsync();

        return Ok(etfs);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(EtfDetail), 200)]
    public async Task<IActionResult> Get(int id)
    {
        var etf = await Mapper.ProjectTo<EtfDetail>(
                DbContext.Etfs.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (etf == null)
            return NotFound();

        var valueHistory = await Mapper.ProjectTo<EtfValueHistory>(
                DbContext.EtfValueHistory
                    .Where(x => x.EtfId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        etf.History = valueHistory;

        return Ok(etf);
    }

    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Post([FromBody] EtfToAdd etf)
    {
        //TODO: validaton

        var entity = new Database.Entity.Etf
        {
            Ticker = etf.Ticker,
            Name = etf.Name,
            ISIN = etf.ISIN,
            CurrencyId = etf.CurrencyId
        };

        DbContext.Etfs.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Put(int id, [FromBody] EtfToEdit etf)
    {
        //TODO: validaton

        var entity = await DbContext.Etfs.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        entity.Ticker = etf.Ticker;
        entity.Name = etf.Name;
        entity.ISIN = etf.ISIN;
        entity.CurrencyId = etf.CurrencyId;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await DbContext.Etfs.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        DbContext.Etfs.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
