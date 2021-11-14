
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoCurrencyWalletDetail
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string CryptoCurrencyId { get; set; } = string.Empty;

    public DateTime? Date { get; set; }
    public decimal? ChangeEUR { get; set; }
    public decimal? Change { get; set; }
    public decimal? AmountAfter { get; set; }
    public IEnumerable<CryptoCurrencyTrade> Trades { get; set; } = Array.Empty<CryptoCurrencyTrade>();
}
