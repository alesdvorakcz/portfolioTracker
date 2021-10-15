import { ResponsivePie } from '@nivo/pie';
import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';

interface Props {
  dashboardData: GetDataForDashboardResult;
}

const DashboardAccountsPie: React.FC<Props> = ({ dashboardData }) => {
  const data = dashboardData.accounts.map((account) => {
    return {
      id: account.name,
      label: account.id,
      value: account.totalValueCZK,
    };
  });

  return (
    <div style={{ height: 500 }}>
      <ResponsivePie data={data} margin={{ top: 50, right: 50, bottom: 50, left: 60 }} />
    </div>
  );
};

export default DashboardAccountsPie;
