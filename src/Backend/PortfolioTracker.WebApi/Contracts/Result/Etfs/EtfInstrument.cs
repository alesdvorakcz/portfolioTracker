
namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfInstrument
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Isin { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public decimal Value { get; set; }
    public decimal? ValueCZK { get; set; }
    public int TotalAmount { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal? CumulativeTransactionsCZK { get; set; }
}
