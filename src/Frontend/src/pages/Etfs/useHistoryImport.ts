import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { etfInstrumentDetailQueryKeyBuilder, etfInstrumentsQueryKeyBuilder } from './queries';

export const useHistoryImport = (etfInstrumentId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.etfs.historyImport(id);
  });

  const onClick = async () => {
    try {
      await mutation.mutateAsync(etfInstrumentId);
      queryClient.invalidateQueries(etfInstrumentsQueryKeyBuilder(), { exact: true });
      queryClient.invalidateQueries(etfInstrumentDetailQueryKeyBuilder(etfInstrumentId));
      return { success: true, errors: {} };
    } catch (error) {
      return handleSubmitErrors(error);
    }
  };

  return { onClick, isLoading: mutation.isLoading };
};
