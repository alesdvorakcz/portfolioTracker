import accountsClient from './accounts';
import currenciesClient from './currency';

const apiClient = {
  accounts: accountsClient,
  currencies: currenciesClient,
};

export default apiClient;
