
namespace PortfolioTracker.WebApi.Contracts.Input;

public class ImportQuery
{
    public bool Full { get; set; } = false;
    public bool Rewrite { get; set; } = false;
}

public class ImportEtfsQuery : ImportQuery
{
    public int[]? Filter { get; set; }
}

public class ImportCurrenciesQuery : ImportQuery
{
    public string[]? Filter { get; set; }
}

public class ImportCryptocurrenciesQuery : ImportQuery
{
    public string[]? Filter { get; set; }
}