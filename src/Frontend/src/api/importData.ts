import axios from 'axios';

import { ROOT } from './config';
import { ImportCryptoCurrenciesQuery, ImportCurrenciesQuery, ImportEtfsQuery } from './models';

const importData = async () => {
  await axios.put(`${ROOT}Import`);
};

const importEtfData = async (query: ImportEtfsQuery) => {
  await axios.put<ImportEtfsQuery>(`${ROOT}Import/etf`, query);
};

const importCurrencyData = async (query: ImportCurrenciesQuery) => {
  await axios.put<ImportCurrenciesQuery>(`${ROOT}Import/currency`, query);
};

const importCryptoCurrencyData = async (query: ImportCryptoCurrenciesQuery) => {
  await axios.put<ImportCryptoCurrenciesQuery>(`${ROOT}Import/cryptoCurrency`, query);
};

const importDataClient = {
  importData,
  importEtfData,
  importCurrencyData,
  importCryptoCurrencyData,
};

export default importDataClient;
