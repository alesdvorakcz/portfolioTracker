import React from 'react';

import { GetAllEtfInstruments } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, PieChart } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfData: GetAllEtfInstruments;
}

const EtfPie: React.FC<Props> = ({ etfData }) => {
  const data = etfData.etfInstruments.map((etf) => {
    return {
      id: etf.id,
      label: etf.slug,
      valueTotal: etf.valueCZK,
      value:
        etfData.totalValueCZK && etf.valueCZK ? etf.valueCZK / etfData.totalValueCZK : etf.valueCZK,
    };
  });
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

export default EtfPie;
