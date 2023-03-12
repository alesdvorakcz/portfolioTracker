namespace PortfolioTracker.WebApi.Business;

public static class CurrencyDataBuilder
{
    public static IEnumerable<Models.Currency> GetData(
        IEnumerable<Database.Dtos.Currency> currencies,
        IEnumerable<Database.Dtos.CurrencyValueHistory> currencyValueHistory)
    {
        var result = new List<Models.Currency>();

        foreach (var c in currencies)
        {
            var currency = new Models.Currency
            {
                Id = c.Id,
                Name = c.Name
            };

            currency.History = currencyValueHistory
                .Where(x => x.CurrencyId == currency.Id)
                .Select(x => new Models.CurrencyValueHistoryRow
                {
                    Id = x.Id,
                    Date = x.Date,
                    ConversionRate = x.ConversionRate
                });

            result.Add(currency);
        }

        return result;
    }
}
