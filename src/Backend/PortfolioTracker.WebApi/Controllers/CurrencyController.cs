using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;
using PortfolioTracker.WebApi.Services;

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

    [HttpPut("history/import")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportHistory([FromBody] CurrencyHistoryImportRequest requestData)
    {
        if (requestData.From > requestData.To)
            throw new Common.ValidationException(nameof(requestData.From), "From needs to be before To");

        if (requestData.To > DateTime.UtcNow.Date)
            throw new Common.ValidationException(nameof(requestData.To), "Date Range cannot go to future");

        if ((requestData.To - requestData.From).TotalDays > 10)
            throw new Common.ValidationException(nameof(requestData.To), "Date Range can be maximum of 10 days");

        var currencies = await DbContext.Currencies
            .Where(x => requestData.CurrencyIds.Contains(x.Id))
            .ToListAsync();

        if (currencies.Count < requestData.CurrencyIds.Length)
            return NotFound();

        var historyValues =
            (
                await DbContext.CurrencyValueHistory
                    .Where(x => requestData.CurrencyIds.Contains(x.CurrencyId) && x.Date >= requestData.From && x.Date <= requestData.To)
                    .ToListAsync()
            )
            .GroupBy(x => x.Date)
            .Select(x => new { Date = x.Key, Values = x })
            .ToList();

        var dates = GetListOfDates(requestData.From, requestData.To);
        foreach (var valuesPerDay in historyValues)
            dates.RemoveAll(x => x.Date == valuesPerDay.Date && valuesPerDay.Values.Count() == currencies.Count);

        var loadCurrencyValueHistoryService = new LoadCurrencyValueHistoryService();
        var result = await loadCurrencyValueHistoryService.LoadHistory(requestData.CurrencyIds, dates);

        foreach (var row in result)
        {
            var toAdd = true;

            var day = historyValues.FirstOrDefault(x => x.Date == row.Date);
            if (day != null)
            {
                var value = day.Values.FirstOrDefault(x => x.CurrencyId == row.CurrencyId);
                if (value != null)
                {
                    value.ConversionRate = row.ConversionRate;
                    toAdd = false;
                }
            }

            if (toAdd)
            {
                DbContext.CurrencyValueHistory.Add(new Database.Entity.CurrencyValueHistory
                {
                    CurrencyId = row.CurrencyId,
                    Date = row.Date,
                    ConversionRate = row.ConversionRate
                });
            }
        }

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    private static List<DateTime> GetListOfDates(DateTime from, DateTime to)
    {
        var list = new List<DateTime>();
        var day = from;
        while (day <= to)
        {
            list.Add(day);
            day = day.AddDays(1);
        }

        return list;
    }
}
