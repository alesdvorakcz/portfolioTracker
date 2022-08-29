import axios from 'axios';

import { ROOT } from './config';
import { Etf, EtfDetail } from './models';

const getEtfs = async () => {
  const result = await axios.get<Etf[]>(`${ROOT}etf`);
  return result.data;
};

const getEtfDetail = async (id: number) => {
  const result = await axios.get<EtfDetail>(`${ROOT}etf/${id}`);
  return result.data;
};

const etfsClient = {
  getEtfs,
  getEtfDetail,
};

export default etfsClient;
