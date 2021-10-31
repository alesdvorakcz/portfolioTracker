import accountsClient from './accounts';
import currenciesClient from './currency';
import dashboardClient from './dashboard';
import etfsClient from './etfs';
import importDataClient from './importData';

const apiClient = {
  accounts: accountsClient,
  currencies: currenciesClient,
  dashboard: dashboardClient,
  etfs: etfsClient,
  importData: importDataClient,
};

export default apiClient;
