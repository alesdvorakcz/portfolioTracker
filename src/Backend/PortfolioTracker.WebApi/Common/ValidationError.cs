
namespace PortfolioTracker.WebApi.Common;

public class ValidationError
{
    public string PropertyName { get; set; }
    public string ErrorCode { get; set; }

    public ValidationError()
    {
        PropertyName = string.Empty;
        ErrorCode = string.Empty;
    }

    public ValidationError(string propertyName, string errorCode)
    {
        PropertyName = propertyName;
        ErrorCode = errorCode;
    }

    public override string ToString()
    {
        return ErrorCode;
    }

    public const string Required = "required";
    public const string Duplicity = "duplicity";
}
