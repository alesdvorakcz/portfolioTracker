import accountsClient from './accounts';
import cryptoCurrenciesClient from './cryptoCurrency';
import cryptoCurrencyWalletsClient from './cryptoCurrencyWallets';
import currenciesClient from './currency';
import dashboardClient from './dashboard';
import etfsClient from './etfs';
import importDataClient from './importData';

const apiClient = {
  accounts: accountsClient,
  cryptoCurrencies: cryptoCurrenciesClient,
  cryptoCurrencyWallets: cryptoCurrencyWalletsClient,
  currencies: currenciesClient,
  dashboard: dashboardClient,
  etfs: etfsClient,
  importData: importDataClient,
};

export default apiClient;
