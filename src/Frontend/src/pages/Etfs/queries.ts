import { useQuery } from 'react-query';

import apiClient from '../../api';

export const etfInstrumentsQueryKeyBuilder = () => 'etfs';

export const useEtfInstrumentsQuery = () => {
  return useQuery(etfInstrumentsQueryKeyBuilder(), apiClient.etfs.getEtfInstruments);
};

export const etfInstrumentDetailQueryKeyBuilder = (id: number) => ['etfs', id];

export const useEtfInstrumentDetailQuery = (id: number) => {
  return useQuery(etfInstrumentDetailQueryKeyBuilder(id), () =>
    apiClient.etfs.getEtfInstrumentDetail(id)
  );
};
