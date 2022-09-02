import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { cryptosQueryKeyBuilder } from '../Cryptos/queries';
import { currenciesQueryKeyBuilder } from '../Currencies/queries';
import { etfsQueryKeyBuilder } from '../Etfs/queries';

export const useImportAll = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return apiClient.import.all();
  });

  const onImport = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(cryptosQueryKeyBuilder());
    queryClient.invalidateQueries(currenciesQueryKeyBuilder());
    queryClient.invalidateQueries(etfsQueryKeyBuilder());
    return { success: true, errors: {} };
  };

  return { onImport, isLoading: mutation.isLoading };
};
