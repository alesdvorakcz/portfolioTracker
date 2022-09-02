namespace PortfolioTracker.WebApi.Excel.Models;

public class AccountTrade
{
    public DateTime Date { get; set; }
    public string AccountName { get; set; } = string.Empty;
    public decimal BalanceBefore { get; set; }
    public decimal TransactionCZK { get; set; }
}
