using System.Text.Json;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Services.CoinGecko.Models;

namespace PortfolioTracker.WebApi.Services.CoinGecko;

public class CryptoValueHistoryService
{
    private readonly ILogger<CryptoValueHistoryService> logger;

    public CryptoValueHistoryService(ILogger<CryptoValueHistoryService> logger)
    {
        this.logger = logger;
    }

    private static string GetUnixTimestampFromDateTime(DateTime date)
    {
        return ((DateTimeOffset)date).ToUnixTimeSeconds().ToString();
    }

    private static DateTime GetDateTimeFromUnixTimestampSeconds(long seconds)
    {
        return new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)
            .AddSeconds(seconds);
    }
    private static DateTime GetDateTimeFromUnixTimestampMiliseconds(long miliseconds)
    {
        return new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)
            .AddMilliseconds(miliseconds);
    }

    private static IEnumerable<CryptoDailyValue> ProcessResult(JsonDocument apiResult)
    {
        var values = new List<CryptoDailyValue>();

        var isValid = apiResult.RootElement.TryGetProperty("prices", out var array);

        if (!isValid)
        {
            var jsonString = apiResult.RootElement.ToString();
            throw new BusinessException($"Json is not valid: {jsonString[..200]}");
        }

        foreach (var item in array.EnumerateArray())
        {
            var dateUnit = item[0].GetInt64();
            var value = item[1].GetDecimal();

            var date = GetDateTimeFromUnixTimestampMiliseconds(dateUnit);

            //Normalize date (strip hours, minutes, ...)
            date = date.Date;

            values.Add(new CryptoDailyValue
            {
                Day = date,
                Close = value
            });
        }

        return values.ToArray();
    }


    public async Task<IEnumerable<CryptoDailyValue>> LoadHistory(string ticker, string currency, DateTime from, DateTime to)
    {
        if (ticker == "nexoeur")
            return GetFakeNexoEurHistory(from, to);

        using var httpClient = new HttpClient();

        var url = string.Format("https://api.coingecko.com/api/v3/coins/{0}/market_chart/range?vs_currency={1}&from={2}&to={3}",
            ticker, currency, GetUnixTimestampFromDateTime(from), GetUnixTimestampFromDateTime(to));

        logger.LogInformation("Calling CoinGecko API to get crypto '{ticker}' info", ticker);

        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new BusinessException($"Error while calling api: {response.StatusCode}");

        var result = await response.Content.ReadFromJsonAsync<JsonDocument>();
        if (result == null)
        {
            throw new BusinessException($"Result for '{url}' is null!");
        }

        return ProcessResult(result);
    }

    public async Task<IEnumerable<CryptoDailyValue>> LoadHistory(string ticker, string currency)
    {
        var days = 140;

        if (ticker == "nexoeur")
        {
            var to = DateTime.UtcNow.Date;
            var from = to.AddDays(-1 * days);
            return GetFakeNexoEurHistory(from, to);
        }

        using var httpClient = new HttpClient();

        var url = string.Format("https://api.coingecko.com/api/v3/coins/{0}/market_chart?vs_currency={1}&days={2}",
            ticker, currency, days);

        logger.LogInformation("Calling CoinGecko API to get crypto '{ticker}' info", ticker);

        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new BusinessException($"Error while calling api: {response.StatusCode}");

        var result = await response.Content.ReadFromJsonAsync<JsonDocument>();
        if (result == null)
        {
            throw new BusinessException($"Result for '{url}' is null!");
        }

        return ProcessResult(result);
    }

    private static CryptoDailyValue[] GetFakeNexoEurHistory(DateTime from, DateTime to)
    {
        var days = GetListOfDates(from, to);
        return days.Select(day => new CryptoDailyValue
        {
            Day = day,
            Close = 1
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
