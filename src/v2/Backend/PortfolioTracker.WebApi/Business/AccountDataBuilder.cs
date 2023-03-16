using PortfolioTracker.WebApi.Business.Models;

namespace PortfolioTracker.WebApi.Business;

public static class AccountDataBuilder
{
    public static AccountData GetData(IEnumerable<Excel.Models.Account> accounts,
        IEnumerable<Excel.Models.AccountTrade> accountTrades,
        IEnumerable<Currency> currencies)
    {
        var accountWithTrades = new List<AccountWithTrade>();
        foreach (var account in accounts)
        {
            var trades = accountTrades.Where(x => x.AccountId == account.Id);
            var currency = currencies.First(x => x.Id == account.CurrencyId);

            accountWithTrades.Add(PrepareAccountData(account, trades, currency));
        }

        var result = new AccountData();
        result.Accounts = accountWithTrades;

        // accountData.History = GetTotalAccountsHistory(accountData.Accounts);
        // accountData.MonthlyHistory = GetMonthlyHistory(accountData.History);
        // accountData.TotalValueCZK = accountData.Accounts.Sum(x => x.ValueCZK);
        // accountData.TotalTransactionsCZK = accountData.Accounts.Sum(x => x.CumulativeTransactionsCZK);

        return result;
    }

    private static AccountWithTrade PrepareAccountData(Excel.Models.Account account,
        IEnumerable<Excel.Models.AccountTrade> accountTrades, Currency currency)
    {
        var accountWithTrades = new AccountWithTrade
        {
            Id = account.Id,
            Name = account.Name,
            CurrencyId = account.CurrencyId,
        };

        var history = new List<AccountHistoryRow>();

        var valueAfter = 0m;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;

        var lastRow = new AccountHistoryRow();

        foreach (var trade in accountTrades)
        {
            var historyRow = new AccountHistoryRow
            {
                DateStart = trade.Date,
                CurrencyId = account.CurrencyId,
            };

            var conversionRate = currency.GetConversionDateFor(trade.Date);
            historyRow.ConversionRate = conversionRate;

            historyRow.TransactionCZK = trade.TransactionCZK;
            historyRow.Transaction = trade.TransactionCZK / conversionRate ?? 0;
            historyRow.ValueBefore = trade.BalanceBefore;
            historyRow.ValueBeforeCZK = trade.BalanceBefore * conversionRate;

            valueAfter = historyRow.ValueAfter;
            cumulativeTransactions += historyRow.Transaction;
            cumulativeTransactionsCZK += historyRow.TransactionCZK;

            historyRow.CumulativeTransactions = cumulativeTransactions;
            historyRow.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

            lastRow.DateEnd = historyRow.DateStart.AddDays(-1);
            lastRow.ValueAfter = historyRow.ValueBefore;
            lastRow.ValueAfterCZK = historyRow.ValueBeforeCZK;
            lastRow.Profit = lastRow.ValueAfter - lastRow.ValueBefore - lastRow.Transaction;
            lastRow.ProfitCZK = lastRow.ValueAfterCZK - lastRow.ValueBeforeCZK - lastRow.TransactionCZK;
            lastRow.ProfitPercentage = (lastRow.ValueBefore + lastRow.Transaction) > 0 ? Convert.ToDouble(lastRow.Profit / (lastRow.ValueBefore + lastRow.Transaction)) : null;
            lastRow.ProfitPercentageCZK = (lastRow.ValueBeforeCZK + lastRow.TransactionCZK) > 0 ? Convert.ToDouble(lastRow.ProfitCZK / (lastRow.ValueBeforeCZK + lastRow.TransactionCZK)) : null;
            lastRow.CumulativeProfit = lastRow.ValueAfter - lastRow.CumulativeTransactions;
            lastRow.CumulativeProfitCZK = lastRow.ValueAfterCZK - lastRow.CumulativeTransactionsCZK;

            history.Add(historyRow);
            lastRow = historyRow;
        }

        var conversionRateToday = currency.GetConversionDateFor(DateTime.Now.Date);

        lastRow.DateEnd = DateTime.Now;
        lastRow.ValueAfter = lastRow.ValueBefore + lastRow.Transaction;
        lastRow.ValueAfterCZK = (lastRow.ValueBefore + lastRow.Transaction) * conversionRateToday;
        lastRow.Profit = lastRow.ValueAfter - lastRow.ValueBefore - lastRow.Transaction;
        lastRow.ProfitCZK = lastRow.ValueAfterCZK - lastRow.ValueBeforeCZK - lastRow.TransactionCZK;
        lastRow.ProfitPercentage = (lastRow.ValueBefore + lastRow.Transaction) > 0 ? Convert.ToDouble(lastRow.Profit / (lastRow.ValueBefore + lastRow.Transaction)) : null;
        lastRow.ProfitPercentageCZK = (lastRow.ValueBeforeCZK + lastRow.TransactionCZK) > 0 ? Convert.ToDouble(lastRow.ProfitCZK / (lastRow.ValueBeforeCZK + lastRow.TransactionCZK)) : null;
        lastRow.CumulativeProfit = lastRow.ValueAfter - lastRow.CumulativeTransactions;
        lastRow.CumulativeProfitCZK = lastRow.ValueAfterCZK - lastRow.CumulativeTransactionsCZK;

        accountWithTrades.History = history.OrderByDescending(x => x.DateStart).ToList();
        accountWithTrades.MonthlyHistory = GetMonthlyHistory(history, currency);
        accountWithTrades.YearlyHistory = GetYearlyHistory(history, currency);

        var lastHistoryRow = history.LastOrDefault();

        accountWithTrades.Value = lastHistoryRow?.ValueAfter ?? 0;
        accountWithTrades.ValueCZK = lastHistoryRow?.ValueAfterCZK ?? 0;
        accountWithTrades.CumulativeTransactions = lastHistoryRow?.CumulativeTransactions ?? 0;
        accountWithTrades.CumulativeTransactionsCZK = lastHistoryRow?.CumulativeTransactionsCZK ?? 0;

        return accountWithTrades;
    }

