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

        var dates = GetListOfDates(AlphavantageHelpers.GetMinimumDate(full), DateTime.UtcNow.Date);
        var lastValue = new CurrencyDailyValue
        {
            Day = AlphavantageHelpers.GetMinimumDate(full),
            Open = 0,
            High = 0,
            Low = 0,
            Close = 0
        };

        foreach (var day in dates)
        {
            var dayId = day.ToString("yyyy-MM-dd");
            var exists = array.TryGetProperty(dayId, out var dayObject);

            if (exists)
            {
                var open = Convert.ToDecimal(dayObject.GetProperty("1. open").GetString());
                var high = Convert.ToDecimal(dayObject.GetProperty("2. high").GetString());
                var low = Convert.ToDecimal(dayObject.GetProperty("3. low").GetString());
                var close = Convert.ToDecimal(dayObject.GetProperty("4. close").GetString());

                var value = new CurrencyDailyValue
                {
                    Day = day,
                    Open = open,
                    High = high,
                    Low = low,
                    Close = close,
                };

                values.Add(value);
                lastValue = value;
            }
            else
            {
                var value = new CurrencyDailyValue
                {
                    Day = day,
                    Open = lastValue.Open,
                    High = lastValue.High,
                    Low = lastValue.Low,
                    Close = lastValue.Close,
                };

                values.Add(value);
                lastValue = value;
            }
        }

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
