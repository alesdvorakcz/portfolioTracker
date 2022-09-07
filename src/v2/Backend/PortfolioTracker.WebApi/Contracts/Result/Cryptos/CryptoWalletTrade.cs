namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoWalletTrade
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public decimal? ConversionRate { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal UnitsChange { get; set; }
    public decimal UnitsTotal { get; set; }
    public decimal Transaction { get; set; }
    public decimal TransactionCZK { get; set; }
    public decimal ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal StakedUnits { get; set; }
    public decimal CumulativeStakedUnits { get; set; }
}
