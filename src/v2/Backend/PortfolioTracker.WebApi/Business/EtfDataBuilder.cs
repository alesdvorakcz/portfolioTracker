using PortfolioTracker.WebApi.Business.Models;

namespace PortfolioTracker.WebApi.Business;

public static class EtfDataBuilder
{
    public static EtfData GetData(IEnumerable<Database.Dtos.Etf> etfs,
        IEnumerable<Database.Dtos.EtfValueHistory> etfValueHistory,
        IEnumerable<Excel.Models.EtfTrade> etftrades,
        IEnumerable<Currency> currencies)
    {
        var etfWithTrades = new List<EtfDetailWithTrades>();
        foreach (var etf in etfs)
        {
            var history = etfValueHistory.Where(x => x.EtfId == etf.Id);
            var trades = etftrades.Where(x => x.Ticker == etf.Ticker).OrderBy(x => x.Date);
            var currency = currencies.First(x => x.Id == etf.CurrencyId);

            etfWithTrades.Add(PrepareEtfData(etf, history, trades, currency));
        }

        var result = new EtfData();
        result.Etfs = etfWithTrades;
        // result.TotalValueCZK = result.Etfs.Sum(x => x.ValueCZK ?? 0);
        // result.TotalTransactionsCZK = result.Etfs.Sum(x => x.CumulativeTransactionsCZK);

        return result;
    }

    private static EtfDetailWithTrades PrepareEtfData(Database.Dtos.Etf etf,
        IEnumerable<Database.Dtos.EtfValueHistory> etfValueHistory,
        IEnumerable<Excel.Models.EtfTrade> etfTrades,
        Currency currency)
    {
        var etfWithTrades = new EtfDetailWithTrades
        {
            Id = etf.Id,
            Name = etf.Name,
            Ticker = etf.Ticker,
            ISIN = etf.ISIN,
            CurrencyId = etf.CurrencyId
        };

        var history = new List<EtfDetailHistoryRow>();
        var valueBefore = 0m;
        var unitsTotal = 0;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        decimal? lastConversionRate = null;

        if (etfTrades.Any())
        {
            var firstTradeDate = etfTrades.First().Date;

            foreach (var valueHistoryRow in etfValueHistory.Where(x => x.Date >= firstTradeDate))
            {
                var valueHistoryRowEnhanced = new EtfDetailHistoryRow
                {
                    Id = valueHistoryRow.Id,
                    Date = valueHistoryRow.Date,
                    CurrencyId = etf.CurrencyId,
                    UnitPrice = valueHistoryRow.Value,
                };

                var conversionRate = currency.History.FirstOrDefault(x => x.Date == valueHistoryRow.Date)?.ConversionRate;
                valueHistoryRowEnhanced.ConversionRate = conversionRate;
                if (conversionRate != null)
                    lastConversionRate = conversionRate;

                var tradeHistoryRow = etfTrades.FirstOrDefault(x => x.Date == valueHistoryRow.Date);
                if (tradeHistoryRow != null)
                {
                    valueHistoryRowEnhanced.ValueBefore = valueBefore;
                    valueHistoryRowEnhanced.ValueBeforeCZK = valueBefore * conversionRate;
                    valueHistoryRowEnhanced.UnitsChange = tradeHistoryRow.UnitsChange;

                    unitsTotal += tradeHistoryRow.UnitsChange;
                    valueHistoryRowEnhanced.UnitsTotal = unitsTotal;

                    valueHistoryRowEnhanced.Fee = tradeHistoryRow.Fee;
                    valueHistoryRowEnhanced.Transaction = tradeHistoryRow.UnitsChange * tradeHistoryRow.UnitPrice;
                    valueHistoryRowEnhanced.TransactionCZK = tradeHistoryRow.UnitsChange * tradeHistoryRow.UnitPrice * conversionRate ?? 0;

                    valueHistoryRowEnhanced.ValueAfter = unitsTotal * tradeHistoryRow.UnitPrice;
                    valueHistoryRowEnhanced.ValueAfterCZK = valueHistoryRowEnhanced.ValueAfter * conversionRate;

                    cumulativeTransactions += valueHistoryRowEnhanced.Transaction;
                    cumulativeTransactionsCZK += valueHistoryRowEnhanced.TransactionCZK;
                    valueHistoryRowEnhanced.CumulativeTransactions = cumulativeTransactions;
                    valueHistoryRowEnhanced.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

                    valueBefore = valueHistoryRowEnhanced.ValueAfter;
                }
                else
                {
                    valueBefore = unitsTotal * valueHistoryRow.Value;

                    valueHistoryRowEnhanced.ValueBefore = valueBefore;
                    valueHistoryRowEnhanced.ValueBeforeCZK = valueBefore * conversionRate;
                    valueHistoryRowEnhanced.UnitsChange = 0;
                    valueHistoryRowEnhanced.UnitsTotal = unitsTotal;
                    valueHistoryRowEnhanced.Fee = 0;
                    valueHistoryRowEnhanced.Transaction = 0;
                    valueHistoryRowEnhanced.TransactionCZK = 0;
                    valueHistoryRowEnhanced.ValueAfter = valueHistoryRowEnhanced.ValueBefore;
                    valueHistoryRowEnhanced.ValueAfterCZK = valueHistoryRowEnhanced.ValueBeforeCZK;
                    valueHistoryRowEnhanced.CumulativeTransactions = cumulativeTransactions;
                    valueHistoryRowEnhanced.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
                }

                history.Add(valueHistoryRowEnhanced);
            }
        }

        etfWithTrades.History = history.OrderByDescending(x => x.Date).ToList();

        // etfWithTrades.Value = valueBefore;
        // etfWithTrades.ValueCZK = valueBefore * lastConversionRate;
        // etfWithTrades.UnitsTotal = unitsTotal;
        // etfWithTrades.CumulativeTransactions = cumulativeTransactions;
        // etfWithTrades.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

        return etfWithTrades;
    }
}
