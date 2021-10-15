namespace PortfolioTracker.WebApi.Contracts.Result;

public class AllAccountsHistoryValue
{
    public DateTime Date { get; set; }
    public decimal TotalTransactionsCZK { get; set; }
    public decimal TotalValueCZK { get; set; }
}