    private static IEnumerable<AccountHistoryAggregatedRow> GetMonthlyHistory(IEnumerable<AccountHistoryRow> allHistory, Currency currency)
    {
        var monthlyHistory = new List<AccountHistoryAggregatedRow>();

        var firstDate = allHistory.Min(x => x.DateStart);
        var lastDate = allHistory.Max(x => x.DateStart);

        var firstMonth = new DateTime(firstDate.Year, firstDate.Month, 1);
        var lastMonth = new DateTime(lastDate.Year, lastDate.Month, 1);

        var months = (lastMonth.Year - firstMonth.Year) * 12 + (lastMonth.Month - firstMonth.Month);

        var lastMonthRow = new AccountHistoryAggregatedRow();

        for (var i = 0; i <= months; i++)
        {
            var monthStart = firstMonth.AddMonths(i);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);
            var monthHistoryItems = allHistory.Where(x => x.DateStart.Year == monthStart.Year && x.DateStart.Month == monthStart.Month);

            var conversionRateStart = currency.GetConversionDateFor(monthStart);
            var conversionRateEnd = currency.GetConversionDateFor(monthEnd, lastIfInFuture: true);

            var valueAfter = lastMonthRow.ValueAfter;
            var transaction = 0m;
            var transactionCZK = 0m;

            if (monthHistoryItems.Any())
            {
                valueAfter = monthHistoryItems.Last().ValueAfter;
                transaction = monthHistoryItems.Sum(x => x.Transaction);
                transactionCZK = monthHistoryItems.Sum(x => x.TransactionCZK);
            }

            var thisMonthRow = new AccountHistoryAggregatedRow
            {
                DateStart = monthStart,
                DateEnd = monthEnd,
                ValueBefore = lastMonthRow.ValueAfter,
                ValueBeforeCZK = lastMonthRow.ValueAfter * conversionRateStart,
                Transaction = transaction,
                TransactionCZK = transactionCZK,
                ValueAfter = valueAfter,
                ValueAfterCZK = valueAfter * conversionRateEnd,
                CumulativeTransactions = lastMonthRow.CumulativeTransactions + transaction,
                CumulativeTransactionsCZK = lastMonthRow.CumulativeTransactionsCZK + transactionCZK
            };

            thisMonthRow.Profit = thisMonthRow.ValueAfter - thisMonthRow.ValueBefore - thisMonthRow.Transaction;
            thisMonthRow.ProfitCZK = thisMonthRow.ValueAfterCZK - thisMonthRow.ValueBeforeCZK - thisMonthRow.TransactionCZK;
            thisMonthRow.ProfitPercentage = monthHistoryItems.Select(x => 1 + x.ProfitPercentage).Aggregate((double?)1d, (a, b) => a * b) - 1; ;
            thisMonthRow.ProfitPercentageCZK = monthHistoryItems.Select(x => 1 + x.ProfitPercentageCZK).Aggregate((double?)1d, (a, b) => a * b) - 1;
            thisMonthRow.CumulativeProfit = thisMonthRow.ValueAfter - thisMonthRow.CumulativeTransactions;
            thisMonthRow.CumulativeProfitCZK = thisMonthRow.ValueAfterCZK - thisMonthRow.CumulativeTransactionsCZK;

            monthlyHistory.Add(thisMonthRow);
            lastMonthRow = thisMonthRow;
        }

