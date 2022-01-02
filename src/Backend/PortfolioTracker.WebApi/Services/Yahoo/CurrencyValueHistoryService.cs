
using PortfolioTracker.WebApi.Services.Yahoo.Models;

namespace PortfolioTracker.WebApi.Services.Yahoo;

public class CurrencyValueHistoryService
{
    public async Task<IEnumerable<CurrencyDailyValue>> LoadHistory(string currencyId, DateTime from, DateTime to)
    {
        var symbol = YahooHelpers.GetTickerFromCurrencyId(currencyId);

        var result = await YahooFinanceApi.Yahoo.GetHistoricalAsync(symbol, from, to);

        return result
            .Select(x => new CurrencyDailyValue
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
