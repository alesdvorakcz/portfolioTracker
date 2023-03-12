using PortfolioTracker.WebApi.Business.Models;

namespace PortfolioTracker.WebApi.Business;

public static class NetWorthDataBuilder
{
    public static NetWorthData GetData(AccountData accountData, CryptoData cryptoData)
    {
        var result = new NetWorthData();
        result.TotalValueCZK = accountData.TotalValueCZK + cryptoData.TotalValueCZK;
        result.TotalTransactionsCZK = accountData.TotalTransactionsCZK + cryptoData.TotalTransactionsCZK;
        // netWorth.History = GetTotalHistory(accountData.History, cryptoData.History);
        // result.MonthlyHistory = GetMonthlyHistory(netWorth.History);

        return result;
    }

    // private static IEnumerable<NetWorthHistory> GetTotalHistory(IEnumerable<NetWorthHistory> accountsHistory, IEnumerable<NetWorthHistory> cryptoHistory)
    // {
    //     var result = new List<NetWorthHistory>();

    //     var valuesByDay = accountsHistory.Select(x => new { Id = "accounts", Value = x }).Concat(cryptoHistory.Select(x => new { Id = "crypto", Value = x })).GroupBy(x => x.Value.Date).OrderBy(x => x.Key);
    //     LastHistoryValue? accountsLastValue = null;
    //     LastHistoryValue? cryptosLastValue = null;

    //     foreach (var dayTrades in valuesByDay)
    //     {
    //         var value = 0m;
    //         var transactions = 0m;

    //         var valueForAccounts = dayTrades.FirstOrDefault(x => x.Id == "accounts");
    //         var valueForCrypto = dayTrades.FirstOrDefault(x => x.Id == "crypto");

    //         if (valueForAccounts != null)
    //         {
    //             value += valueForAccounts.Value.ValueCZK ?? 0m;
    //             transactions += valueForAccounts.Value.TransactionsCZK;

    //             if (accountsLastValue != null)
    //             {
    //                 accountsLastValue.TotalValueCZK = valueForAccounts.Value.ValueCZK ?? 0m;
    //                 accountsLastValue.TotalTransactionsCZK = valueForAccounts.Value.TransactionsCZK;
    //             }
    //             else
    //             {
    //                 accountsLastValue = new LastHistoryValue
    //                 {
    //                     TotalValueCZK = valueForAccounts.Value.ValueCZK ?? 0m,
    //                     TotalTransactionsCZK = valueForAccounts.Value.TransactionsCZK
    //                 };
    //             }
    //         }
    //         else if (accountsLastValue != null)
    //         {
    //             value += accountsLastValue.TotalValueCZK;
    //             transactions += accountsLastValue.TotalTransactionsCZK;
    //         }


    //         if (valueForCrypto != null)
    //         {
    //             value += valueForCrypto.Value.ValueCZK ?? 0m;
    //             transactions += valueForCrypto.Value.TransactionsCZK;

    //             if (cryptosLastValue != null)
    //             {
    //                 cryptosLastValue.TotalValueCZK = valueForCrypto.Value.ValueCZK ?? 0m;
    //                 cryptosLastValue.TotalTransactionsCZK = valueForCrypto.Value.TransactionsCZK;
    //             }
    //             else
    //             {
    //                 cryptosLastValue = new LastHistoryValue
    //                 {
    //                     TotalValueCZK = valueForCrypto.Value.ValueCZK ?? 0m,
    //                     TotalTransactionsCZK = valueForCrypto.Value.TransactionsCZK
    //                 };
    //             }
    //         }
    //         else if (cryptosLastValue != null)
    //         {
    //             value += cryptosLastValue.TotalValueCZK;
    //             transactions += cryptosLastValue.TotalTransactionsCZK;
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

    // private static IEnumerable<NetWorthHistory> GetMonthlyHistory(IEnumerable<NetWorthHistory> totalHistory)
    // {
    //     var result = new List<NetWorthHistory>();

    //     var firstDate = totalHistory.Min(x => x.Date);
    //     var lastDate = totalHistory.Max(x => x.Date);

    //     var firstMonth = new DateTime(firstDate.Year, firstDate.Month, 1);
    //     var lastMonth = new DateTime(lastDate.Year, lastDate.Month, 1);

    //     var months = (lastMonth.Year - firstMonth.Year) * 12 + (lastMonth.Month - firstMonth.Month);

    //     var lastValue = 0m;
    //     var lastTransactions = 0m;

    //     for (var i = 0; i <= months; i++)
    //     {
    //         var month = firstMonth.AddMonths(i);

    //         var monthHistoryItems = totalHistory.Where(x => x.Date.Year == month.Year && x.Date.Month == month.Month);

    //         if (monthHistoryItems.Any())
    //         {
    //             lastValue = monthHistoryItems.Last().ValueCZK ?? lastValue;
    //             lastTransactions = monthHistoryItems.Last().TransactionsCZK;
    //         }

    //         result.Add(new NetWorthHistory
    //         {
    //             Date = month,
    //             ValueCZK = lastValue,
    //             TransactionsCZK = lastTransactions
    //         });
    //     }

    //     return result;
    // }
}
