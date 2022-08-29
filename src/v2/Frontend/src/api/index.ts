import cryptosClient from './crypto';
import currenciesClient from './currency';
import etfsClient from './etf';
import importClient from './import';

const apiClient = {
  currencies: currenciesClient,
  cryptos: cryptosClient,
  etfs: etfsClient,
  import: importClient,
};

export default apiClient;
