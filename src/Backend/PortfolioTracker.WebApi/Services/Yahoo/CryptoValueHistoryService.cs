
using PortfolioTracker.WebApi.Services.Yahoo.Models;

namespace PortfolioTracker.WebApi.Services.Yahoo;

public class CryptoValueHistoryService
{
    public async Task<IEnumerable<CryptoDailyValue>> LoadHistory(string cryptoId, DateTime from, DateTime to)
    {
        var symbol = YahooHelpers.GetTickerFromCryptoId(cryptoId);

        var result = await YahooFinanceApi.Yahoo.GetHistoricalAsync(symbol, from, to);

        return result
            .Select(x => new CryptoDailyValue
            {
                Day = x.DateTime,
                Open = x.Open,
                High = x.High,
                Low = x.Low,
                Close = x.Close
            })
            .ToArray();
    }
}
