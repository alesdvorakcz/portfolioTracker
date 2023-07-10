
namespace PortfolioTracker.WebApi.Services.LemonMarkets;

public static class LemonMarketsHelpers
{
    private const string ROOT_URL = "https://data.lemon.markets/v1/ohlc/d1/";
    private static readonly DateTime s_minimumDate = new(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

    public static DateTime GetMinimumDate(bool full)
    {
        if (full)
            return s_minimumDate;

        return DateTime.UtcNow.Date.AddDays(-140);
    }

    public static string GetEtfHistoryUrl(string isin, DateTime from, int limit, int page)
    {
        return $"{ROOT_URL}?isin={isin}&from={from:yyyy-MM-dd}&limit={limit}&page={page}";
    }

    private static readonly List<string> s_isinList = new()
    {
        { "IE00B4L5Y983" },
        { "IE00B1XNHC34" },
        { "IE00B4L5YC18" },
        { "IE00BSPLC298" },
        { "IE00BSPLC413" },
        { "IE00BK5BQT80" },
        { "IE00BKM4GZ66" }
    };

    public static bool IsSupportedIsin(string isin)
    {
        return s_isinList.Contains(isin);
    }
}
