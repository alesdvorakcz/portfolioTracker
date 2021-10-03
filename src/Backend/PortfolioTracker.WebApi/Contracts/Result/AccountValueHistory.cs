
namespace PortfolioTracker.WebApi.Contracts.Result;

public class AccountValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal TransactionCzk { get; set; }
}
