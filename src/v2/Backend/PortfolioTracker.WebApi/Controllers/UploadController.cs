using AutoMapper;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using PortfolioTracker.WebApi.Common;
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
    [ProducesResponseType(200)]
    public async Task<IActionResult> Trades(IFormFile file)
    {
        using var excel = new XLWorkbook(file.OpenReadStream());

        var etfWs = excel.Worksheet("Etfs");
        var etfTrades = etfWs.Table("EtfTrades").DataRange.Rows().Select(row => new EtfTrade
        {
            Date = row.Field("Date").GetDateTime(),
            Ticker = row.Field("Ticker").GetString(),
            UnitsChange = row.Field("Units Change").GetValue<int>(),
            UnitPrice = row.Field("Unit Price").GetValue<decimal>(),
            Fee = row.Field("Fee").GetValue<decimal>()
        }).ToList();

        //TODO: load excel, return json with data to client app

        return Ok(new { Trades = etfTrades });
    }

    [HttpPost("export")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Export(IFormFile file)
    {
        var excel = new XLWorkbook(file.OpenReadStream());
        return new ExcelResult(excel, "out.xlsx");
    }
}
