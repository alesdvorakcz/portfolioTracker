using AutoMapper;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Business;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;
using PortfolioTracker.WebApi.Excel.Models;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/upload")]
public class UploadController : BaseController
{
    public UploadController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpPost("trades")]
    [ProducesResponseType(typeof(TradesData), 200)]
    public async Task<IActionResult> Trades(IFormFile file)
    {
        using var excel = new XLWorkbook(file.OpenReadStream());

        var result = await PrepareData(excel);

        return Ok(result);
    }

    private async Task<TradesData> PrepareData(XLWorkbook excel)
    {
        var etfWs = excel.Worksheet("Etfs");
        var etfTrades = etfWs.Table("EtfTrades").DataRange
            .Rows()
            .Select(row => new Excel.Models.EtfTrade
            {
                Date = row.Field("Date").GetDateTime(),
                Ticker = row.Field("Ticker").GetString(),
                UnitsChange = row.Field("Units Change").GetValue<int>(),
                UnitPrice = row.Field("Unit Price").GetValue<decimal>(),
                Fee = row.Field("Fee").GetValue<decimal>()
            })
            .ToList();

        var accountsWs = excel.Worksheet("Accounts");
        var accounts = accountsWs.Table("Accounts").DataRange
            .Rows()
            .Select(row => new Excel.Models.Account
            {
                Id = row.Field("Id").GetString(),
                Name = row.Field("Name").GetString(),
                CurrencyId = row.Field("Currency").GetString()
            })
            .ToList();

        var accountTrades = accountsWs.Table("AccountTrades").DataRange
            .Rows()
            .Select(row => new Excel.Models.AccountTrade
            {
                Date = row.Field("Date").GetDateTime(),
                AccountId = row.Field("Account").GetString(),
                BalanceBefore = row.Field("Balance Before").GetValue<decimal>(),
                TransactionCZK = row.Field("Transaction CZK").GetValue<decimal>()
            })
            .ToList();

        var cryptosWs = excel.Worksheet("Cryptos");
        var cryptoWallets = cryptosWs.Table("CryptoWallets").DataRange
            .Rows()
            .Select(row => new Excel.Models.CryptoWallet
            {
                Id = row.Field("Id").GetString(),
                Name = row.Field("Name").GetString(),
                CryptoTicker = row.Field("Crypto").GetString()
            })
            .ToList();

        var cryptoWalletTrades = cryptosWs.Table("CryptoTrades").DataRange
            .Rows()
            .Select(row => new Excel.Models.CryptoTrade
            {
                Date = row.Field("Date").GetDateTime(),
                WalletId = row.Field("Wallet").GetString(),
                UnitsChange = row.Field("Units Change").GetValue<decimal>(),
                TransactionEur = row.Field("Transaction EUR").GetValue<decimal>(),
                AmountAfter = row.Field("Amount After").GetValue<decimal>()
            })
            .ToList();

        var realEstatesWs = excel.Worksheet("Real Estates");
        var realEstates = realEstatesWs.Table("RealEstates").DataRange
            .Rows()
            .Select(row => new Excel.Models.RealEstate
            {
                Id = row.Field("Id").GetString(),
                Name = row.Field("Name").GetString(),
                StartingPrice = row.Field("Starting Price").GetValue<decimal>(),
                OwnStartingCapital = row.Field("Own Starting Capital").GetValue<decimal>()
            })
            .ToList();

        var realEstatesHistory = realEstatesWs.Table("RealEstatesHistory").DataRange
            .Rows()
            .Select(row => new Excel.Models.RealEstateHistory
            {
                Date = row.Field("Date").GetDateTime(),
                RealEstateId = row.Field("Real Estate").GetString(),
                Income = row.Field("Income (Rent)").GetValue<decimal>(),
                RemainingMortage = row.Field("Remaining Mortage").GetValue<decimal>(),
                EstimatedPrice = row.Field("Estimated Price").GetValue<decimal>()
            })
            .ToList();

        var etfDtos = await DbContext.Etfs
            .Select(x => new Database.Dtos.Etf
            {
                Id = x.Id,
                Ticker = x.Ticker,
                Name = x.Name,
                ISIN = x.ISIN,
                CurrencyId = x.CurrencyId
            })
            .ToListAsync();

        var etfValueHistoryDtos = await DbContext.EtfValueHistory
            .Select(x => new Database.Dtos.EtfValueHistory
            {
                Id = x.Id,
                EtfId = x.EtfId,
                Date = x.Date,
                Value = x.Value
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        var currencyDtos = await DbContext.Currencies
            .Select(x => new Database.Dtos.Currency
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();

        var currencyHistoryDtos = await DbContext.CurrencyValueHistory
            .Select(x => new Database.Dtos.CurrencyValueHistory
            {
                Id = x.Id,
                CurrencyId = x.CurrencyId,
                Date = x.Date,
                ConversionRate = x.ConversionRate
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        var cryptos = await DbContext.Cryptos
            .Select(x => new Crypto
            {
                Id = x.Id,
                Ticker = x.Ticker,
                Name = x.Name,
                CurrencyId = x.CurrencyId
            })
            .ToListAsync();

        var cryptosHistory = await DbContext.CryptoValueHistory
            .OrderBy(x => x.Date)
            .ToListAsync();

        var currencies = CurrencyDataBuilder.GetData(currencyDtos, currencyHistoryDtos);
        var etfData = EtfDataBuilder.GetData(etfDtos, etfValueHistoryDtos, etfTrades, currencies);
        var accountData = AccountDataBuilder.GetData(accounts, accountTrades, currencies);

        var cryptoData = new CryptoData
        {
            CryptoWallets = cryptoWallets.Select(wallet =>
            {
                var tradesHistory = cryptoWalletTrades.Where(x => x.WalletId == wallet.Id);
                var crypto = cryptos.First(x => x.Ticker == wallet.CryptoTicker);

                var valueHistory = cryptosHistory.Where(x => x.CryptoId == crypto.Id);

                var currency = currencies.First(x => x.Id == crypto.CurrencyId);
                var currencyValueHistory = currencyHistoryDtos.Where(x => x.CurrencyId == currency.Id);


                return PrepareCryptoWallet(wallet, tradesHistory, valueHistory, crypto, currencyHistoryDtos);
            }).ToList()
        };
        cryptoData.History = GetTotalCryptoHistory(cryptoData.CryptoWallets);
        cryptoData.MonthlyHistory = GetMonthlyHistory(cryptoData.History);
        cryptoData.TotalValueCZK = cryptoData.CryptoWallets.Sum(x => x.ValueCZK ?? 0);
        cryptoData.TotalTransactionsCZK = cryptoData.CryptoWallets.Sum(x => x.CumulativeTransactionsCZK ?? 0);

        var realEstateData = RealEstateDataBuilder.GetData(realEstates, realEstatesHistory);

        var netWorth = new NetWorth()
        {
            //TODO: rework this
            TotalValueCZK = accountData.TotalValueCZK + cryptoData.TotalValueCZK,
            TotalTransactionsCZK = accountData.TotalTransactionsCZK + cryptoData.TotalTransactionsCZK,
        };

        // netWorth.History = GetTotalHistory(accountData.History, cryptoData.History);
        netWorth.MonthlyHistory = GetMonthlyHistory(netWorth.History);

        return new TradesData
        {
            EtfData = etfData,
            AccountData = accountData,
            CryptoData = cryptoData,
            RealEstateData = realEstateData,
            NetWorth = netWorth
        };
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

    private static IEnumerable<NetWorthHistory> GetMonthlyHistory(IEnumerable<NetWorthHistory> totalHistory)
    {
        var result = new List<NetWorthHistory>();

        var firstDate = totalHistory.Min(x => x.Date);
        var lastDate = totalHistory.Max(x => x.Date);

        var firstMonth = new DateTime(firstDate.Year, firstDate.Month, 1);
        var lastMonth = new DateTime(lastDate.Year, lastDate.Month, 1);

        var months = (lastMonth.Year - firstMonth.Year) * 12 + (lastMonth.Month - firstMonth.Month);

        var lastValue = 0m;
        var lastTransactions = 0m;

        for (var i = 0; i <= months; i++)
        {
            var month = firstMonth.AddMonths(i);

            var monthHistoryItems = totalHistory.Where(x => x.Date.Year == month.Year && x.Date.Month == month.Month);

            if (monthHistoryItems.Any())
            {
                lastValue = monthHistoryItems.Last().ValueCZK ?? lastValue;
                lastTransactions = monthHistoryItems.Last().TransactionsCZK;
            }

            result.Add(new NetWorthHistory
            {
                Date = month,
                ValueCZK = lastValue,
                TransactionsCZK = lastTransactions
            });
        }

        return result;
    }

    private static IEnumerable<NetWorthHistory> GetTotalCryptoHistory(IEnumerable<Contracts.Result.CryptoWallet> cryptoWallet)
    {
        var result = new List<NetWorthHistory>();

        var valuesByDay = cryptoWallet.SelectMany(x => x.History.Select(h => new { AccountId = x.Id, Value = h })).GroupBy(x => x.Value.Date).OrderBy(x => x.Key);
        var lastValue = new Dictionary<string, LastHistoryValue>();

        foreach (var dayTrades in valuesByDay)
        {
            var value = 0m;
            var transactions = 0m;

            foreach (var wallet in cryptoWallet)
            {
                var walletValue = dayTrades.FirstOrDefault(x => x.AccountId == wallet.Id);
                if (walletValue != null)
                {
                    value += walletValue.Value.ValueAfterCZK ?? 0m;
                    transactions += walletValue.Value.CumulativeTransactionsCZK;

                    if (lastValue.ContainsKey(wallet.Id))
                    {
                        lastValue[wallet.Id].TotalValueCZK = walletValue.Value.ValueAfterCZK ?? 0m;
                        lastValue[wallet.Id].TotalTransactionsCZK = walletValue.Value.CumulativeTransactionsCZK;
                    }
                    else
                    {
                        lastValue.Add(wallet.Id, new LastHistoryValue
                        {
                            TotalValueCZK = walletValue.Value.ValueAfterCZK ?? 0m,
                            TotalTransactionsCZK = walletValue.Value.CumulativeTransactionsCZK
                        });
                    }
                }
                else if (lastValue.ContainsKey(wallet.Id))
                {
                    value += lastValue[wallet.Id]?.TotalValueCZK ?? 0m;
                    transactions += lastValue[wallet.Id]?.TotalTransactionsCZK ?? 0m;
                }
            }

            result.Add(new NetWorthHistory
            {
                Date = dayTrades.Key,
                ValueCZK = value,
                TransactionsCZK = transactions
            });
        }

        return result;
    }

    private static Contracts.Result.CryptoWallet PrepareCryptoWallet(Excel.Models.CryptoWallet wallet, IEnumerable<Excel.Models.CryptoTrade> walletValueHistory,
        IEnumerable<Database.Entity.CryptoValueHistory> cryptoValueHistory, Crypto crypto, IEnumerable<Database.Dtos.CurrencyValueHistory> currencyValueHistory)
    {
        var cryptoWallet = new Contracts.Result.CryptoWallet
        {
            Id = wallet.Id,
            Name = wallet.Name,
            Crypto = crypto
        };

        var history = new List<CryptoWalletTrade>();

        var valueBefore = 0m;
        var unitsTotal = 0m;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        var stakedTotal = 0m;
        decimal? lastConversionRate = null;

        if (walletValueHistory.Any())
        {
            var firstWalletValue = walletValueHistory.First().Date;

            foreach (var valueHistoryRow in cryptoValueHistory.Where(x => x.Date >= firstWalletValue.Date))
            {
                var walletTrade = new CryptoWalletTrade
                {
                    Id = valueHistoryRow.Id,
                    Date = valueHistoryRow.Date,
                    CurrencyId = crypto.CurrencyId,
                    UnitPrice = valueHistoryRow.Value
                };

                var conversionRate = currencyValueHistory.FirstOrDefault(x => x.Date == valueHistoryRow.Date)?.ConversionRate;
                walletTrade.ConversionRate = conversionRate;
                if (conversionRate != null)
                    lastConversionRate = conversionRate;

                var walletHistoryRow = walletValueHistory.FirstOrDefault(x => x.Date == valueHistoryRow.Date);
                if (walletHistoryRow != null)
                {
                    walletTrade.UnitsChange = walletHistoryRow.UnitsChange;
                    walletTrade.UnitsTotal = walletHistoryRow.AmountAfter;
                    walletTrade.StakedUnits = walletTrade.UnitsTotal - unitsTotal - walletTrade.UnitsChange;
                    walletTrade.CumulativeStakedUnits = stakedTotal + walletTrade.StakedUnits;
                    unitsTotal = walletTrade.UnitsTotal;
                    stakedTotal = walletTrade.CumulativeStakedUnits;

                    walletTrade.Transaction = walletHistoryRow.TransactionEur;
                    walletTrade.TransactionCZK = walletHistoryRow.TransactionEur * conversionRate ?? 0;
                    walletTrade.ValueAfter = walletTrade.UnitsTotal * valueHistoryRow.Value;
                    walletTrade.ValueAfterCZK = walletTrade.UnitsTotal * valueHistoryRow.Value * conversionRate;

                    valueBefore = walletTrade.ValueAfter;
                    cumulativeTransactions += walletTrade.Transaction;
                    cumulativeTransactionsCZK += walletTrade.TransactionCZK;

                    walletTrade.CumulativeTransactions = cumulativeTransactions;
                    walletTrade.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
                }
                else
                {
                    walletTrade.ValueAfter = unitsTotal * valueHistoryRow.Value;
                    walletTrade.ValueAfterCZK = unitsTotal * valueHistoryRow.Value * conversionRate;
                    valueBefore = walletTrade.ValueAfter;

                    walletTrade.UnitsChange = 0;
                    walletTrade.UnitsTotal = unitsTotal;
                    walletTrade.Transaction = 0;
                    walletTrade.TransactionCZK = 0;
                    walletTrade.StakedUnits = 0;

                    walletTrade.CumulativeStakedUnits = stakedTotal;
                    walletTrade.CumulativeTransactions = cumulativeTransactions;
                    walletTrade.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
                }

                history.Add(walletTrade);
            }
        }

        cryptoWallet.History = history.OrderByDescending(x => x.Date).ToList();

        cryptoWallet.Value = valueBefore;
        cryptoWallet.ValueCZK = valueBefore * lastConversionRate;
        cryptoWallet.UnitsTotal = unitsTotal;
        cryptoWallet.CumulativeTransactions = cumulativeTransactions;
        cryptoWallet.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
        cryptoWallet.StakedUnits = stakedTotal;

        return cryptoWallet;
    }

    [HttpPost("export")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Export(IFormFile file)
    {
        var excel = new XLWorkbook(file.OpenReadStream());

        var result = await PrepareData(excel);

        //TODO: use data to enhance excel

        return new ExcelResult(excel, "out.xlsx");
    }
}
