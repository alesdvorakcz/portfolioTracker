using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

namespace PortfolioTracker.WebApi.Middleware;

public static class ApiExceptionsMiddlewareExtensions
{
    public static IApplicationBuilder UseCustomExceptionHandlerMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ApiExceptionsMiddleware>();
    }

    //https://blog.stephencleary.com/2020/06/a-new-pattern-for-exception-logging.html
    public static bool LogWarningAndGoToCatch(this ILogger<ApiExceptionsMiddleware> logger, Exception e, string message)
    {
        logger.LogWarning(e, message);

        return true;
    }

    public static bool LogInformationAndGoToCatch(this ILogger<ApiExceptionsMiddleware> logger, Exception e, string message)
    {
        logger.LogWarning(e, message);

        return true;
    }
}