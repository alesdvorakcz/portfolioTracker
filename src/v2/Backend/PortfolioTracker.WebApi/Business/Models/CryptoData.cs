namespace PortfolioTracker.WebApi.Business.Models;

public class CryptoData
{
    public IEnumerable<CryptoWallet> CryptoWallets { get; set; } = Array.Empty<CryptoWallet>();
    // public IEnumerable<NetWorthHistory> History { get; set; } = Array.Empty<NetWorthHistory>();
    // public IEnumerable<NetWorthHistory> MonthlyHistory { get; set; } = Array.Empty<NetWorthHistory>();
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }
}
