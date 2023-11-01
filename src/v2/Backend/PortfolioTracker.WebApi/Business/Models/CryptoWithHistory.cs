namespace PortfolioTracker.WebApi.Business.Models;

public class CryptoWithHistory
{
    public int Id { get; set; }

    public decimal UnitsTotal { get; set; }
    public decimal Value { get; set; }
    public decimal ValueCZK { get; set; }
    public decimal CumulativeStakedUnits { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }

    public IEnumerable<CryptoHistoryAggregatedRow> AllWalletsHistory { get; set; } = Array.Empty<CryptoHistoryAggregatedRow>();
    public IEnumerable<CryptoHistoryAggregatedRow> AllWalletsMonthlyHistory { get; set; } = Array.Empty<CryptoHistoryAggregatedRow>();
    public IEnumerable<CryptoHistoryAggregatedRow> AllWalletsYeatlyHistory { get; set; } = Array.Empty<CryptoHistoryAggregatedRow>();
}
