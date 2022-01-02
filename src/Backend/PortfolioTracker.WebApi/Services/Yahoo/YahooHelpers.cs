namespace PortfolioTracker.WebApi.Services.Yahoo;

public static class YahooHelpers
{
    private static readonly Dictionary<string, string> s_isinDictionary = new()
    {
        { "IE00B4L5Y983", "IWDA.AS" },
        { "IE00B1XNHC34", "IQQH.DE" },
        { "IE00B4L5YC18", "IEMA.AS" },
        { "IE00BSPLC298", "ZPRX.DE" },
        { "IE00BSPLC413", "ZPRV.DE" },
        { "IE00BK5BQT80", "VWCE.DE" }
    };

    private static readonly Dictionary<string, string> s_currencyDictionary = new()
    {
        { "CZK", "" },
        { "EUR", "" },
        { "USD", "" }
    };

    private static readonly Dictionary<string, string> s_cryptoDictionary = new()
    {
        { "BTC", "" },
        { "ETH", "" },
        { "ADA", "" },
        { "LTC", "" },
        { "NANO", "" },
        { "Nexo", "" },
        { "NexoEur", "" },
        { "SOL", "" },
        { "LRC", "" }
    };

    public static bool IsSupportedIsin(string isin)
    {
        return s_isinDictionary.ContainsKey(isin);
    }

    public static string GetTickerFromIsin(string isin)
    {
        if (!IsSupportedIsin(isin))
            throw new ArgumentException($"Not supported isin '{isin}'");

        return s_isinDictionary[isin];
    }

    public static bool IsSupportedCurrency(string currencyId)
    {
        return s_currencyDictionary.ContainsKey(currencyId);
    }

    public static string GetTickerFromCurrencyId(string currencyId)
    {
        if (!IsSupportedCurrency(currencyId))
            throw new ArgumentException($"Not supported currency '{currencyId}'");

        return s_currencyDictionary[currencyId];
    }

    public static bool IsSupportedCrypto(string cryptoId)
    {
        return s_cryptoDictionary.ContainsKey(cryptoId);
    }

    public static string GetTickerFromCryptoId(string cryptoId)
    {
        if (!IsSupportedCrypto(cryptoId))
            throw new ArgumentException($"Not supported crypto '{cryptoId}'");

        return s_cryptoDictionary[cryptoId];
    }
}
