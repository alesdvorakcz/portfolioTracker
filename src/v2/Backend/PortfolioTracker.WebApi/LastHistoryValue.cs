namespace PortfolioTracker.WebApi;

public class LastHistoryValue
{
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }
}

public class LastCryptoWalletHistoryValue
{
    public decimal ValueAfter { get; set; }
    public decimal ValueAfterCZK { get; set; }
    public decimal UnitsTotal { get; set; }
    public decimal CumulativeStakedUnits { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
}
