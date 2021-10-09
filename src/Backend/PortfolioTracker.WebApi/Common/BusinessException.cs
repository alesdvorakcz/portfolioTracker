
namespace PortfolioTracker.WebApi.Common;

public class BusinessException : Exception
{
    public BusinessException()
    {

    }

    public BusinessException(string message) : base(message)
    {

    }

    public BusinessException(Exception innerException) : base(string.Empty, innerException)
    {

    }

    public BusinessException(string message, Exception? innerException) : base(message, innerException)
    {

    }
}
