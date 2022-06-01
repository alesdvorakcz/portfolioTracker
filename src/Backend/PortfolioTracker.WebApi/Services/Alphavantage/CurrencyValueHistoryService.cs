
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using PortfolioTracker.WebApi.Services.Alphavantage.Models;

namespace PortfolioTracker.WebApi.Services.Alphavantage;

public class CurrencyValueHistoryService
{
    private readonly string apiKey;

    public CurrencyValueHistoryService(string apiKey)
    {
        this.apiKey = apiKey;
    }

    public async Task<IEnumerable<CurrencyDailyValue>> LoadHistory(string currencyId, bool full)
    {
        if (currencyId == "CZK")
            return GetFakeCZKHistory(full);

        using var httpClient = new HttpClient();

        var values = new List<CurrencyDailyValue>();

        var response = await httpClient.GetFromJsonAsync<JsonDocument>(AlphavantageHelpers.GetCurrencyHistoryUrl(currencyId, apiKey, full));

        var array = response!.RootElement.GetProperty("Time Series FX (Daily)");
        foreach (var item in array.EnumerateObject())
        {
            var daySplit = item.Name.Split("-");
            var day = new DateTime(Convert.ToInt32(daySplit[0]), Convert.ToInt32(daySplit[1]), Convert.ToInt32(daySplit[2]), 0, 0, 0, 0, DateTimeKind.Utc);

            var open = Convert.ToDecimal(item.Value.GetProperty("1. open").GetString());
            var high = Convert.ToDecimal(item.Value.GetProperty("2. high").GetString());
            var low = Convert.ToDecimal(item.Value.GetProperty("3. low").GetString());
            var close = Convert.ToDecimal(item.Value.GetProperty("4. close").GetString());

            values.Add(new CurrencyDailyValue
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

    private static CurrencyDailyValue[] GetFakeCZKHistory(bool full)
    {
        var days = GetListOfDates(AlphavantageHelpers.GetMinimumDate(full), DateTime.UtcNow.Date);
        return days.Select(day => new CurrencyDailyValue
        {
            Day = day,
            Open = 1m,
            High = 1m,
            Low = 1m,
            Close = 1m,
        }).ToArray();
    }

    private static List<DateTime> GetListOfDates(DateTime from, DateTime to)
    {
        var list = new List<DateTime>();
        var day = from;
        while (day <= to)
        {
            list.Add(day);
            day = day.AddDays(1);
        }

        return list;
    }
}
