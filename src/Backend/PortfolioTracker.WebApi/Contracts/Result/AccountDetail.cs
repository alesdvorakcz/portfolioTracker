
namespace PortfolioTracker.WebApi.Contracts.Result;

public class AccountDetail
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<AccountValueHistory> History { get; set; } = Array.Empty<AccountValueHistory>();
}
