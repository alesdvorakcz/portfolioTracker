import axios from 'axios';

import { ROOT } from './config';
import { Crypto, CryptoDetail } from './models';

const getCryptos = async () => {
  const result = await axios.get<Crypto[]>(`${ROOT}crypto`);
  return result.data;
};

const getCryptoDetail = async (id: number) => {
  const result = await axios.get<CryptoDetail>(`${ROOT}crypto/${id}`);
  return result.data;
};

const cryptosClient = {
  getCryptos,
  getCryptoDetail,
};

export default cryptosClient;
