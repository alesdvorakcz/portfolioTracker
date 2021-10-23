using System.Text.Json;

namespace PortfolioTracker.WebApi.Services;

public class LoadEtfValueHistoryService
{
    private const string Url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={0}&outputsize=full&apikey={1}";
    private readonly DateTime minimumDate = new(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
    private readonly string apiKey;

    public LoadEtfValueHistoryService(string apiKey)
    {
        this.apiKey = apiKey;
    }

    public async Task<IEnumerable<EtfDailyValue>> LoadHistory(string isin)
    {
        using var httpClient = new HttpClient();

        var values = new List<EtfDailyValue>();

        var response = await httpClient.GetFromJsonAsync<JsonDocument>(string.Format(Url, GetTickerFromIsin(isin), apiKey));

        var array = response!.RootElement.GetProperty("Time Series (Daily)");
        foreach (var item in array.EnumerateObject())
        {
            var daySplit = item.Name.Split("-");
            var day = new DateTime(Convert.ToInt32(daySplit[0]), Convert.ToInt32(daySplit[1]), Convert.ToInt32(daySplit[2]), 0, 0, 0, 0, DateTimeKind.Utc);

            var open = Convert.ToDecimal(item.Value.GetProperty("1. open").GetString());
            var high = Convert.ToDecimal(item.Value.GetProperty("2. high").GetString());
            var low = Convert.ToDecimal(item.Value.GetProperty("3. low").GetString());
            var close = Convert.ToDecimal(item.Value.GetProperty("4. close").GetString());
            var adjustedClose = Convert.ToDecimal(item.Value.GetProperty("5. adjusted close").GetString());
            var volume = Convert.ToDecimal(item.Value.GetProperty("6. volume").GetString());
            var dividendAmount = Convert.ToDecimal(item.Value.GetProperty("7. dividend amount").GetString());
            var splitCoefficient = Convert.ToDecimal(item.Value.GetProperty("8. split coefficient").GetString());

            values.Add(new EtfDailyValue
            {
                Day = day,
                Open = open,
                High = high,
                Low = low,
                Close = close,
                AdjustedClose = adjustedClose,
                Volume = volume,
                DividendAmount = dividendAmount,
                SplitCoefficient = splitCoefficient
            });
        };

        return values
            .Where(x => x.Day >= minimumDate)
            .ToArray();
    }

    private static string GetTickerFromIsin(string isin)
    {
        if (isin == "IE00B4L5Y983")
            return "IWDA.AMS";

        if (isin == "IE00B1XNHC34")
            return "IQQH.DEX";

        if (isin == "IE00B4L5YC18")
            return "IEMA.AMS";

        if (isin == "IE00BSPLC298")
            return "ZPRX.DEX";

        if (isin == "IE00BSPLC413")
            return "ZPRV.DEX";

        if (isin == "IE00BK5BQT80")
            return "VWCE.DEX";

        throw new ArgumentException($"Not supported isin '{isin}'");
    }
}
