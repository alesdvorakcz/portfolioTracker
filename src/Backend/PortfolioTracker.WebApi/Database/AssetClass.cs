namespace PortfolioTracker.WebApi.Database;

public partial class AppDbContext
{
    public enum AssetClass
    {
        Stocks,
        Bonds,
        Cash,
        RealEstates,
        Commodities,
        Crypto
    }
}
