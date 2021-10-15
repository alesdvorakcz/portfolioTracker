import { useQuery } from 'react-query';

import apiClient from '../../api';

export const getDashboardDataQueryKeyBuilder = () => 'dashboard';

export const useGetDashboardDataQuery = () => {
  return useQuery(getDashboardDataQueryKeyBuilder(), apiClient.dashboard.getDataForDashboard);
};
