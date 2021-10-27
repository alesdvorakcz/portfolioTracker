
using System.Text.Json;
using PortfolioTracker.WebApi.Services.Alphavantage.Models;

namespace PortfolioTracker.WebApi.Services.Alphavantage;

public class CryptoValueHistoryService
{
    private readonly string apiKey;

    public CryptoValueHistoryService(string apiKey)
    {
        this.apiKey = apiKey;
    }

    public async Task<IEnumerable<CryptoDailyValue>> LoadHistory(string cryptoId, bool full)
    {
        using var httpClient = new HttpClient();

        var values = new List<CryptoDailyValue>();

        var response = await httpClient.GetFromJsonAsync<JsonDocument>(AlphavantageHelpers.GetCryptoHistoryUrl(cryptoId, apiKey, full));

        var array = response!.RootElement.GetProperty("Time Series (Digital Currency Daily)");
        foreach (var item in array.EnumerateObject())
        {
            var daySplit = item.Name.Split("-");
            var day = new DateTime(Convert.ToInt32(daySplit[0]), Convert.ToInt32(daySplit[1]), Convert.ToInt32(daySplit[2]), 0, 0, 0, 0, DateTimeKind.Utc);

            var open = Convert.ToDecimal(item.Value.GetProperty("1. open").GetString());
            var high = Convert.ToDecimal(item.Value.GetProperty("2. high").GetString());
            var low = Convert.ToDecimal(item.Value.GetProperty("3. low").GetString());
            var close = Convert.ToDecimal(item.Value.GetProperty("4. close").GetString());

            values.Add(new CryptoDailyValue
            {
                Day = day,
                Open = open,
                High = high,
                Low = low,
                Close = close,
            });
        };

        return values
            .Where(x => x.Day >= AlphavantageHelpers.GetMinimumDate(full))
            .ToArray();
    }
}
