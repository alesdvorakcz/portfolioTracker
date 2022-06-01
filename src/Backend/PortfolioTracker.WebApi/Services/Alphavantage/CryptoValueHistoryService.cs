
using System.Net.Http;
using System.Net.Http.Json;
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
        // TODO
        //if (cryptoId == "NexoEur")
        // return GetFakeEURHistory(full);

        using var httpClient = new HttpClient();

        var values = new List<CryptoDailyValue>();

        var response = await httpClient.GetFromJsonAsync<JsonDocument>(AlphavantageHelpers.GetCryptoHistoryUrl(cryptoId, apiKey, full));

        var array = response!.RootElement.GetProperty("Time Series (Digital Currency Daily)");
        foreach (var item in array.EnumerateObject())
        {
            var daySplit = item.Name.Split("-");
            var day = new DateTime(Convert.ToInt32(daySplit[0]), Convert.ToInt32(daySplit[1]), Convert.ToInt32(daySplit[2]), 0, 0, 0, 0, DateTimeKind.Utc);

            var openEUR = Convert.ToDecimal(item.Value.GetProperty("1a. open (EUR)").GetString());
            var openUSD = Convert.ToDecimal(item.Value.GetProperty("1b. open (USD)").GetString());
            var highEUR = Convert.ToDecimal(item.Value.GetProperty("2a. high (EUR)").GetString());
            var highUSD = Convert.ToDecimal(item.Value.GetProperty("2b. high (USD)").GetString());
            var lowEUR = Convert.ToDecimal(item.Value.GetProperty("3a. low (EUR)").GetString());
            var lowUSD = Convert.ToDecimal(item.Value.GetProperty("3b. low (USD)").GetString());
            var closeEUR = Convert.ToDecimal(item.Value.GetProperty("4a. close (EUR)").GetString());
            var closeUSD = Convert.ToDecimal(item.Value.GetProperty("4b. close (USD)").GetString());

            values.Add(new CryptoDailyValue
            {
                Day = day,
                OpenEUR = openEUR,
                OpenUSD = openUSD,
                HighEUR = highEUR,
                HighUSD = highUSD,
                LowEUR = lowEUR,
                LowUSD = lowUSD,
                CloseEUR = closeEUR,
                CloseUSD = closeUSD
            });
        };

        return values
            .Where(x => x.Day >= AlphavantageHelpers.GetMinimumDate(full))
            .ToArray();
    }
}
