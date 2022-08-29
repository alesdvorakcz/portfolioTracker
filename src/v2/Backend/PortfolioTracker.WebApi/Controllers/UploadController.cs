using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    [ProducesResponseType(204)]
    public async Task<IActionResult> Trades()
    {
        await Task.Delay(10);

        //TODO: load excel, return json with data to client app

        return NoContent();
    }

    [HttpPost("export")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Export()
    {
        await Task.Delay(10);

        //TODO: load excel, return new excel?

        return NoContent();
    }
}
