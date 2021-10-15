
namespace PortfolioTracker.WebApi.Contracts.Input;

public class CurrencyHistoryImportRequest
{
    public string[] CurrencyIds { get; set; } = Array.Empty<string>();
    public DateTime From { get; set; }
    public DateTime To { get; set; }
}
