namespace PortfolioTracker.WebApi.Services.CoinGecko;

public static class CoinGeckoHelpers
{
    private static readonly DateTime s_minimumDate = new(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
    private static readonly int s_standardIntervalDays = 140;

    public static DateTime GetMinimumDate(bool full)
    {
        if (full)
            return s_minimumDate;

        return DateTime.UtcNow.Date.AddDays(-1 * s_standardIntervalDays);
    }

    public static int GetStandardIntervalInDays()
    {
        return s_standardIntervalDays;
    }
}
