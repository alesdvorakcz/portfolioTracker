
namespace PortfolioTracker.WebApi.Contracts.Input;

public class AccountValueHistoryToAdd
{
    public DateTime Date { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal TransactionCzk { get; set; }
}
