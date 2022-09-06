namespace PortfolioTracker.WebApi.Excel.Models;

public class CryptoTrade
{
    public DateTime Date { get; set; }
    public string WalletId { get; set; } = string.Empty;
    public decimal UnitsChange { get; set; }
    public decimal TransactionEur { get; set; }
    public decimal AmountAfter { get; set; }
};