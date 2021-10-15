import { ResponsivePie } from '@nivo/pie';
import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';

interface Props {
  dashboardData: GetDataForDashboardResult;
}

const DashboardAssedClassesPie: React.FC<Props> = ({ dashboardData }) => {
  const categories = dashboardData.accounts.reduce<any[]>((result, account) => {
    const asset = result.find((x) => x.id === account.category);
    if (asset) {
      asset.totalValueCZK += account.totalValueCZK;
      asset.totalTransactionsCZK += account.totalTransactionsCZK;
      return result;
    }
    return [
      ...result,
      {
        id: account.category,
        totalValueCZK: account.totalValueCZK,
        totalTransactionsCZK: account.totalTransactionsCZK,
      },
    ];
  }, []);

  //TODO: make this more pretty

  const data = categories.map((category) => ({
    id: category.id,
    label: category.id,
    value: category.totalValueCZK,
  }));

  return (
    <div style={{ height: 500 }}>
      <ResponsivePie data={data} margin={{ top: 50, right: 50, bottom: 50, left: 60 }} />
    </div>
  );
};

export default DashboardAssedClassesPie;
