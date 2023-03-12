using AutoMapper;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Business;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

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

        var netWorthData = NetWorthDataBuilder.GetData(accountData, cryptoData);

        return new TradesData
        {
            EtfData = etfData,
            AccountData = accountData,
            CryptoData = cryptoData,
            RealEstateData = realEstateData,
            NetWorth = netWorthData
        };
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
