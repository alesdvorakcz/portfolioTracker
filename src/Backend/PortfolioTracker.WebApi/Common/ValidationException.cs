
namespace PortfolioTracker.WebApi.Common;

public class ValidationException : BusinessException
{
    public ValidationException(string errorCode)
    {
        ErrorCode = errorCode;
    }

    public ValidationException(ValidationError error)
    {
        errors.Add(error);
    }

    public ValidationException(string propertyName, string errorCode)
    {
        errors.Add(new ValidationError(propertyName, errorCode));
    }

    public ValidationException(IEnumerable<ValidationError> errors)
    {
        this.errors.AddRange(errors);
    }

    public string ErrorCode { get; } = string.Empty;

    private readonly List<ValidationError> errors = new();
    public IEnumerable<ValidationError> Errors => errors;

    public Dictionary<string, string> TransformForClient()
    {
        var errorsDict = new Dictionary<string, string>();

        if (!string.IsNullOrEmpty(ErrorCode))
            errorsDict.Add("_error", ErrorCode);

        foreach (var error in errors)
        {
            //Transform keys to lowercase
            var key = char.ToLowerInvariant(error.PropertyName[0]) + error.PropertyName[1..];

            if (!errorsDict.ContainsKey(key))
                errorsDict.Add(key, error.ErrorCode);
        }

        return errorsDict;
    }
}
