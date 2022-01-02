
using System.Text.Json;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Services.Alphavantage.Models;

namespace PortfolioTracker.WebApi.Services.Alphavantage;

public class EtfValueHistoryService
{
    private readonly string apiKey;

    public EtfValueHistoryService(string apiKey)
    {
        this.apiKey = apiKey;
    }

    public async Task<IEnumerable<EtfDailyValue>> LoadHistory(string isin, bool full)
    {
        using var httpClient = new HttpClient();

        var values = new List<EtfDailyValue>();

        var symbol = AlphavantageHelpers.GetTickerFromIsin(isin);

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

        foreach (var item in array.EnumerateObject())
        {
            var daySplit = item.Name.Split("-");
            var day = new DateTime(Convert.ToInt32(daySplit[0]), Convert.ToInt32(daySplit[1]), Convert.ToInt32(daySplit[2]), 0, 0, 0, 0, DateTimeKind.Utc);

            var open = Convert.ToDecimal(item.Value.GetProperty("1. open").GetString());
            var high = Convert.ToDecimal(item.Value.GetProperty("2. high").GetString());
            var low = Convert.ToDecimal(item.Value.GetProperty("3. low").GetString());
            var close = Convert.ToDecimal(item.Value.GetProperty("4. close").GetString());
            // var adjustedClose = Convert.ToDecimal(item.Value.GetProperty("5. adjusted close").GetString());
            var volume = Convert.ToDecimal(item.Value.GetProperty("5. volume").GetString());
            // var dividendAmount = Convert.ToDecimal(item.Value.GetProperty("7. dividend amount").GetString());
            // var splitCoefficient = Convert.ToDecimal(item.Value.GetProperty("8. split coefficient").GetString());

            values.Add(new EtfDailyValue
            {
                Day = day,
                Open = open,
                High = high,
                Low = low,
                Close = close,
                // AdjustedClose = adjustedClose,
                Volume = volume,
                // DividendAmount = dividendAmount,
                // SplitCoefficient = splitCoefficient
            });
        };

        return values
            .Where(x => x.Day >= AlphavantageHelpers.GetMinimumDate(full))
            .ToArray();
    }
}
