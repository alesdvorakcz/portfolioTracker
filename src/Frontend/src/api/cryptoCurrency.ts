import axios from 'axios';

import { ROOT } from './config';
import {
  CryptoCurrency,
  CryptoCurrencyDetail,
  CryptoCurrencyValueHistoryToAdd,
  CryptoCurrencyValueHistoryToEdit,
} from './models';

const getCryptoCurrencies = async () => {
  const result = await axios.get<CryptoCurrency[]>(`${ROOT}CryptoCurrency`);
  return result.data;
};

const getCryptoCurrencyDetail = async (id: string) => {
  const result = await axios.get<CryptoCurrencyDetail>(`${ROOT}CryptoCurrency/${id}`);
  return result.data;
};

const addValueToHistory = async (currencyId: string, value: CryptoCurrencyValueHistoryToAdd) => {
  const result = await axios.post<CryptoCurrencyValueHistoryToAdd>(
    `${ROOT}CryptoCurrency/${currencyId}/History`,
    value
  );
  return result.data;
};

const editValueToHistory = async (
  currencyId: string,
  valueHistoryId: number,
  value: CryptoCurrencyValueHistoryToEdit
) => {
  const result = await axios.put<CryptoCurrencyValueHistoryToEdit>(
    `${ROOT}CryptoCurrency/${currencyId}/History/${valueHistoryId}`,
    value
  );
  return result.data;
};

const deleteValueFromHistory = async (currencyId: string, valueHistoryId: number) => {
  await axios.delete(`${ROOT}CryptoCurrency/${currencyId}/History/${valueHistoryId}`);
};

const cryptoCurrencyClient = {
  getCryptoCurrencies,
  getCryptoCurrencyDetail,
  addValueToHistory,
  editValueToHistory,
  deleteValueFromHistory,
};

export default cryptoCurrencyClient;
