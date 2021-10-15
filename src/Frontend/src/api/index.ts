import accountsClient from './accounts';
import currenciesClient from './currency';
import dashboardClient from './dashboard';

const apiClient = {
  accounts: accountsClient,
  currencies: currenciesClient,
  dashboard: dashboardClient,
};

export default apiClient;
