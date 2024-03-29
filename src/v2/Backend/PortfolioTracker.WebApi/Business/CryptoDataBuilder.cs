using PortfolioTracker.WebApi.Business.Models;

namespace PortfolioTracker.WebApi.Business;

public static class CryptoDataBuilder
{
    public static IEnumerable<Crypto> GetCryptoData(IEnumerable<Database.Dtos.Crypto> cryptos, IEnumerable<Database.Dtos.CryptoValueHistory> cryptoValueHistory)
    {
        var result = new List<Crypto>();

        foreach (var c in cryptos)
        {
            var crypto = new Crypto
            {
                Id = c.Id,
                Ticker = c.Ticker,
                Name = c.Name,
                CurrencyId = c.CurrencyId
            };

            crypto.History = cryptoValueHistory
                .Where(x => x.CryptoId == crypto.Id)
                .Select(x => new CryptoValueHistoryRow
                {
                    Id = x.Id,
                    Date = x.Date,
                    Value = x.Value
                });

            result.Add(crypto);
        }

        return result;
    }

    public static CryptoData GetWalletData(IEnumerable<Excel.Models.CryptoWallet> wallets, IEnumerable<Excel.Models.CryptoWalletTrade> cryptoWalletTrades, IEnumerable<Crypto> cryptos, IEnumerable<Currency> currencies)
    {
        var cryptoWallets = new List<CryptoWallet>();

        foreach (var wallet in wallets)
        {
            var trades = cryptoWalletTrades.Where(x => x.WalletId == wallet.Id);
            var crypto = cryptos.First(x => x.Ticker == wallet.CryptoTicker);
            var currency = currencies.First(x => x.Id == crypto.CurrencyId);

            cryptoWallets.Add(PrepareCryptoWallet(wallet, trades, crypto, currency));
        }

        var result = new CryptoData();
        result.CryptoWallets = cryptoWallets;
        // result.History = GetTotalCryptoHistory(cryptoData.CryptoWallets);
        // result.MonthlyHistory = GetMonthlyHistory(cryptoData.History);
        // result.TotalValueCZK = cryptoData.CryptoWallets.Sum(x => x.ValueCZK ?? 0);
        // result.TotalTransactionsCZK = cryptoData.CryptoWallets.Sum(x => x.CumulativeTransactionsCZK ?? 0);

        return result;
    }

    private static CryptoWallet PrepareCryptoWallet(Excel.Models.CryptoWallet wallet, IEnumerable<Excel.Models.CryptoWalletTrade> trades, Crypto crypto, Currency currency)
    {
        var cryptoWallet = new CryptoWallet
        {
            Id = wallet.Id,
            Name = wallet.Name,
            Crypto = crypto
        };

        var walletHistory = new List<CryptoWalletHistoryRow>();

        var valueBefore = 0m;
        var unitsTotal = 0m;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        var stakedTotal = 0m;
        decimal? lastConversionRate = null;

        if (trades.Any())
        {
            var firstTradeDate = trades.First().Date;

            foreach (var cryptoValueHistoryRow in crypto.History.Where(x => x.Date >= firstTradeDate))
            {
                var walletHistoryRow = new CryptoWalletHistoryRow
                {
                    Id = cryptoValueHistoryRow.Id,
                    Date = cryptoValueHistoryRow.Date,
                    CurrencyId = crypto.CurrencyId,
                    UnitPrice = cryptoValueHistoryRow.Value
                };

                var conversionRate = currency.History.FirstOrDefault(x => x.Date == cryptoValueHistoryRow.Date)?.ConversionRate;
                walletHistoryRow.ConversionRate = conversionRate;
                if (conversionRate != null)
                    lastConversionRate = conversionRate;

                var trade = trades.FirstOrDefault(x => x.Date == cryptoValueHistoryRow.Date);
                if (trade != null)
                {
                    walletHistoryRow.UnitsChange = trade.UnitsChange;
                    walletHistoryRow.UnitsTotal = trade.AmountAfter;
                    walletHistoryRow.StakedUnits = walletHistoryRow.UnitsTotal - unitsTotal - walletHistoryRow.UnitsChange;
                    walletHistoryRow.CumulativeStakedUnits = stakedTotal + walletHistoryRow.StakedUnits;
                    unitsTotal = walletHistoryRow.UnitsTotal;
                    stakedTotal = walletHistoryRow.CumulativeStakedUnits;

                    walletHistoryRow.Transaction = trade.TransactionEur;
                    walletHistoryRow.TransactionCZK = trade.TransactionEur * conversionRate ?? 0;
                    walletHistoryRow.ValueAfter = walletHistoryRow.UnitsTotal * cryptoValueHistoryRow.Value;
                    walletHistoryRow.ValueAfterCZK = walletHistoryRow.UnitsTotal * cryptoValueHistoryRow.Value * conversionRate;

                    valueBefore = walletHistoryRow.ValueAfter;
                    cumulativeTransactions += walletHistoryRow.Transaction;
                    cumulativeTransactionsCZK += walletHistoryRow.TransactionCZK;

                    walletHistoryRow.CumulativeTransactions = cumulativeTransactions;
                    walletHistoryRow.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
                }
                else
                {
                    walletHistoryRow.ValueAfter = unitsTotal * cryptoValueHistoryRow.Value;
                    walletHistoryRow.ValueAfterCZK = unitsTotal * cryptoValueHistoryRow.Value * conversionRate;
                    valueBefore = walletHistoryRow.ValueAfter;

                    walletHistoryRow.UnitsChange = 0;
                    walletHistoryRow.UnitsTotal = unitsTotal;
                    walletHistoryRow.Transaction = 0;
                    walletHistoryRow.TransactionCZK = 0;
                    walletHistoryRow.StakedUnits = 0;

                    walletHistoryRow.CumulativeStakedUnits = stakedTotal;
                    walletHistoryRow.CumulativeTransactions = cumulativeTransactions;
                    walletHistoryRow.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
                }

                walletHistory.Add(walletHistoryRow);
            }
        }

        cryptoWallet.History = walletHistory.OrderByDescending(x => x.Date).ToList();

        cryptoWallet.Value = valueBefore;
        cryptoWallet.ValueCZK = valueBefore * lastConversionRate;
        cryptoWallet.UnitsTotal = unitsTotal;
        cryptoWallet.CumulativeTransactions = cumulativeTransactions;
        cryptoWallet.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
        cryptoWallet.StakedUnits = stakedTotal;

        return cryptoWallet;
    }

