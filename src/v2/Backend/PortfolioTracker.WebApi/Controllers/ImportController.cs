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
    private readonly string alphavantageApiKey;
    private readonly string lemonMarketsApiKey;
    private readonly string eodHistoricalDataApiKey;
    private readonly ILoggerFactory loggerFactory;

    public ImportController(AppDbContext dbContext, IMapper mapper, IConfiguration configuration,
        ILoggerFactory loggerFactory) : base(dbContext, mapper)
    {
        var alphavantageConfig = configuration.GetSection("Alphavantage");
        alphavantageApiKey = alphavantageConfig.GetValue<string>("ApiKey");

        var lemonMarketsConfig = configuration.GetSection("LemonMarkets");
        lemonMarketsApiKey = lemonMarketsConfig.GetValue<string>("ApiKey");

        var eodHistoricalDataConfig = configuration.GetSection("EodHistoricalData");
        eodHistoricalDataApiKey = eodHistoricalDataConfig.GetValue<string>("ApiKey");

        this.loggerFactory = loggerFactory;
    }

    [HttpPost("all")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportAll()
    {
        await ImportCurrency("CZK", false, true, "");
        await ImportCurrency("EUR", false, true, alphavantageApiKey);
        await ImportCurrency("USD", false, true, alphavantageApiKey);

        await ImportCrypto(1, "bitcoin", "eur", false, true);
        await ImportCrypto(2, "ethereum", "eur", false, true);
        await ImportCrypto(3, "cardano", "eur", false, true);
        await ImportCrypto(4, "litecoin", "eur", false, true);
        await ImportCrypto(5, "solana", "eur", false, true);
        await ImportCrypto(6, "nano", "eur", false, true);
        await ImportCrypto(7, "nexo", "eur", false, true);
        await ImportCrypto(8, "loopring", "eur", false, true);
        await ImportCrypto(9, "nexoeur", "eur", false, true);

        // await ImportEtfLemonMarkets(2, "IE00BK5BQT80", true, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(3, "IE00B4L5Y983", true, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(4, "IE00B4L5YC18", true, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(5, "IE00B1XNHC34", true, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(6, "IE00BSPLC298", true, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(7, "IE00BSPLC413", true, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(8, "IE00BKM4GZ66", true, lemonMarketsApiKey);

        await ImportEtfEodHistoricalData(2, "IE00BK5BQT80", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(3, "IE00B4L5Y983", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(4, "IE00B4L5YC18", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(5, "IE00B1XNHC34", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(6, "IE00BSPLC298", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(7, "IE00BSPLC413", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(8, "IE00BKM4GZ66", true, eodHistoricalDataApiKey);

        return NoContent();
    }

    [HttpPost("currencies")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> ImportCurrencies()
    {
        await ImportCurrency("CZK", false, false, "");
        await ImportCurrency("EUR", false, false, alphavantageApiKey);
        await ImportCurrency("USD", false, false, alphavantageApiKey);

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
            .Where(x => x.CurrencyId == currencyId && x.Date >= minimumDate)
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
        // await ImportEtfAlphavantage(2, "IE00BK5BQT80", false, false, alphavantageApiKey);
        // await ImportEtfAlphavantage(3, "IE00B4L5Y983", false, false, alphavantageApiKey);
        // await ImportEtfAlphavantage(4, "IE00B4L5YC18", false, false, alphavantageApiKey);
        // await ImportEtfAlphavantage(5, "IE00B1XNHC34", false, false, alphavantageApiKey);
        // await ImportEtfAlphavantage(6, "IE00BSPLC298", false, false, alphavantageApiKey);
        // await ImportEtfAlphavantage(7, "IE00BSPLC413", false, false, alphavantageApiKey);

        // await ImportEtfLemonMarkets(2, "IE00BK5BQT80", false, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(3, "IE00B4L5Y983", false, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(4, "IE00B4L5YC18", false, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(5, "IE00B1XNHC34", false, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(6, "IE00BSPLC298", false, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(7, "IE00BSPLC413", false, lemonMarketsApiKey);
        // await ImportEtfLemonMarkets(8, "IE00BKM4GZ66", false, lemonMarketsApiKey);

        await ImportEtfEodHistoricalData(2, "IE00BK5BQT80", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(3, "IE00B4L5Y983", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(4, "IE00B4L5YC18", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(5, "IE00B1XNHC34", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(6, "IE00BSPLC298", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(7, "IE00BSPLC413", true, eodHistoricalDataApiKey);
        await ImportEtfEodHistoricalData(8, "IE00BKM4GZ66", true, eodHistoricalDataApiKey);

        return NoContent();
    }

    // private async Task ImportEtfAlphavantage(int etfId, string isin, bool full, bool rewrite, string apiKey)
    // {
    //     var etfValueHistoryService = new EtfValueHistoryService(apiKey, loggerFactory.CreateLogger<EtfValueHistoryService>());
    //     var minimumDate = AlphavantageHelpers.GetMinimumDate(full);

    //     if (!AlphavantageHelpers.IsSupportedIsin(isin))
    //         return;

    //     var result = await etfValueHistoryService.LoadHistory(isin, full);

    //     var valueHistory = await DbContext.EtfValueHistory
    //         .Where(x => x.EtfId == etfId && x.Date >= minimumDate)
    //         .ToListAsync();

    //     foreach (var day in result)
    //     {
    //         var historyValue = valueHistory.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == day.Day.ToString("yyyyMMdd"));
    //         if (historyValue == null)
    //         {
    //             historyValue = new Database.Entity.EtfValueHistory
    //             {
    //                 Date = day.Day,
    //                 Value = day.Close,
    //                 EtfId = etfId
    //             };
    //             DbContext.EtfValueHistory.Add(historyValue);
    //         }
    //         else
    //         {
    //             if (rewrite)
    //             {
    //                 historyValue.Value = day.Close;
    //             }
    //         }
    //     }

    //     await DbContext.SaveChangesAsync();
    // }

    // private async Task ImportEtfLemonMarkets(int etfId, string isin, bool rewrite, string apiKey)
    // {
    //     var etfValueHistoryService = new Services.LemonMarkets.EtfValueHistoryService(apiKey, loggerFactory.CreateLogger<Services.LemonMarkets.EtfValueHistoryService>());

    //     if (!Services.LemonMarkets.LemonMarketsHelpers.IsSupportedIsin(isin))
    //         return;

    //     var startDate = new DateTime(2023, 2, 1, 0, 0, 0, DateTimeKind.Utc);
    //     var days = 35;

    //     var result = await etfValueHistoryService.LoadHistory(isin, startDate, days);

    //     var valueHistory = await DbContext.EtfValueHistory
    //         .Where(x => x.EtfId == etfId && x.Date >= startDate)
    //         .ToListAsync();

    //     foreach (var day in result)
    //     {
    //         var historyValue = valueHistory.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == day.Day.ToString("yyyyMMdd"));
    //         if (historyValue == null)
    //         {
    //             historyValue = new Database.Entity.EtfValueHistory
    //             {
    //                 Date = day.Day,
    //                 Value = day.Close,
    //                 EtfId = etfId
    //             };
    //             DbContext.EtfValueHistory.Add(historyValue);
    //         }
    //         else
    //         {
    //             if (rewrite)
    //             {
    //                 historyValue.Value = day.Close;
    //             }
    //         }
    //     }

    //     await DbContext.SaveChangesAsync();
    // }

    private async Task ImportEtfEodHistoricalData(int etfId, string isin, bool rewrite, string apiKey)
    {
        var etfValueHistoryService = new Services.EodHistoricalData.EtfValueHistoryService(apiKey, loggerFactory.CreateLogger<Services.EodHistoricalData.EtfValueHistoryService>());

        if (!Services.EodHistoricalData.EodHistoricalDataHelpers.IsSupportedIsin(isin))
            return;

        var days = 120;
        var startDate = DateTime.UtcNow.Date.AddDays(-1 * days);

        var result = await etfValueHistoryService.LoadHistory(isin, startDate, days);

        var valueHistory = await DbContext.EtfValueHistory
            .Where(x => x.EtfId == etfId && x.Date >= startDate)
            .ToListAsync();

        foreach (var day in result)
        {
            var historyValue = valueHistory.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == day.Date.ToString("yyyyMMdd"));
            if (historyValue == null)
            {
                historyValue = new Database.Entity.EtfValueHistory
                {
                    Date = day.Date,
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
        await ImportCrypto(9, "nexoeur", "eur", false, false);

        return NoContent();
    }

    private async Task ImportCrypto(int cryptoId, string coingeckoTicker, string currencyId, bool full, bool rewrite)
    {
        var cryptoValueHistoryService = new CryptoValueHistoryService(loggerFactory.CreateLogger<CryptoValueHistoryService>());

        var minimumDate = CoinGeckoHelpers.GetMinimumDate(full);

        var valueHistory = await DbContext.CryptoValueHistory
                    .Where(x => x.CryptoId == cryptoId && x.Date >= minimumDate)
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
