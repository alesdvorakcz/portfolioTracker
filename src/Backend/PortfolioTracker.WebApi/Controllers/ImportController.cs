using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Database;
using PortfolioTracker.WebApi.Services.Alphavantage;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImportController : BaseController
{
    private readonly string apiKey;

    public ImportController(AppDbContext dbContext, IMapper mapper, IConfiguration configuration) : base(dbContext, mapper)
    {
        var alphavantageConfig = configuration.GetSection("Alphavantage");
        apiKey = alphavantageConfig.GetValue<string>("ApiKey");
    }

    [HttpPut]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportData([FromBody] ImportQuery query)
    {
        //TODO: this will not work because of the api restrictions

        await ImportAllCurrencies(query.Full, query.Rewrite);
        await ImportAllEtfs(query.Full, query.Rewrite);
        // await ImportAllCryptocurrencies(query.Full, query.Rewrite);

        return NoContent();
    }

    [HttpPut("etf")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportEtfs([FromBody] ImportEtfsQuery query)
    {
        await ImportAllEtfs(query.Full, query.Rewrite, query.Filter);

        return NoContent();
    }

    [HttpPut("currency")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportCurrencies([FromBody] ImportCurrenciesQuery query)
    {
        await ImportAllCurrencies(query.Full, query.Rewrite, query.Filter);

        return NoContent();
    }

    // [HttpPut("cryptocurrency")]
    // [ProducesResponseType(204)]
    // public async Task<IActionResult> ImportCryptocurrencies([FromBody] ImportCryptocurrenciesQuery query)
    // {
    //     //TODO: filter
    //     await ImportAllCryptocurrencies(query.Full, query.Rewrite);

    //     return NoContent();
    // }

    private async Task ImportCurrency(string currencyId, bool full, bool rewrite)
    {
        var currencyValueHistoryService = new CurrencyValueHistoryService(apiKey);
        var minimumDate = AlphavantageHelpers.GetMinimumDate(full);

        if (!AlphavantageHelpers.IsSupportedCurrency(currencyId))
            return;

        var result = await currencyValueHistoryService.LoadHistory(currencyId, full);

        var valueHistory = await DbContext.CurrencyValueHistory
            .Where(x => x.CurrencyId == currencyId && x.Date > minimumDate)
            .ToListAsync();

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date == day.Day);
            if (historyValue == null)
            {
                historyValue = new Database.Entity.CurrencyValueHistory
                {
                    Date = day.Day,
                    ConversionRate = day.Close,
                    CurrencyId = currencyId
                };
                DbContext.CurrencyValueHistory.Add(historyValue);
            }
            else
            {
                if (rewrite)
                {
                    historyValue.ConversionRate = day.Close;
                }
            }
        }

        await DbContext.SaveChangesAsync();
    }

    private async Task ImportAllCurrencies(bool full, bool rewrite, IEnumerable<string>? currencyIds = null)
    {
        var currencies = await DbContext.Currencies
            .Where(x => currencyIds == null || currencyIds.Contains(x.Id))
            .ToListAsync();

        foreach (var entity in currencies)
        {
            await ImportCurrency(entity.Id, full, rewrite);
        }
    }

    private async Task ImportEtf(int etfId, string isin, bool full, bool rewrite)
    {
        var etfValueHistoryService = new EtfValueHistoryService(apiKey);
        var minimumDate = AlphavantageHelpers.GetMinimumDate(full);

        if (!AlphavantageHelpers.IsSupportedIsin(isin))
            return;

        var result = await etfValueHistoryService.LoadHistory(isin, full);

        var valueHistory = await DbContext.EtfInstrumentValueHistory
            .Where(x => x.EtfInstrumentId == etfId && x.Date > minimumDate)
            .ToListAsync();

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date == day.Day);
            if (historyValue == null)
            {
                historyValue = new Database.Entity.EtfInstrumentValueHistory
                {
                    Date = day.Day,
                    Value = day.AdjustedClose,
                    EtfInstrumentId = etfId
                };
                DbContext.EtfInstrumentValueHistory.Add(historyValue);
            }
            else
            {
                if (rewrite)
                {
                    historyValue.Value = day.AdjustedClose;
                }
            }
        }

        await DbContext.SaveChangesAsync();
    }

    private async Task ImportAllEtfs(bool full, bool rewrite, IEnumerable<int>? etfIds = null)
    {
        var etfInstruments = await DbContext.EtfInstruments
            .Where(x => etfIds == null || etfIds.Contains(x.Id))
            .ToListAsync();

        foreach (var entity in etfInstruments)
        {
            await ImportEtf(entity.Id, entity.Isin, full, rewrite);
        }
    }

    // private async Task ImportAllCryptocurrencies(bool full, bool rewrite)
    // {
    //     //TODO
    //     await Task.Delay(50);
    // }
}
