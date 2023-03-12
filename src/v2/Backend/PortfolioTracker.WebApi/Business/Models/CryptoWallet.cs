namespace PortfolioTracker.WebApi.Business.Models;

public class CryptoWallet
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Crypto Crypto { get; set; } = new Crypto();
    public IEnumerable<CryptoWalletHistoryRow> History { get; set; } = Array.Empty<CryptoWalletHistoryRow>();

    public decimal Value { get; set; }
    public decimal? ValueCZK { get; set; }
    public decimal UnitsTotal { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal? CumulativeTransactionsCZK { get; set; }
    public decimal StakedUnits { get; set; }
}
