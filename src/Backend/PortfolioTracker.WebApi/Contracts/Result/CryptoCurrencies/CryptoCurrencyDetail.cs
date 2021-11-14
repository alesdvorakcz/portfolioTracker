
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoCurrencyDetail
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public DateTime? Date { get; set; }
    public decimal? ConverstionRateUSD { get; set; }
    public decimal? ConverstionRateEUR { get; set; }

    public IEnumerable<CryptoCurrencyValueHistory> History { get; set; } = Array.Empty<CryptoCurrencyValueHistory>();
}
