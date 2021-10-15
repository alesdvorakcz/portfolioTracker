
namespace PortfolioTracker.WebApi.Contracts.Result;

public class GetAllAccountsResult
{
    public IEnumerable<Account> Accounts { get; set; } = Array.Empty<Account>();
    public decimal? TotalValueCZK { get; set; }
    public decimal? TotalTransactionsCZK { get; set; }
}
