import axios from 'axios';

import { ROOT } from './config';

const currencies = async () => {
  await axios.post(`${ROOT}import/currencies`);
};

const etfs = async () => {
  await axios.post(`${ROOT}import/etfs`);
};

const cryptos = async () => {
  await axios.post(`${ROOT}import/cryptos`);
};

const importClient = { currencies, etfs, cryptos };

export default importClient;
