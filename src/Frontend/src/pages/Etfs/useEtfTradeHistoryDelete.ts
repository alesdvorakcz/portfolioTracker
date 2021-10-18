import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { EtfTradeHistory } from '../../api/models';
import { etfInstrumentDetailQueryKeyBuilder, etfInstrumentsQueryKeyBuilder } from './queries';

export const useEtfTradeHistoryDelete = (etfInstrumentId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.etfs.deleteTradeFromEtfHistory(etfInstrumentId, id);
  });

  const onDelete = async (trade: EtfTradeHistory) => {
    await mutation.mutateAsync(trade.id);
    queryClient.invalidateQueries(etfInstrumentDetailQueryKeyBuilder(etfInstrumentId));
    queryClient.invalidateQueries(etfInstrumentsQueryKeyBuilder(), { exact: true });
  };

  return {
    onDelete,
  };
};
