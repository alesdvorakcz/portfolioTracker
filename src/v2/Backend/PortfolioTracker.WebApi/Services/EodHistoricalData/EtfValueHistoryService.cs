using System.Globalization;
using System.Text.Json;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Services.EodHistoricalData.Models;

namespace PortfolioTracker.WebApi.Services.EodHistoricalData;

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

        var minDate = from;
        var maxDate = minDate.AddDays(days);

        var values = new List<EtfDailyValue>();

        var symbol = EodHistoricalDataHelpers.GetTickerFromIsin(isin);

        logger.LogInformation("Calling EodHistoricalData API to get ETF '{isin}' info", isin);

        var url = EodHistoricalDataHelpers.GetEtfHistoryUrl(symbol, apiKey, minDate, maxDate);


        logger.LogInformation("Calling EodHistoricalData API to get ETF '{isin}': {url}", isin, url);
        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new BusinessException($"Error while calling api: {response.StatusCode}");

        var result = await response.Content.ReadFromJsonAsync<JsonDocument>();

        if (result == null)
        {
            throw new BusinessException($"Result for '{url}' is null!");
        }

        // todo

        var isValid = result.RootElement.ValueKind == JsonValueKind.Array && result.RootElement.GetArrayLength() > 0;
        if (!isValid)
        {
            var jsonString = result.RootElement.ToString();
            throw new BusinessException($"Json is not valid: {jsonString[..200]}");
        }

        var resultItems = new List<EtfDailyValue>();
        foreach (var item in result.RootElement.EnumerateArray())
        {
            var dateString = item.GetProperty("date").ToString();

            var date = DateTime.ParseExact(dateString, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var open = item.GetProperty("open").GetDecimal();
            var high = item.GetProperty("high").GetDecimal();
            var low = item.GetProperty("low").GetDecimal();
            var close = item.GetProperty("close").GetDecimal();
            var adjustedClose = item.GetProperty("adjusted_close").GetDecimal();
            var volume = item.GetProperty("volume").GetDecimal();

            resultItems.Add(new EtfDailyValue
            {
                Date = date,
                Open = open,
                High = high,
                Low = low,
                Close = close,
                AdjustedClose = adjustedClose,
                Volume = volume
            });
        }

        var startDate = resultItems.Min(x => x.Date);
        var endDate = resultItems.Max(x => x.Date);

        var dates = GetListOfDates(startDate, endDate);
        var lastValue = new EtfDailyValue
        {
            Date = DateTime.MinValue,
            Open = 0,
            High = 0,
            Low = 0,
            Close = 0,
            AdjustedClose = 0,
            Volume = 0
        };

        foreach (var date in dates)
        {
            var dateId = date.ToString("yyyyMMdd");
            var resultItem = resultItems.FirstOrDefault(x => x.Date.ToString("yyyyMMdd") == dateId);

            if (resultItem != null)
            {
                values.Add(resultItem);
                lastValue = resultItem;
            }
            else if (lastValue.Date != DateTime.MinValue)
            {
                var value = new EtfDailyValue
                {
                    Date = date,
                    Open = lastValue.Open,
                    High = lastValue.High,
                    Low = lastValue.Low,
                    Close = lastValue.Close,
                    AdjustedClose = lastValue.AdjustedClose,
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
