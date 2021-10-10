import axios, { AxiosResponse } from 'axios';

import { ROOT } from './config';
import {
  Currency,
  CurrencyDetail,
  CurrencyHistoryImportRequest,
  CurrencyValueHistory,
  CurrencyValueHistoryToAdd,
  CurrencyValueHistoryToEdit,
} from './models';

const getCurrencies = async () => {
  const result = await axios.get<Currency[]>(`${ROOT}Currency`);
  return result.data;
};

const getCurrencyDetail = async (id: string) => {
  const result = await axios.get<CurrencyDetail>(`${ROOT}Currency/${id}`);
  return result.data;
};

const addValueToHistory = async (currencyId: string, value: CurrencyValueHistoryToAdd) => {
  const result = await axios.post<CurrencyValueHistoryToAdd, AxiosResponse<CurrencyValueHistory>>(
    `${ROOT}Currency/${currencyId}/History`,
    value
  );
  return result.data;
};

const editValueToHistory = async (
  currencyId: string,
  valueHistoryId: number,
  value: CurrencyValueHistoryToEdit
) => {
  const result = await axios.put<CurrencyValueHistoryToEdit, AxiosResponse<CurrencyValueHistory>>(
    `${ROOT}Currency/${currencyId}/History/${valueHistoryId}`,
    value
  );
  return result.data;
};

const historyImport = async (params: CurrencyHistoryImportRequest) => {
  await axios.put<CurrencyHistoryImportRequest, AxiosResponse<CurrencyValueHistory>>(
    `${ROOT}Currency/history/import`,
    params
  );
};

const currenciesClient = {
  getCurrencies,
  getCurrencyDetail,
  addValueToHistory,
  editValueToHistory,
  historyImport,
};

export default currenciesClient;
