
namespace PortfolioTracker.WebApi.Services.EodHistoricalData;

public static class EodHistoricalDataHelpers
{
    private const string ROOT_URL = "https://eodhistoricaldata.com/api/eod";
    private static readonly DateTime s_minimumDate = new(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

    public static DateTime GetMinimumDate(bool full)
    {
        if (full)
            return s_minimumDate;

        return DateTime.UtcNow.Date.AddDays(-140);
    }

    public static string GetEtfHistoryUrl(string symbol, string apiKey, DateTime from, DateTime to)
    {
        return $"{ROOT_URL}/{symbol}?fmt=json&from={from:yyyy-MM-dd}&to={to:yyyy-MM-dd}&api_token={apiKey}";
    }

    private static readonly Dictionary<string, string> s_isinDictionary = new()
    {
        { "IE00B4L5Y983", "IWDA.AS" },
        { "IE00B1XNHC34", "IQQH.XETRA" },
        { "IE00B4L5YC18", "IEMA.AS" },
        { "IE00BSPLC298", "ZPRX.XETRA" },
        { "IE00BSPLC413", "ZPRV.XETRA" },
        { "IE00BK5BQT80", "VWCE.XETRA" },
        { "IE00BKM4GZ66", "EMIM.AS" },
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
}
