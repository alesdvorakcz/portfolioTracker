using AutoMapper;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        var etfs = await DbContext.Etfs
            .Select(x => new Etf
            {
                Id = x.Id,
                Ticker = x.Ticker,
                Name = x.Name,
                ISIN = x.ISIN,
                CurrencyId = x.CurrencyId
            })
            .ToListAsync();

        var etfValueHistory = await DbContext.EtfValueHistory
            .OrderBy(x => x.Date)
            .ToListAsync();

        var currencies = await DbContext.Currencies
            .Select(x => new Currency
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();

        var currenciesHistory = await DbContext.CurrencyValueHistory
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

        var etfData = new EtfData
        {
            Etfs = etfs.Select(etf =>
            {
                var valueHistory = etfValueHistory.Where(x => x.EtfId == etf.Id);

                var currency = currencies.First(x => x.Id == etf.CurrencyId);
                var currencyValueHistory = currenciesHistory.Where(x => x.CurrencyId == currency.Id);

                var trades = etfTrades.Where(x => x.Ticker == etf.Ticker).OrderBy(x => x.Date);

                return PrepareEtfData(etf, valueHistory, trades, currencyValueHistory);
            }).ToList()
        };
        etfData.TotalValueCZK = etfData.Etfs.Sum(x => x.ValueCZK ?? 0);
        etfData.TotalTransactionsCZK = etfData.Etfs.Sum(x => x.CumulativeTransactionsCZK);

        var accountData = new AccountData
        {
            Accounts = accounts.Select(account =>
            {
                var tradeHistory = accountTrades.Where(x => x.AccountId == account.Id);
                var currency = currencies.First(x => x.Id == account.CurrencyId);
                var currencyValueHistory = currenciesHistory.Where(x => x.CurrencyId == currency.Id);

                return PrepareAccount(account, tradeHistory, currencyValueHistory);
            }).ToList()
        };
        accountData.TotalValueCZK = accountData.Accounts.Sum(x => x.ValueCZK);
        accountData.TotalTransactionsCZK = accountData.Accounts.Sum(x => x.CumulativeTransactionsCZK);

        var cryptoData = new CryptoData
        {
            CryptoWallets = cryptoWallets.Select(wallet =>
            {
                var tradesHistory = cryptoWalletTrades.Where(x => x.WalletId == wallet.Id);
                var crypto = cryptos.First(x => x.Ticker == wallet.CryptoTicker);

                var valueHistory = cryptosHistory.Where(x => x.CryptoId == crypto.Id);

                var currency = currencies.First(x => x.Id == crypto.CurrencyId);
                var currencyValueHistory = currenciesHistory.Where(x => x.CurrencyId == currency.Id);


                return PrepareCryptoWallet(wallet, tradesHistory, valueHistory, crypto, currencyValueHistory);
            }).ToList()
        };
        cryptoData.TotalValueCZK = cryptoData.CryptoWallets.Sum(x => x.ValueCZK ?? 0);
        cryptoData.TotalTransactionsCZK = cryptoData.CryptoWallets.Sum(x => x.CumulativeTransactionsCZK ?? 0);

        var netWorth = new NetWorth()
        {
            TotalValueCZK = etfData.TotalValueCZK + cryptoData.TotalValueCZK,
            TotalTransactionsCZK = etfData.TotalTransactionsCZK + cryptoData.TotalTransactionsCZK,
        };

        return new TradesData
        {
            EtfData = etfData,
            AccountData = accountData,
            CryptoData = cryptoData,
            NetWorth = netWorth
        };
    }

    private static EtfDetailWithTrades PrepareEtfData(Etf etf,
        IEnumerable<Database.Entity.EtfValueHistory> etfValueHistory, IEnumerable<EtfTrade> etfTrades,
        IEnumerable<Database.Entity.CurrencyValueHistory> currencyValueHistory)
    {
        var etfWithTrades = new EtfDetailWithTrades
        {
            Id = etf.Id,
            Name = etf.Name,
            Ticker = etf.Ticker,
            ISIN = etf.ISIN,
            CurrencyId = etf.CurrencyId
        };

        var history = new List<EtfValueHistoryEnhanced>();
        var valueBefore = 0m;
        var unitsTotal = 0;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        decimal? lastConversionRate = null;

        var firstTradeDate = etfTrades.First().Date;

        foreach (var valueHistoryRow in etfValueHistory.Where(x => x.Date >= firstTradeDate))
        {
            var valueHistoryRowEnhanced = new EtfValueHistoryEnhanced
            {
                Id = valueHistoryRow.Id,
                Date = valueHistoryRow.Date,
                CurrencyId = etf.CurrencyId,
                UnitPrice = valueHistoryRow.Value,
            };

            var conversionRate = currencyValueHistory.FirstOrDefault(x => x.Date == valueHistoryRow.Date)?.ConversionRate;
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

        etfWithTrades.History = history.OrderByDescending(x => x.Date).ToList();

        etfWithTrades.Value = valueBefore;
        etfWithTrades.ValueCZK = valueBefore * lastConversionRate;
        etfWithTrades.UnitsTotal = unitsTotal;
        etfWithTrades.CumulativeTransactions = cumulativeTransactions;
        etfWithTrades.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

        return etfWithTrades;
    }

    private static Contracts.Result.CryptoWallet PrepareCryptoWallet(Excel.Models.CryptoWallet wallet, IEnumerable<Excel.Models.CryptoTrade> walletValueHistory,
        IEnumerable<Database.Entity.CryptoValueHistory> cryptoValueHistory, Crypto crypto, IEnumerable<Database.Entity.CurrencyValueHistory> currencyValueHistory)
    {
        var cryptoWallet = new Contracts.Result.CryptoWallet
        {
            Id = wallet.Id,
            Name = wallet.Name,
            Crypto = crypto
        };

        var firstWalletValue = walletValueHistory.First().Date;

        var history = new List<CryptoWalletTrade>();

        var valueBefore = 0m;
        var unitsTotal = 0m;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        var stakedTotal = 0m;
        decimal? lastConversionRate = null;

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
                unitsTotal = walletTrade.UnitsTotal;
                stakedTotal += walletTrade.StakedUnits;

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

                walletTrade.CumulativeTransactions = cumulativeTransactions;
                walletTrade.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
            }

            history.Add(walletTrade);
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

    private static Contracts.Result.Account PrepareAccount(Excel.Models.Account acc, IEnumerable<Excel.Models.AccountTrade> accountValueHistory,
        IEnumerable<Database.Entity.CurrencyValueHistory> currencyValueHistory)
    {
        var account = new Contracts.Result.Account
        {
            Id = acc.Id,
            Name = acc.Name,
            CurrencyId = acc.CurrencyId,
        };

        var history = new List<Contracts.Result.AccountTrade>();

        var valueAfter = 0m;
        var cumulativeTransactions = 0m;
        var cumulativeTransactionsCZK = 0m;
        decimal? lastConversionRate = null;

        foreach (var valueHistoryRow in accountValueHistory)
        {
            var accountTrade = new Contracts.Result.AccountTrade
            {
                Date = valueHistoryRow.Date,
                CurrencyId = acc.CurrencyId,
            };

            var conversionRate = currencyValueHistory.FirstOrDefault(x => x.Date == valueHistoryRow.Date)?.ConversionRate;
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

        account.History = history.OrderByDescending(x => x.Date).ToList();

        account.Value = valueAfter;
        account.ValueCZK = valueAfter * lastConversionRate ?? 0;
        account.CumulativeTransactions = cumulativeTransactions;
        account.CumulativeTransactionsCZK = cumulativeTransactionsCZK;

        return account;
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
