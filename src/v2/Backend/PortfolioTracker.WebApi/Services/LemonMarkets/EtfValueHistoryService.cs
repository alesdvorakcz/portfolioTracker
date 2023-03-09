using System.Globalization;
using System.Text.Json;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Services.LemonMarkets.Models;

namespace PortfolioTracker.WebApi.Services.LemonMarkets;

public class EtfValueHistoryService
{
    private readonly string apiKey;
    private readonly ILogger<EtfValueHistoryService> logger;

    public EtfValueHistoryService(string apiKey, ILogger<EtfValueHistoryService> logger)
    {
        this.apiKey = apiKey;
        this.logger = logger;
    }

    public async Task<IEnumerable<EtfDailyValue>> LoadHistory(string isin, DateTime from, int days)
    {
        if (days > 150)
            throw new ArgumentException($"Too much days ({days})");

        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        var minDate = from;
        var maxDate = minDate.AddDays(days);

        var values = new List<EtfDailyValue>();

        logger.LogInformation("Calling LemonMarkets API to get ETF '{isin}' info", isin);

        var url = LemonMarketsHelpers.GetEtfHistoryUrl(isin, minDate, days, 1);
        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new BusinessException($"Error while calling api: {response.StatusCode}");

        var result = await response.Content.ReadFromJsonAsync<JsonDocument>();

        if (result == null)
        {
            throw new BusinessException($"Result for '{url}' is null!");
        }

        var hasStatus = result.RootElement.TryGetProperty("status", out var resultStatus);
        var hasResults = result.RootElement.TryGetProperty("results", out var results);

        if (!hasStatus || !hasResults || resultStatus.GetString() != "ok")
        {
            var jsonString = result.RootElement.ToString();
            throw new BusinessException($"Json is not valid: {jsonString[..200]}");
        }

        var resultItems = new List<EtfDailyValue>();
        foreach (var item in results.EnumerateArray())
        {
            var dateString = item.GetProperty("t").GetString()?[..10];
            if (dateString == null)
                throw new BusinessException($"there is an item with invalid property 't' ({item.GetProperty("t")})");

            var date = DateTime.ParseExact(dateString, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var open = item.GetProperty("o").GetDecimal();
            var high = item.GetProperty("h").GetDecimal();
            var low = item.GetProperty("l").GetDecimal();
            var close = item.GetProperty("c").GetDecimal();
            var volume = item.GetProperty("v").GetDecimal();

            resultItems.Add(new EtfDailyValue
            {
                Day = date,
                Open = open,
                High = high,
                Low = low,
                Close = close,
                Volume = volume
            });
        }

        var startDate = resultItems.Min(x => x.Day);
        var endDate = resultItems.Max(x => x.Day);

        var dates = GetListOfDates(startDate, endDate);
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
            var dayId = day.ToString("yyyyMMdd");
            var resultItem = resultItems.FirstOrDefault(x => x.Day.ToString("yyyyMMdd") == dayId);

            if (resultItem != null)
            {
                values.Add(resultItem);
                lastValue = resultItem;
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

        return values.ToArray();
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
