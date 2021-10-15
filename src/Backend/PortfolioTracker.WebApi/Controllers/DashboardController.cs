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

        var allAccountsHistory = new List<AllAccountsHistoryValue>();
        var lastValues = new Dictionary<int, AllAccountsHistoryValue>();
        foreach (var item in accounts.SelectMany(x => x.History).GroupBy(x => x.Date).OrderBy(x => x.Key))
        {
            var value = 0m;
            var transactions = 0m;

            foreach (var account in accounts)
            {
                var accountValue = item.FirstOrDefault(x => x.AccountId == account.Id);
                if (accountValue != null)
                {
                    value += accountValue.ValueAfterCZK ?? 0m;
                    transactions += accountValue.CumulativeTransactionsCZK;

                    if (lastValues.ContainsKey(account.Id))
                    {
                        lastValues[account.Id].Date = item.Key;
                        lastValues[account.Id].TotalValueCZK = accountValue.ValueAfterCZK ?? 0m;
                        lastValues[account.Id].TotalTransactionsCZK = accountValue.CumulativeTransactionsCZK;
                    }
                    else
                    {
                        lastValues.Add(account.Id, new AllAccountsHistoryValue
                        {
                            Date = item.Key,
                            TotalValueCZK = accountValue.ValueAfterCZK ?? 0m,
                            TotalTransactionsCZK = accountValue.CumulativeTransactionsCZK
                        });
                    }
                }
                else if (lastValues.ContainsKey(account.Id))
                {
                    value += lastValues[account.Id]?.TotalValueCZK ?? 0m;
                    transactions += lastValues[account.Id]?.TotalTransactionsCZK ?? 0m;
                }
            }

            allAccountsHistory.Add(new AllAccountsHistoryValue
            {
                Date = item.Key,
                TotalValueCZK = value,
                TotalTransactionsCZK = transactions,
            });
        }

        var result = new GetDataForDashboardResult
        {
            Accounts = accounts,
            AllAccountsHistory = allAccountsHistory,
            TotalTransactionsCZK = accounts.Sum(x => x.TotalTransactionsCZK),
            TotalValueCZK = accounts.Sum(x => x.TotalValueCZK)
        };

        return Ok(result);
    }
}
