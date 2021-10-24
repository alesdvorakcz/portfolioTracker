
namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfInstrumentDetail
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Isin { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<EtfInstrumentValueHistory> ValueHistory { get; set; } = Array.Empty<EtfInstrumentValueHistory>();
    public IEnumerable<EtfTradeHistory> TradeHistory { get; set; } = Array.Empty<EtfTradeHistory>();
    public IEnumerable<EtfTradeHistoryEnhanced> TradeHistoryEnhanced { get; set; } = Array.Empty<EtfTradeHistoryEnhanced>();

    public decimal Value { get; set; }
    public decimal? ValueCZK { get; set; }
    public int TotalAmount { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal? CumulativeTransactionsCZK { get; set; }
}
