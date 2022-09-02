using System.Text.Json;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Services.Alphavantage.Models;

namespace PortfolioTracker.WebApi.Services.Alphavantage;

public class EtfValueHistoryService
{
    private readonly string apiKey;
    private readonly ILogger<EtfValueHistoryService> logger;

    public EtfValueHistoryService(string apiKey, ILogger<EtfValueHistoryService> logger)
    {
        this.apiKey = apiKey;
        this.logger = logger;
    }

    public async Task<IEnumerable<EtfDailyValue>> LoadHistory(string isin, bool full)
    {
        using var httpClient = new HttpClient();

        var values = new List<EtfDailyValue>();

        var symbol = AlphavantageHelpers.GetTickerFromIsin(isin);

        logger.LogInformation("Calling Alphavantage API to get ETF '{isin}' info with API KEY '{apiKey}'", isin, apiKey);

        var url = AlphavantageHelpers.GetEtfHistoryUrl(symbol, apiKey, full);
        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new BusinessException($"Error while calling api: {response.StatusCode}");

        var result = await response.Content.ReadFromJsonAsync<JsonDocument>();

        if (result == null)
        {
            throw new BusinessException($"Result for '{url}' is null!");
        }

        var isValid = result.RootElement.TryGetProperty("Time Series (Daily)", out var array);

        if (!isValid)
        {
            var jsonString = result.RootElement.ToString();
            throw new BusinessException($"Json is not valid: {jsonString[..200]}");
        }

        var dates = GetListOfDates(AlphavantageHelpers.GetMinimumDate(full), DateTime.UtcNow.Date);
        var lastValue = new EtfDailyValue
        {
            Day = DateTime.MinValue,
            Open = 0,
            High = 0,
            Low = 0,
            Close = 0,
            Volume = 0
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
                var volume = Convert.ToDecimal(dayObject.GetProperty("5. volume").GetString());

                var value = new EtfDailyValue
                {
                    Day = day,
                    Open = open,
                    High = high,
                    Low = low,
                    Close = close,
                    Volume = volume
                };

                values.Add(value);
                lastValue = value;
            }
            else if (lastValue.Day != DateTime.MinValue)
            {
                var value = new EtfDailyValue
                {
                    Day = day,
                    Open = lastValue.Open,
                    High = lastValue.High,
                    Low = lastValue.Low,
                    Close = lastValue.Close,
                    Volume = lastValue.Volume
                };

                values.Add(value);
                lastValue = value;
            }
        }

        return values
            .Where(x => x.Day >= AlphavantageHelpers.GetMinimumDate(full))
            .ToArray();
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
