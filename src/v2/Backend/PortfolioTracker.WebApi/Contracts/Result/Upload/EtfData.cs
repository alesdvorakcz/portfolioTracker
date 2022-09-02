namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfData
{
    public IEnumerable<EtfDetailWithTrades> Etfs { get; set; } = Array.Empty<EtfDetailWithTrades>();
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }
}
