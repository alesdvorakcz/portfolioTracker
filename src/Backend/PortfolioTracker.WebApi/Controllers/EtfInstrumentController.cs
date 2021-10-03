using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
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

        //TODO: fill up history

        return Ok(etfInstrument);
    }

    [HttpPost]
    [ProducesResponseType(typeof(EtfInstrument), 201)]
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

        //TODO: Query/Command segregation
        var etfInstrumentToReturn = await Mapper.ProjectTo<EtfInstrument>(
            DbContext.EtfInstruments.Where(x => x.Id == entity.Id)
        ).FirstOrDefaultAsync();

        return Created(etfInstrumentToReturn);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(EtfInstrument), 200)]
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

        //TODO: Query/Command segregation
        var etfInstrumentToReturn = Mapper.Map<EtfInstrument>(entity);

        return Ok(etfInstrumentToReturn);
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
}
