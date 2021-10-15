import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, PieChart } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

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
    value: dashboardData.totalValueCZK
      ? category.totalValueCZK / dashboardData.totalValueCZK
      : category.totalValueCZK,
    valueTotal: category.totalValueCZK,
  }));

  return (
    <PieChart
      data={data}
      height={500}
      tooltip={(p) => (
        <ChartTooltip>
          <ChartTooltipItem label={p.datum.label.toString()} value={p.datum.formattedValue} />
          <ChartTooltipItem
            value={p.datum.data.valueTotal?.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: DEFAULT_CURRENCY,
            })}
          />
        </ChartTooltip>
      )}
    />
  );
};

export default DashboardAssedClassesPie;
