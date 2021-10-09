import { useQuery } from 'react-query';

import apiClient from '../../api';

export const accountsQueryKeyBuilder = () => 'account';

export const useAccountsQuery = () => {
  return useQuery(accountsQueryKeyBuilder(), apiClient.accounts.getAccounts);
};

export const accountDetailQueryKeyBuilder = (id: number) => ['account', id];

export const useAccountDetailQuery = (id: number) => {
  return useQuery(accountDetailQueryKeyBuilder(id), () => apiClient.accounts.getAccountDetail(id));
};
