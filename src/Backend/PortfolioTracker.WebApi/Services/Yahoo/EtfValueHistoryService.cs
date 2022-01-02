
using PortfolioTracker.WebApi.Services.Yahoo.Models;

namespace PortfolioTracker.WebApi.Services.Yahoo;

public class EtfValueHistoryService
{
    public async Task<IEnumerable<EtfDailyValue>> LoadHistory(string isin, DateTime from, DateTime to)
    {
        var symbol = YahooHelpers.GetTickerFromIsin(isin);

        var result = await YahooFinanceApi.Yahoo.GetHistoricalAsync(symbol, from, to);

        return result
            .Select(x => new EtfDailyValue
            {
                Day = x.DateTime,
                Open = x.Open,
                High = x.High,
                Low = x.Low,
                Close = x.Close,
                AdjustedClose = x.AdjustedClose
            })
            .ToArray();
    }
}
