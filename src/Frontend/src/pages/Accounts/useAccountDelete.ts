import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import apiClient from '../../api';
import { accountsQueryKeyBuilder } from './queries';

export const useAccountDelete = (accountId: number) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const mutation = useMutation(() => {
    return apiClient.accounts.deleteAccount(accountId);
  });

  const onDelete = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(accountsQueryKeyBuilder(), { exact: true });
    history.replace('/accounts');
  };

  return {
    onDelete,
  };
};
