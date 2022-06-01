using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

    [HttpPut("cryptoCurrency")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportCryptocurrencies([FromBody] ImportCryptocurrenciesQuery query)
    {
        await ImportAllCryptocurrencies(query.Full, query.Rewrite, query.Filter);

        return NoContent();
    }

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
                    // Value = day.AdjustedClose,
                    Value = day.Close,
                    EtfInstrumentId = etfId
                };
                DbContext.EtfInstrumentValueHistory.Add(historyValue);
            }
            else
            {
                if (rewrite)
                {
                    // historyValue.Value = day.AdjustedClose;
                    historyValue.Value = day.Close;
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

    private async Task ImportCryptoCurrency(string cryptoCurrencyId, bool full, bool rewrite)
    {
        var cryptoCurrencyValueHistoryService = new CryptoValueHistoryService(apiKey);
        var minimumDate = AlphavantageHelpers.GetMinimumDate(full);

        if (!AlphavantageHelpers.IsSupportedCrypto(cryptoCurrencyId))
            return;

        var result = await cryptoCurrencyValueHistoryService.LoadHistory(cryptoCurrencyId, full);

        var valueHistory = await DbContext.CryptoCurrencyValueHistory
            .Where(x => x.CryptoCurrencyId == cryptoCurrencyId && x.Date > minimumDate)
            .ToListAsync();

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date == day.Day);
            if (historyValue == null)
            {
                historyValue = new Database.Entity.CryptoCurrencyValueHistory
                {
                    Date = day.Day,
                    ConversionRateEUR = day.CloseEUR,
                    ConversionRateUSD = day.CloseUSD,
                    CryptoCurrencyId = cryptoCurrencyId
                };
                DbContext.CryptoCurrencyValueHistory.Add(historyValue);
            }
            else
            {
                if (rewrite)
                {
                    historyValue.ConversionRateEUR = day.CloseEUR;
                    historyValue.ConversionRateUSD = day.CloseUSD;
                }
            }
        }

        await DbContext.SaveChangesAsync();
    }

    private async Task ImportAllCryptocurrencies(bool full, bool rewrite, IEnumerable<string>? cryptoCurrencyIds = null)
    {
        var cryptoCurrencies = await DbContext.CryptoCurrencies
            .Where(x => cryptoCurrencyIds == null || cryptoCurrencyIds.Contains(x.Id))
            .ToListAsync();

        foreach (var entity in cryptoCurrencies)
        {
            await ImportCryptoCurrency(entity.Id, full, rewrite);
        }
    }
}
