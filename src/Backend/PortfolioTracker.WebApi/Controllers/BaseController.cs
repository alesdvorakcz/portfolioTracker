using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Controllers;

public class BaseController : ControllerBase
{
    protected readonly AppDbContext DbContext;
    protected readonly IMapper Mapper;

    public BaseController(AppDbContext dbContext, IMapper mapper)
    {
        DbContext = dbContext;
        Mapper = mapper;
    }

    protected StatusCodeResult Created()
    {
        return StatusCode(201);
    }

    protected ObjectResult Created(object businessObject)
    {
        return StatusCode(201, businessObject);
    }
}
