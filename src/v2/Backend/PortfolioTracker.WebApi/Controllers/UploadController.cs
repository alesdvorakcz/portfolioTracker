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
            .Select(row => new Excel.Models.CryptoWalletTrade
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

        var cryptoDtos = await DbContext.Cryptos
            .Select(x => new Database.Dtos.Crypto
            {
                Id = x.Id,
                Ticker = x.Ticker,
                Name = x.Name,
                CurrencyId = x.CurrencyId
            })
            .ToListAsync();

        var cryptosHistoryDtos = await DbContext.CryptoValueHistory
            .Select(x => new Database.Dtos.CryptoValueHistory
            {
                Id = x.Id,
                CryptoId = x.CryptoId,
                Date = x.Date,
                Value = x.Value
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        var currencies = CurrencyDataBuilder.GetData(currencyDtos, currencyHistoryDtos);
        var etfData = EtfDataBuilder.GetData(etfDtos, etfValueHistoryDtos, etfTrades, currencies);
        var accountData = AccountDataBuilder.GetData(accounts, accountTrades, currencies);

        var cryptos = CryptoDataBuilder.GetCryptoData(cryptoDtos, cryptosHistoryDtos);
        var cryptoData = CryptoDataBuilder.GetWalletData(cryptoWallets, cryptoWalletTrades, cryptos, currencies);

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
