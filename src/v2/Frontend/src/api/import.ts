import axios from 'axios';

import { ROOT } from './config';

const all = async () => {
  await axios.post(`${ROOT}import/all`);
};

const currencies = async () => {
  await axios.post(`${ROOT}import/currencies`);
};

const etfs = async () => {
  await axios.post(`${ROOT}import/etfs`);
};

const cryptos = async () => {
  await axios.post(`${ROOT}import/cryptos`);
};

const importClient = { currencies, etfs, cryptos, all };

export default importClient;
