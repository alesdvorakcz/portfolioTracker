import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { etfsQueryKeyBuilder } from '../Etfs/queries';

export const useEtfImport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return apiClient.import.etfs();
  });

  const onImport = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(etfsQueryKeyBuilder());
    return { success: true, errors: {} };
  };

  return { onImport, isLoading: mutation.isLoading };
};
