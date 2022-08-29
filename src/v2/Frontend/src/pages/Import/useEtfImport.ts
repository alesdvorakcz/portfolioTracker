import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';

export const useEtfImport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return apiClient.import.etfs();
  });

  const onImport = async () => {
    await mutation.mutateAsync();
    // queryClient.invalidateQueries(currenciesQueryKeyBuilder());
    return { success: true, errors: {} };
  };

  return { onImport, isLoading: mutation.isLoading };
};
