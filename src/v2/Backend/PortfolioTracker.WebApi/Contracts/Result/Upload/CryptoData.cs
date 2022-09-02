namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoData
{
    public IEnumerable<CryptoWallet> CryptoWallets { get; set; } = Array.Empty<CryptoWallet>();
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }
}
