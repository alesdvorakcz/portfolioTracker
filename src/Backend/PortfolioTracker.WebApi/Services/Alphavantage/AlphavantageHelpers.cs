
namespace PortfolioTracker.WebApi.Services.Alphavantage;

public static class AlphavantageHelpers
{
    private const string ROOT_URL = "https://www.alphavantage.co/query";
    private static readonly DateTime s_minimumDate = new(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

    public static DateTime GetMinimumDate(bool full)
    {
        if (full)
            return s_minimumDate;

        return DateTime.UtcNow.Date.AddDays(-140);
    }

    public static string GetEtfHistoryUrl(string symbol, string apiKey, bool full)
    {
        return $"{ROOT_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol={symbol}&outputsize={(full ? "full" : "compact")}&apikey={apiKey}";
    }

    public static string GetCurrencyHistoryUrl(string currencyId, string apiKey, bool full)
    {
        return $"{ROOT_URL}?function=FX_DAILY&from_symbol={currencyId}&to_symbol=CZK&outputsize={(full ? "full" : "compact")}&apikey={apiKey}";
    }

    public static string GetCryptoHistoryUrl(string currencyId, string apiKey, bool full)
    {
        return $"{ROOT_URL}?function=DIGITAL_CURRENCY_DAILY&symbol={currencyId}&market=EUR&outputsize={(full ? "full" : "compact")}&apikey={apiKey}";
    }

    private static readonly Dictionary<string, string> s_isinDictionary = new()
    {
        { "IE00B4L5Y983", "IWDA.AMS" },
        { "IE00B1XNHC34", "IQQH.DEX" },
        { "IE00B4L5YC18", "IEMA.AMS" },
        { "IE00BSPLC298", "ZPRX.DEX" },
        { "IE00BSPLC413", "ZPRV.DEX" },
        { "IE00BK5BQT80", "VWCE.DEX" }
    };

    private static readonly List<string> s_currencyList = new()
    {
        { "CZK" },
        { "EUR" },
        { "USD" }
    };

    private static readonly List<string> s_cryptoList = new()
    {
        { "BTC" },
        { "ETH" },
        { "ADA" },
        { "LTC" },
        { "NANO" },
        { "Nexo" },
        { "NexoEur" },
        { "SOL" },
        { "LRC" }
    };

    public static bool IsSupportedIsin(string isin)
    {
        return s_isinDictionary.ContainsKey(isin);
    }

    public static bool IsSupportedCurrency(string currencyId)
    {
        return s_currencyList.Contains(currencyId);
    }

    public static bool IsSupportedCrypto(string crypto)
    {
        return s_cryptoList.Contains(crypto);
    }

    public static string GetTickerFromIsin(string isin)
    {
        if (!IsSupportedIsin(isin))
            throw new ArgumentException($"Not supported isin '{isin}'");

        return s_isinDictionary[isin];
    }
}
