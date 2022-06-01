using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace PortfolioTracker.WebApi.Controllers;

[ApiController]
[Route("")]
public class HomeController : ControllerBase
{
    private readonly IWebHostEnvironment environment;

    public HomeController(IWebHostEnvironment environment)
    {
        this.environment = environment;
    }

    /// <summary>
    /// Production returns OK, otherwise redirects to swagger UI
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult Get()
    {
        if (!environment.IsProduction())
        {
            return Redirect("/swagger");
        }

        return Ok("OK");
    }
}
