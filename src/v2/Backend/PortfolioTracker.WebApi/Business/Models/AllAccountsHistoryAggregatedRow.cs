namespace PortfolioTracker.WebApi.Business.Models;

public class AllAccountsHistoryAggregatedRow
{
    public DateTime DateStart { get; set; }
    public DateTime DateEnd { get; set; }
    public decimal ValueBeforeCZK { get; set; }
    public decimal TransactionCZK { get; set; }
    public decimal ValueAfterCZK { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal ProfitCZK { get; set; }
    public double ProfitPercentageCZK { get; set; }
    public decimal CumulativeProfitCZK { get; set; }
}

public class AllAccountsTrade
{
    public DateTime Date { get; set; }
    public decimal BalanceBeforeCZK { get; set; }
    public decimal TransactionCZK { get; set; }
}

public class AccountValueCache
{
    public decimal BalanceBeforeCZK { get; set; }
}