    public static CryptoData AggregateWalletToCrypto(IEnumerable<Crypto> cryptos, CryptoData cryptoData)
    {
        var cryptoWithHistory = new List<CryptoWithHistory>();

        foreach (var crypto in cryptos)
        {
            var wallets = cryptoData.CryptoWallets.Where(x => x.Crypto.Id == crypto.Id);

            var valuesByDay = wallets
                .SelectMany(x => x.History.Select(h => new { WalletId = x.Id, Value = h }))
                .GroupBy(x => x.Value.Date).OrderBy(x => x.Key);

            var linearHistory = new List<CryptoHistoryAggregatedRow>();
            var lastValue = new Dictionary<string, LastCryptoWalletHistoryValue>();

            foreach (var dayTrades in valuesByDay)
            {
                decimal? conversionRate = null;
                var unitsPrice = 0m;

                var unitsChange = 0m;
                var unitsTotal = 0m;

                var stakedUnits = 0m;
                var cumulativeStakedUnits = 0m;

                var transaction = 0m;
                var transactionCZK = 0m;
                var cumulativeTransactions = 0m;
                var cumulativeTransactionsCZK = 0m;

                var valueAfter = 0m;
                var valueAfterCZK = 0m;

                foreach (var wallet in wallets)
                {
                    var walletValue = dayTrades.FirstOrDefault(x => x.WalletId == wallet.Id);
                    if (walletValue != null)
                    {
                        if (walletValue.Value.ConversionRate.HasValue)
                            conversionRate = walletValue.Value.ConversionRate;
                        unitsPrice = walletValue.Value.UnitPrice;

                        unitsChange += walletValue.Value.UnitsChange;
                        unitsTotal += walletValue.Value.UnitsTotal;
                        stakedUnits += walletValue.Value.StakedUnits;
                        cumulativeStakedUnits += walletValue.Value.CumulativeStakedUnits;
                        transaction += walletValue.Value.Transaction;
                        transactionCZK += walletValue.Value.TransactionCZK;
                        cumulativeTransactions += walletValue.Value.CumulativeTransactions;
                        cumulativeTransactionsCZK += walletValue.Value.CumulativeTransactionsCZK;
                        valueAfter += walletValue.Value.ValueAfter;
                        valueAfterCZK += walletValue.Value.ValueAfterCZK ?? 0;

                        if (lastValue.ContainsKey(wallet.Id))
                        {
                            lastValue[wallet.Id].UnitsTotal = walletValue.Value.UnitsTotal;
                            lastValue[wallet.Id].CumulativeStakedUnits = walletValue.Value.CumulativeStakedUnits;
                            lastValue[wallet.Id].ValueAfter = walletValue.Value.ValueAfter;
                            lastValue[wallet.Id].ValueAfterCZK = walletValue.Value.ValueAfterCZK ?? 0;
                            lastValue[wallet.Id].CumulativeTransactions = walletValue.Value.CumulativeTransactions;
                            lastValue[wallet.Id].CumulativeTransactionsCZK = walletValue.Value.CumulativeTransactionsCZK;
                        }
                        else
                        {
                            lastValue.Add(wallet.Id, new LastCryptoWalletHistoryValue
                            {
                                UnitsTotal = walletValue.Value.UnitsTotal,
                                CumulativeStakedUnits = walletValue.Value.CumulativeStakedUnits,
                                ValueAfter = walletValue.Value.ValueAfter,
                                ValueAfterCZK = walletValue.Value.ValueAfterCZK ?? 0,
                                CumulativeTransactions = walletValue.Value.CumulativeTransactions,
                                CumulativeTransactionsCZK = walletValue.Value.CumulativeTransactionsCZK,
                            });
                        }
                    }
                    else if (lastValue.ContainsKey(wallet.Id))
                    {
                        unitsTotal += lastValue[wallet.Id].UnitsTotal;
                        cumulativeStakedUnits += lastValue[wallet.Id].CumulativeStakedUnits;
                        cumulativeTransactions += lastValue[wallet.Id].CumulativeTransactions;
                        cumulativeTransactionsCZK += lastValue[wallet.Id].CumulativeTransactionsCZK;
                        valueAfter += lastValue[wallet.Id].ValueAfter;
                        valueAfterCZK += lastValue[wallet.Id].ValueAfterCZK;
                    }
                }

                linearHistory.Add(new CryptoHistoryAggregatedRow
                {
                    DateStart = dayTrades.Key,
                    DateEnd = dayTrades.Key,
                    ConversionRate = conversionRate,
                    UnitPrice = unitsPrice,
                    UnitsChange = unitsChange,
                    UnitsTotal = unitsTotal,
                    StakedUnits = stakedUnits,
                    CumulativeStakedUnits = cumulativeStakedUnits,
                    Transaction = transaction,
                    TransactionCZK = transactionCZK,
                    CumulativeTransactions = cumulativeTransactions,
                    CumulativeTransactionsCZK = cumulativeTransactionsCZK,
                    ValueAfter = valueAfter,
                    ValueAfterCZK = valueAfterCZK
                });
            }

            var lastRow = linearHistory.LastOrDefault();

            cryptoWithHistory.Add(new CryptoWithHistory
            {
                Id = crypto.Id,
                UnitsTotal = lastRow?.UnitsTotal ?? 0,
                Value = lastRow?.ValueAfter ?? 0,
                ValueCZK = lastRow?.ValueAfterCZK ?? 0,
                CumulativeStakedUnits = lastRow?.CumulativeStakedUnits ?? 0,
                CumulativeTransactions = lastRow?.CumulativeTransactions ?? 0,
                CumulativeTransactionsCZK = lastRow?.CumulativeTransactionsCZK ?? 0,
                AllWalletsHistory = linearHistory.OrderByDescending(x => x.DateStart)
            });
        }

        cryptoData.CryptoCurrenciesHistory = cryptoWithHistory;

        return cryptoData;
    }

