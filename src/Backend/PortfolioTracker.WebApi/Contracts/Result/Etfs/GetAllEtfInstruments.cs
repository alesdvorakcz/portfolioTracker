
namespace PortfolioTracker.WebApi.Contracts.Result;

public class GetAllEtfInstruments
{
    public IEnumerable<EtfInstrument> EtfInstruments { get; set; } = Array.Empty<EtfInstrument>();
    public decimal? TotalValueCZK { get; set; }
    public decimal? TotalTransactionsCZK { get; set; }
}
