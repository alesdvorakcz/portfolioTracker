using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Database;
using PortfolioTracker.WebApi.Services.Alphavantage;
using PortfolioTracker.WebApi.Services.CoinGecko;
using PortfolioTracker.WebApi.Services.CoinGecko.Models;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/import")]
public class ImportController : BaseController
{
    private readonly string apiKey1;
    private readonly string apiKey2;
    private readonly string apiKey3;
    private readonly ILoggerFactory loggerFactory;

    public ImportController(AppDbContext dbContext, IMapper mapper, IConfiguration configuration,
        ILoggerFactory loggerFactory) : base(dbContext, mapper)
    {
        var alphavantageConfig = configuration.GetSection("Alphavantage");
        apiKey1 = alphavantageConfig.GetValue<string>("ApiKey1");
        apiKey2 = alphavantageConfig.GetValue<string>("ApiKey2");
        apiKey3 = alphavantageConfig.GetValue<string>("ApiKey3");
        this.loggerFactory = loggerFactory;
    }

    [HttpPost("all")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportAll()
    {
        await ImportCurrency("CZK", false, false, "");
        await ImportCurrency("EUR", false, false, apiKey1);
        await ImportCurrency("USD", false, false, apiKey1);

        await ImportEtf(2, "IE00BK5BQT80", false, false, apiKey2);
        await ImportEtf(3, "IE00B4L5Y983", false, false, apiKey2);

        await ImportCrypto(1, "bitcoin", "eur", false, false);
        await ImportCrypto(2, "ethereum", "eur", false, false);
        await ImportCrypto(3, "cardano", "eur", false, false);
        await ImportCrypto(4, "litecoin", "eur", false, false);
        await ImportCrypto(5, "solana", "eur", false, false);
        await ImportCrypto(6, "nano", "eur", false, false);
        await ImportCrypto(7, "nexo", "eur", false, false);
        await ImportCrypto(8, "loopring", "eur", false, false);
        //TODO: import nexoEUR (fake history)

        await Task.Delay(1000 * 60); //wait 60seconds

        await ImportEtf(4, "IE00B4L5YC18", false, false, apiKey2);
        await ImportEtf(5, "IE00B1XNHC34", false, false, apiKey3);
        await ImportEtf(6, "IE00BSPLC298", false, false, apiKey3);
        await ImportEtf(7, "IE00BSPLC413", false, false, apiKey3);

        return NoContent();
    }

    [HttpPost("currencies")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportCurrencies()
    {
        await ImportCurrency("CZK", false, false, "");
        await ImportCurrency("EUR", false, false, apiKey1);
        await ImportCurrency("USD", false, false, apiKey1);

        return NoContent();
    }

    private async Task ImportCurrency(string currencyId, bool full, bool rewrite, string apiKey)
    {
        var currencyValueHistoryService = new CurrencyValueHistoryService(apiKey, loggerFactory.CreateLogger<CurrencyValueHistoryService>());
        var minimumDate = AlphavantageHelpers.GetMinimumDate(full);

        if (!AlphavantageHelpers.IsSupportedCurrency(currencyId))
            return;

        var result = await currencyValueHistoryService.LoadHistory(currencyId, full);

        var valueHistory = await DbContext.CurrencyValueHistory
            .Where(x => x.CurrencyId == currencyId && x.Date > minimumDate)
            .ToListAsync();

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == day.Day.ToString("yyyyMMdd"));
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

    [HttpPost("etfs")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportEtfs()
    {
        await ImportEtf(2, "IE00BK5BQT80", false, false, apiKey2);
        await ImportEtf(3, "IE00B4L5Y983", false, false, apiKey2);
        await ImportEtf(4, "IE00B4L5YC18", false, false, apiKey2);
        await ImportEtf(5, "IE00B1XNHC34", false, false, apiKey3);
        await ImportEtf(6, "IE00BSPLC298", false, false, apiKey3);
        await ImportEtf(7, "IE00BSPLC413", false, false, apiKey3);

        return NoContent();
    }

    private async Task ImportEtf(int etfId, string isin, bool full, bool rewrite, string apiKey)
    {
        var etfValueHistoryService = new EtfValueHistoryService(apiKey, loggerFactory.CreateLogger<EtfValueHistoryService>());
        var minimumDate = AlphavantageHelpers.GetMinimumDate(full);

        if (!AlphavantageHelpers.IsSupportedIsin(isin))
            return;

        var result = await etfValueHistoryService.LoadHistory(isin, full);

        var valueHistory = await DbContext.EtfValueHistory
            .Where(x => x.EtfId == etfId && x.Date > minimumDate)
            .ToListAsync();

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == day.Day.ToString("yyyyMMdd"));
            if (historyValue == null)
            {
                historyValue = new Database.Entity.EtfValueHistory
                {
                    Date = day.Day,
                    Value = day.Close,
                    EtfId = etfId
                };
                DbContext.EtfValueHistory.Add(historyValue);
            }
            else
            {
                if (rewrite)
                {
                    historyValue.Value = day.Close;
                }
            }
        }

        await DbContext.SaveChangesAsync();
    }

    [HttpPost("cryptos")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportCryptos()
    {
        await ImportCrypto(1, "bitcoin", "eur", false, false);
        await ImportCrypto(2, "ethereum", "eur", false, false);
        await ImportCrypto(3, "cardano", "eur", false, false);
        await ImportCrypto(4, "litecoin", "eur", false, false);
        await ImportCrypto(5, "solana", "eur", false, false);
        await ImportCrypto(6, "nano", "eur", false, false);
        await ImportCrypto(7, "nexo", "eur", false, false);
        await ImportCrypto(8, "loopring", "eur", false, false);
        //TODO: import nexoEUR (fake history)

        return NoContent();
    }

    private async Task ImportCrypto(int cryptoId, string coingeckoTicker, string currencyId, bool full, bool rewrite)
    {
        var cryptoValueHistoryService = new CryptoValueHistoryService(loggerFactory.CreateLogger<CryptoValueHistoryService>());

        var minimumDate = CoinGeckoHelpers.GetMinimumDate(full);

        var valueHistory = await DbContext.CryptoValueHistory
                    .Where(x => x.CryptoId == cryptoId && x.Date > minimumDate)
                    .ToListAsync();

        IEnumerable<CryptoDailyValue> result;

        if (full)
        {
            var toDate = DateTime.UtcNow.Date;
            result = await cryptoValueHistoryService.LoadHistory(coingeckoTicker, currencyId, minimumDate, toDate);
        }
        else
        {
            result = await cryptoValueHistoryService.LoadHistory(coingeckoTicker, currencyId);
        }

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == day.Day.ToString("yyyyMMdd"));
            if (historyValue == null)
            {
                historyValue = new Database.Entity.CryptoValueHistory
                {
                    Date = day.Day,
                    Value = day.Close,
                    CryptoId = cryptoId
                };
                DbContext.CryptoValueHistory.Add(historyValue);
            }
            else
            {
                if (rewrite)
                {
                    historyValue.Value = day.Close;
                }
            }
        }

        await DbContext.SaveChangesAsync();
    }
}
