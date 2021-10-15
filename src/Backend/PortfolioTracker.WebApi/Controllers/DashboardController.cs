using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : BaseController
{
    public DashboardController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(GetDataForDashboardResult), 200)]
    public async Task<IActionResult> Get()
    {
        var accounts = await DbContext.Accounts.Select(x => new DashboardAccount
        {
            Id = x.Id,
            Name = x.Name,
            Category = x.Category,
            CurrencyId = x.CurrencyId,
        }).ToListAsync();

        var historyValues = await DbContext.AccountValueHistoryEnhanced.ToListAsync();
        foreach (var account in accounts)
        {
            account.History = historyValues
                .Where(x => x.AccountId == account.Id)
                .OrderByDescending(x => x.Date)
                .Select(x => Mapper.Map<AccountValueHistory>(x))
                .ToList();

            var cumulativeTransactionsCZK = 0m;
            foreach (var item in account.History.OrderBy(x => x.Date))
            {
                cumulativeTransactionsCZK += item.TransactionCzk;
                item.CumulativeTransactionsCZK = cumulativeTransactionsCZK;
            }

            var lastValue = account.History.FirstOrDefault();
            account.TotalTransactionsCZK = lastValue?.CumulativeTransactionsCZK;
            account.TotalValueCZK = lastValue?.ValueAfterCZK;
        }

        var result = new GetDataForDashboardResult
        {
            Accounts = accounts,
            TotalTransactionsCZK = accounts.Sum(x => x.TotalTransactionsCZK),
            TotalValueCZK = accounts.Sum(x => x.TotalValueCZK)
        };

        return Ok(result);
    }
}
