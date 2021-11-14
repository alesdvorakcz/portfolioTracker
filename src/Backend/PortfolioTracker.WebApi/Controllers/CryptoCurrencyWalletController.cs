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
public class CryptoCurrencyWalletController : BaseController
{
    public CryptoCurrencyWalletController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<CryptoCurrencyWallet>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var wallets = await Mapper.ProjectTo<CryptoCurrencyWallet>(
                DbContext.CryptoCurrencyWallets
            ).ToListAsync();

        return Ok(wallets);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CryptoCurrencyWalletDetail), 200)]
    public async Task<IActionResult> Get(int id)
    {
        var wallet = await Mapper.ProjectTo<CryptoCurrencyWalletDetail>(
                DbContext.CryptoCurrencyWallets.Where(x => x.Id == id)
            ).FirstOrDefaultAsync();

        if (wallet == null)
            return NotFound();

        var trades = await Mapper.ProjectTo<CryptoCurrencyTrade>(
                DbContext.CryptoCurrencyTrades
                    .Where(x => x.WalletId == id)
                    .OrderByDescending(x => x.Date)
            ).ToListAsync();

        wallet.Trades = trades;

        return Ok(wallet);
    }

    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Post([FromBody] CryptoCurrencyWalletToAdd wallet)
    {
        //TODO: validaton

        var entity = new Database.Entity.CryptoCurrencyWallet
        {
            Name = wallet.Name,
            CryptoCurrencyId = wallet.CryptoCurrencyId
        };

        DbContext.CryptoCurrencyWallets.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Put(int id, [FromBody] CryptoCurrencyWalletToEdit wallet)
    {
        //TODO: validaton

        var entity = await DbContext.CryptoCurrencyWallets.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        entity.Name = wallet.Name;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await DbContext.CryptoCurrencyWallets.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound();

        DbContext.CryptoCurrencyWallets.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{cryptoCurrencyWalletId}/trade")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> AddTrade([Required] int cryptoCurrencyWalletId, [FromBody] CryptoCurrencyTradeToAdd trade)
    {
        var wallet = await DbContext.CryptoCurrencyWallets.FirstOrDefaultAsync(x => x.Id == cryptoCurrencyWalletId);

        if (wallet == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CryptoCurrencyTrades.AnyAsync(x => x.WalletId == cryptoCurrencyWalletId && x.Date == trade.Date);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(trade.Date), ValidationError.Duplicity);

        var entity = new Database.Entity.CryptoCurrencyTrade
        {
            Date = trade.Date,
            Change = trade.Change,
            ChangeEUR = trade.ChangeEUR,
            AmountAfter = trade.AmountAfter,
            WalletId = cryptoCurrencyWalletId
        };

        DbContext.CryptoCurrencyTrades.Add(entity);

        await DbContext.SaveChangesAsync();

        return Created();
    }

    [HttpPut("{cryptoCurrencyWalletId}/trade/{tradeId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> EditTrade([Required] int cryptoCurrencyWalletId, [Required] int tradeId, [FromBody] CryptoCurrencyTradeToEdit trade)
    {
        var entity = await DbContext.CryptoCurrencyTrades.FirstOrDefaultAsync(x => x.Id == tradeId && x.WalletId == cryptoCurrencyWalletId);

        if (entity == null)
            return NotFound();

        var sameDateEntityExists = await DbContext.CryptoCurrencyTrades.AnyAsync(x => x.WalletId == cryptoCurrencyWalletId && x.Date == trade.Date && x.Id != entity.Id);
        if (sameDateEntityExists)
            throw new Common.ValidationException(nameof(trade.Date), ValidationError.Duplicity);

        entity.Date = trade.Date;
        entity.Change = trade.Change;
        entity.ChangeEUR = trade.ChangeEUR;
        entity.AmountAfter = trade.AmountAfter;

        await DbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{cryptoCurrencyWalletId}/trade/{tradeId}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteTradeFromHistory([Required] int cryptoCurrencyWalletId, [Required] int tradeId)
    {
        var entity = await DbContext.CryptoCurrencyTrades.FirstOrDefaultAsync(x => x.Id == tradeId && x.WalletId == cryptoCurrencyWalletId);

        if (entity == null)
            return NotFound();

        DbContext.CryptoCurrencyTrades.Remove(entity);

        await DbContext.SaveChangesAsync();

        return NoContent();
    }
}