        return monthlyHistory.OrderByDescending(x => x.DateStart);
    }

    private static IEnumerable<AccountHistoryAggregatedRow> GetYearlyHistory(IEnumerable<AccountHistoryRow> allHistory, Currency currency)
    {
        var yearlyHistory = new List<AccountHistoryAggregatedRow>();

        var firstDate = allHistory.Min(x => x.DateStart);
        var lastDate = allHistory.Max(x => x.DateStart);

        var firstYear = new DateTime(firstDate.Year, 1, 1);
        var lastYear = new DateTime(lastDate.Year, 12, 1);

        var years = lastYear.Year - firstYear.Year;

        var currencyHistoryLastDay = currency.History.Max(x => x.Date);

        var lastYearRow = new AccountHistoryAggregatedRow();

        for (var i = 0; i <= years; i++)
        {
            var yearStart = firstYear.AddYears(i);
            var yearEnd = yearStart.AddYears(1).AddDays(-1);
            var yearHistoryItems = allHistory.Where(x => x.DateStart.Year == yearStart.Year);

            var conversionRateStart = currency.GetConversionDateFor(yearStart);
            var conversionRateEnd = currency.GetConversionDateFor(yearEnd, lastIfInFuture: true);

            var valueAfter = lastYearRow.ValueAfter;
            var transaction = 0m;
            var transactionCZK = 0m;

            if (yearHistoryItems.Any())
            {
                valueAfter = yearHistoryItems.Last().ValueAfter;
                transaction = yearHistoryItems.Sum(x => x.Transaction);
                transactionCZK = yearHistoryItems.Sum(x => x.TransactionCZK);
            }

            var thisYearRow = new AccountHistoryAggregatedRow
            {
                DateStart = yearStart,
                DateEnd = yearEnd,
                ValueBefore = lastYearRow.ValueAfter,
                ValueBeforeCZK = lastYearRow.ValueAfter * conversionRateStart,
                Transaction = transaction,
                TransactionCZK = transactionCZK,
                ValueAfter = valueAfter,
                ValueAfterCZK = valueAfter * conversionRateEnd,
                CumulativeTransactions = lastYearRow.CumulativeTransactions + transaction,
                CumulativeTransactionsCZK = lastYearRow.CumulativeTransactionsCZK + transactionCZK
            };
            thisYearRow.Profit = thisYearRow.ValueAfter - thisYearRow.ValueBefore - thisYearRow.Transaction;
            thisYearRow.ProfitCZK = thisYearRow.ValueAfterCZK - thisYearRow.ValueBeforeCZK - thisYearRow.TransactionCZK;
            thisYearRow.ProfitPercentage = yearHistoryItems.Select(x => 1 + x.ProfitPercentage).Aggregate((double?)1d, (a, b) => a * b) - 1; ;
            thisYearRow.ProfitPercentageCZK = yearHistoryItems.Select(x => 1 + x.ProfitPercentageCZK).Aggregate((double?)1d, (a, b) => a * b) - 1;
            thisYearRow.CumulativeProfit = thisYearRow.ValueAfter - thisYearRow.CumulativeTransactions;
            thisYearRow.CumulativeProfitCZK = thisYearRow.ValueAfterCZK - thisYearRow.CumulativeTransactionsCZK;

            yearlyHistory.Add(thisYearRow);
            lastYearRow = thisYearRow;
        }

        return yearlyHistory.OrderByDescending(x => x.DateStart);
    }


    // private static IEnumerable<NetWorthHistory> GetTotalAccountsHistory(IEnumerable<Contracts.Result.Account> accounts)
    // {
    //     var result = new List<NetWorthHistory>();

    //     var valuesByDay = accounts.SelectMany(x => x.History.Select(h => new { AccountId = x.Id, Value = h })).GroupBy(x => x.Value.Date).OrderBy(x => x.Key);
    //     var lastValue = new Dictionary<string, LastHistoryValue>();

    //     foreach (var dayTrades in valuesByDay)
    //     {
    //         var value = 0m;
    //         var transactions = 0m;

    //         foreach (var account in accounts)
    //         {
    //             var accountValue = dayTrades.FirstOrDefault(x => x.AccountId == account.Id);
    //             if (accountValue != null)
    //             {
    //                 value += accountValue.Value.ValueAfterCZK ?? 0m;
    //                 transactions += accountValue.Value.CumulativeTransactionsCZK;

    //                 if (lastValue.ContainsKey(account.Id))
    //                 {
    //                     lastValue[account.Id].TotalValueCZK = accountValue.Value.ValueAfterCZK ?? 0m;
    //                     lastValue[account.Id].TotalTransactionsCZK = accountValue.Value.CumulativeTransactionsCZK;
    //                 }
    //                 else
    //                 {
    //                     lastValue.Add(account.Id, new LastHistoryValue
    //                     {
    //                         TotalValueCZK = accountValue.Value.ValueAfterCZK ?? 0m,
    //                         TotalTransactionsCZK = accountValue.Value.CumulativeTransactionsCZK
    //                     });
    //                 }
    //             }
    //             else if (lastValue.ContainsKey(account.Id))
    //             {
    //                 value += lastValue[account.Id]?.TotalValueCZK ?? 0m;
    //                 transactions += lastValue[account.Id]?.TotalTransactionsCZK ?? 0m;
    //             }
    //         }

    //         result.Add(new NetWorthHistory
    //         {
    //             Date = dayTrades.Key,
    //             ValueCZK = value,
    //             TransactionsCZK = transactions
    //         });
    //     }

    //     return result;
    // }
}
