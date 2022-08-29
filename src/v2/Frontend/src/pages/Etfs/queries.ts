import { useQuery } from 'react-query';

import apiClient from '../../api';

export const etfsQueryKeyBuilder = () => 'etf';

export const useEtfsQuery = () => {
  return useQuery(etfsQueryKeyBuilder(), () => apiClient.etfs.getEtfs());
};

export const etfDetailQueryKeyBuilder = (id: number) => ['etf', id];

export const useEtfDetailQuery = (id: number) => {
  return useQuery(etfDetailQueryKeyBuilder(id), () => apiClient.etfs.getEtfDetail(id));
};
