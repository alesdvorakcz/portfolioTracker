import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { EtfInstrumentValueHistory } from '../../api/models';
import { etfInstrumentDetailQueryKeyBuilder, etfInstrumentsQueryKeyBuilder } from './queries';

export const useEtfInstrumentValueHistoryDelete = (etfInstrumentId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.etfs.deleteValueFromEtfHistory(etfInstrumentId, id);
  });

  const onDelete = async (historyValue: EtfInstrumentValueHistory) => {
    await mutation.mutateAsync(historyValue.id);
    queryClient.invalidateQueries(etfInstrumentDetailQueryKeyBuilder(etfInstrumentId));
    queryClient.invalidateQueries(etfInstrumentsQueryKeyBuilder(), { exact: true });
  };

  return {
    onDelete,
  };
};