    // private static IEnumerable<NetWorthHistory> GetTotalCryptoHistory(IEnumerable<Contracts.Result.CryptoWallet> cryptoWallet)
    // {
    //     var result = new List<NetWorthHistory>();

    //     var valuesByDay = cryptoWallet.SelectMany(x => x.History.Select(h => new { AccountId = x.Id, Value = h })).GroupBy(x => x.Value.Date).OrderBy(x => x.Key);
    //     var lastValue = new Dictionary<string, LastHistoryValue>();

    //     foreach (var dayTrades in valuesByDay)
    //     {
    //         var value = 0m;
    //         var transactions = 0m;

    //         foreach (var wallet in cryptoWallet)
    //         {
    //             var walletValue = dayTrades.FirstOrDefault(x => x.AccountId == wallet.Id);
    //             if (walletValue != null)
    //             {
    //                 value += walletValue.Value.ValueAfterCZK ?? 0m;
    //                 transactions += walletValue.Value.CumulativeTransactionsCZK;

    //                 if (lastValue.ContainsKey(wallet.Id))
    //                 {
    //                     lastValue[wallet.Id].TotalValueCZK = walletValue.Value.ValueAfterCZK ?? 0m;
    //                     lastValue[wallet.Id].TotalTransactionsCZK = walletValue.Value.CumulativeTransactionsCZK;
    //                 }
    //                 else
    //                 {
    //                     lastValue.Add(wallet.Id, new LastHistoryValue
    //                     {
    //                         TotalValueCZK = walletValue.Value.ValueAfterCZK ?? 0m,
    //                         TotalTransactionsCZK = walletValue.Value.CumulativeTransactionsCZK
    //                     });
    //                 }
    //             }
    //             else if (lastValue.ContainsKey(wallet.Id))
    //             {
    //                 value += lastValue[wallet.Id]?.TotalValueCZK ?? 0m;
    //                 transactions += lastValue[wallet.Id]?.TotalTransactionsCZK ?? 0m;
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
