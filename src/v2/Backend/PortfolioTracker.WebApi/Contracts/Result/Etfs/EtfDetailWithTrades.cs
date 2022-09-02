namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfDetailWithTrades
{
    public int Id { get; set; }
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ISIN { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;


    public decimal Value { get; set; }
    public decimal? ValueCZK { get; set; }
    public int UnitsTotal { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal? CumulativeTransactionsCZK { get; set; }

    public IEnumerable<EtfValueHistoryEnhanced> History { get; set; } = Array.Empty<EtfValueHistoryEnhanced>();
}