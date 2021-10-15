import axios from 'axios';

import { ROOT } from './config';
import { GetDataForDashboardResult } from './models';

const getDataForDashboard = async () => {
  const result = await axios.get<GetDataForDashboardResult>(`${ROOT}Dashboard`);
  return result.data;
};

const dashboardClient = {
  getDataForDashboard,
};

export default dashboardClient;
