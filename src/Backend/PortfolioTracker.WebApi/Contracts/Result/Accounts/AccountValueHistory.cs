
namespace PortfolioTracker.WebApi.Contracts.Result;

public class AccountValueHistory
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public DateTime Date { get; set; }

    public decimal? ConversionRate { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueBeforeCZK { get; set; }
    public decimal TransactionCzk { get; set; }
    public decimal? ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }

    public decimal CumulativeTransactionsCZK { get; set; }
}
