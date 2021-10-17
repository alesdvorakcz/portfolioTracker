import accountsClient from './accounts';
import currenciesClient from './currency';
import dashboardClient from './dashboard';
import etfsClient from './etfs';

const apiClient = {
  accounts: accountsClient,
  currencies: currenciesClient,
  dashboard: dashboardClient,
  etfs: etfsClient,
};

export default apiClient;
