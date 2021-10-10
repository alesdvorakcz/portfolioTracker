
using PortfolioTracker.WebApi.Common;

namespace PortfolioTracker.WebApi.Services;

public class LoadCurrencyValueHistoryService
{
    private const string Url = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date={0}";

    public async Task<IEnumerable<CNBCurrencyValueHistory>> LoadHistory(IEnumerable<string> currencyIds, IEnumerable<DateTime> dates)
    {
        using var httpClient = new HttpClient();

        var result = new List<CNBCurrencyValueHistory>();

        foreach (var day in dates)
        {
            var response = await httpClient.GetStringAsync(string.Format(Url, day.ToString("dd.MM.yyyy")));
            var data = ParseResult(response);

            foreach (var row in data)
            {
                var currencyId = currencyIds.FirstOrDefault(x => row.CurrencyCode == x);
                if (currencyId != null)
                {
                    result.Add(new CNBCurrencyValueHistory
                    {
                        Date = day,
                        CurrencyId = currencyId,
                        ConversionRate = row.ConversionRate
                    });
                }
            }

            var czkCurrency = currencyIds.FirstOrDefault(x => x == "CZK");
            if (czkCurrency != null)
            {
                result.Add(new CNBCurrencyValueHistory
                {
                    Date = day,
                    CurrencyId = czkCurrency,
                    ConversionRate = 1
                });
            }

            await Task.Delay(50);
        }

        return result;
    }

    private static IEnumerable<CnbCurrencyRateRow> ParseResult(string? response)
    {
        if (string.IsNullOrEmpty(response))
            throw new ArgumentNullException(nameof(response));

        var result = new List<CnbCurrencyRateRow>();

        var rows = response.Split('\n').Skip(2);
        foreach (var row in rows)
        {
            try
            {
                var cols = row.Split('|');
                if (cols.Length != 5)
                    continue;

                result.Add(new CnbCurrencyRateRow
                {
                    Country = cols[0],
                    CurrencyName = cols[1],
                    Amount = Convert.ToInt32(cols[2]),
                    CurrencyCode = cols[3],
                    ConversionRate = Convert.ToDecimal(cols[4].Trim().Replace(",", "."))
                });
            }
            catch (Exception e)
            {
                throw new BusinessException($"Could not parse row '{row}'", e);
            }
        }

        return result;
    }
}
