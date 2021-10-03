using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Contracts.Input;
using PortfolioTracker.WebApi.Contracts.Result;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
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

        //TODO: fill up history

        return Ok(account);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Account), 201)]
    public async Task<IActionResult> Post([FromBody] AccountToAdd account)
    {
        //TODO: validaton

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
        //TODO: validaton

        var entity = await DbContext.Accounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

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
}
