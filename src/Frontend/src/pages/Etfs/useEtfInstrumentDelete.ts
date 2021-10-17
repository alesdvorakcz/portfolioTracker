import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import apiClient from '../../api';
import { etfInstrumentsQueryKeyBuilder } from './queries';

export const useEtfInstrumentDelete = (etfInstrumentId: number) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const mutation = useMutation(() => {
    return apiClient.etfs.deleteEtfInstrument(etfInstrumentId);
  });

  const onDelete = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(etfInstrumentsQueryKeyBuilder(), { exact: true });
    history.replace('/etfs');
  };

  return {
    onDelete,
  };
};
