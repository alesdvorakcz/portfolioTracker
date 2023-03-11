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

        var history = new List<AccountTrade>();

        var valueAfter = 0m;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        decimal? lastConversionRate = null;

        foreach (var valueHistoryRow in accountTrades)
        {
            var accountTrade = new AccountTrade
            {
                Date = valueHistoryRow.Date,
                CurrencyId = account.CurrencyId,
            };

            var conversionRate = currency.History.FirstOrDefault(x => x.Date == valueHistoryRow.Date)?.ConversionRate;
            accountTrade.ConversionRate = conversionRate;
            if (conversionRate != null)
                lastConversionRate = conversionRate;

            accountTrade.TransactionCZK = valueHistoryRow.TransactionCZK;
            accountTrade.Transaction = valueHistoryRow.TransactionCZK / conversionRate ?? 0;
            accountTrade.ValueBefore = valueHistoryRow.BalanceBefore;
            accountTrade.ValueBeforeCZK = valueHistoryRow.BalanceBefore * conversionRate;

            accountTrade.ValueAfter = accountTrade.ValueBefore + accountTrade.Transaction;
            accountTrade.ValueAfterCZK = accountTrade.ValueBeforeCZK + accountTrade.TransactionCZK;

            valueAfter = accountTrade.ValueAfter;
            cumulativeTransactions += accountTrade.Transaction;
            cumulativeTransactionsCZK += accountTrade.TransactionCZK;

            accountTrade.CumulativeTransactions = cumulativeTransactions;
            accountTrade.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

            history.Add(accountTrade);
        }

        accountWithTrades.History = history.OrderByDescending(x => x.Date).ToList();

        // accountWithTrades.Value = valueAfter;
        // accountWithTrades.ValueCZK = valueAfter * lastConversionRate ?? 0;
        // accountWithTrades.CumulativeTransactions = cumulativeTransactions;
        // accountWithTrades.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

        return accountWithTrades;
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
