using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Common;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : BaseController
{
    public AccountController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Account>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var accounts = await Mapper.ProjectTo<Account>(
                DbContext.Accounts
            ).ToListAsync();

        return Ok(accounts);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(AccountDetail), 200)]
    public async Task<IActionResult> Get(int id)
    {
        var account = await Mapper.ProjectTo<AccountDetail>(
                DbContext.Accounts.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (account == null)
            return NotFound();

        var valueHistory = await Mapper.ProjectTo<AccountValueHistory>(
                DbContext.AccountValueHistory
                    .Where(x => x.AccountId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        account.History = valueHistory;

        return Ok(account);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Account), 201)]
    public async Task<IActionResult> Post([FromBody] AccountToAdd account)
    {
        if (string.IsNullOrEmpty(account.Name))
            throw new Common.ValidationException(nameof(account.Name), ValidationError.Required);

        if (string.IsNullOrEmpty(account.Slug))
            throw new Common.ValidationException(nameof(account.Slug), ValidationError.Required);

        var slugExists = await DbContext.Accounts.AnyAsync(x => x.Slug == account.Slug);
        if (slugExists)
            throw new Common.ValidationException(nameof(account.Slug), ValidationError.Duplicity);

        //TODO: validate currency id

        var entity = new Database.Entity.Account
        {
            Slug = account.Slug,
            Name = account.Name,
            CurrencyId = account.CurrencyId
        };

        DbContext.Accounts.Add(entity);

        await DbContext.SaveChangesAsync();

        //TODO: Query/Command segregation
        var accountToReturn = await Mapper.ProjectTo<Account>(
            DbContext.Accounts.Where(x => x.Id == entity.Id)
        ).FirstOrDefaultAsync();

        return Created(accountToReturn);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Account), 200)]
    public async Task<IActionResult> Put(int id, [FromBody] AccountToEdit account)
    {
        var entity = await DbContext.Accounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        if (string.IsNullOrEmpty(account.Name))
            throw new Common.ValidationException(nameof(account.Name), ValidationError.Required);

        if (string.IsNullOrEmpty(account.Slug))
            throw new Common.ValidationException(nameof(account.Slug), ValidationError.Required);

        var slugExists = await DbContext.Accounts.AnyAsync(x => x.Slug == account.Slug && x.Id != id);
        if (slugExists)
            throw new Common.ValidationException(nameof(account.Slug), ValidationError.Duplicity);

        //TODO: validate currency id

        entity.Slug = account.Slug;
        entity.Name = account.Name;
        entity.CurrencyId = account.CurrencyId;

        await DbContext.SaveChangesAsync();

        //TODO: Query/Command segregation
        var accountToReturn = Mapper.Map<Account>(entity);

        return Ok(accountToReturn);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await DbContext.Accounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        DbContext.Accounts.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{accountId}/history")]
    [ProducesResponseType(typeof(AccountValueHistory), 201)]
    public async Task<IActionResult> AddValueToHistory([Required] int accountId, [FromBody] AccountValueHistoryToAdd value)
    {
        var account = await DbContext.Accounts.FirstOrDefaultAsync(x => x.Id == accountId);

        if (account == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.AccountValueHistory.AnyAsync(x => x.AccountId == accountId && x.Date == value.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.AccountValueHistory
        {
            Date = value.Date,
            ValueBefore = value.ValueBefore,
            TransactionCzk = value.TransactionCzk,
            AccountId = account.Id
        };

        DbContext.AccountValueHistory.Add(entity);

        await DbContext.SaveChangesAsync();

        //TODO: Query/Command segregation
        var valueHistoryToReturn = await Mapper.ProjectTo<AccountValueHistory>(
            DbContext.AccountValueHistory.Where(x => x.Id == entity.Id)
        ).FirstOrDefaultAsync();

        return Created(valueHistoryToReturn);
    }

    [HttpPut("{accountId}/history/{valueHistoryId}")]
    [ProducesResponseType(typeof(AccountValueHistory), 200)]
    public async Task<IActionResult> EditValueFromHistory([Required] int accountId, [Required] int valueHistoryId, [FromBody] AccountValueHistoryToEdit value)
    {
        var entity = await DbContext.AccountValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.AccountId == accountId);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.AccountValueHistory.AnyAsync(x => x.AccountId == accountId && x.Date == value.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(value.Date), ValidationError.Duplicity);

        entity.Date = value.Date;
        entity.ValueBefore = value.ValueBefore;
        entity.TransactionCzk = value.TransactionCzk;

        await DbContext.SaveChangesAsync();

        //TODO: Query/Command segregation
        var valueHistoryToReturn = Mapper.Map<AccountValueHistory>(entity);

        return Ok(valueHistoryToReturn);
    }

    [HttpDelete("{accountId}/history/{valueHistoryId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteValueFromHistory([Required] int accountId, [Required] int valueHistoryId)
    {
        var entity = await DbContext.AccountValueHistory.FirstOrDefaultAsync(x => x.Id == valueHistoryId && x.AccountId == accountId);

        if (entity == null)
            return NotFound();

        DbContext.AccountValueHistory.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
