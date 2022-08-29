import axios from 'axios';

import { ROOT } from './config';
import { Currency, CurrencyDetail } from './models';

const getCurrencies = async () => {
  const result = await axios.get<Currency[]>(`${ROOT}currency`);
  return result.data;
};

const getCurrencyDetail = async (id: string) => {
  const result = await axios.get<CurrencyDetail>(`${ROOT}currency/${id}`);
  return result.data;
};

const currenciesClient = {
  getCurrencies,
  getCurrencyDetail,
};

export default currenciesClient;
