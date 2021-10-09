using Newtonsoft.Json;
using PortfolioTracker.WebApi.Common;

namespace PortfolioTracker.WebApi.Middleware;

public class ApiExceptionsMiddleware
{
    private readonly RequestDelegate next;

    public ApiExceptionsMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context, ILogger<ApiExceptionsMiddleware> logger)
    {
        try
        {
            await next(context);
        }
        // catch (NotFoundException e) when (logger.LogWarningAndGoToCatch(e, "Something was not found"))
        // {
        //     context.Response.StatusCode = 404;
        // }
        // catch (DeniedException e) when (logger.LogWarningAndGoToCatch(e, "DeniedException occurred"))
        // {
        //     context.Response.StatusCode = 403; //no permission, unsuccessful login / token refresh
        // }
        // catch (NotAuthenticatedException e) when (logger.LogInformationAndGoToCatch(e, "NotAuthenticatedException occurred"))
        // {
        //     context.Response.StatusCode = 401; //missing/bad/expired access token
        // }
        catch (ValidationException e) when (logger.LogWarningAndGoToCatch(e, "Validation failed"))
        {
            context.Response.StatusCode = 400;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(e.TransformForClient()));
        }
    }
}
