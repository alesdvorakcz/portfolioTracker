import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { CryptoWallet } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat, toNumberFormat } from '../../../i18n';

interface Props {
  wallet: CryptoWallet;
}

const CryptoWalletHistoryChart: React.FC<Props> = ({ wallet }) => {
  const trades = wallet.history;

  const data1: Serie[] = [
    {
      id: 'value',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.valueAfter,
      })),
    },
    {
      id: 'transactions',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.cumulativeTransactions,
      })),
    },
  ];

  const data2: Serie[] = [
    {
      id: 'unitsTotal',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.unitsTotal,
      })),
    },
    {
      id: 'cumulativeStakedUnits',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.cumulativeStakedUnits,
      })),
    },
  ];

  return (
    <div>
      <div>
        <LineChart
          data={data1}
          height={500}
          yScale
          tooltip={({ point }) => {
            const index = parseInt(point.id.split('.')[1], 10);
            const value = trades[index].valueAfter;
            const transaction = trades[index].cumulativeTransactions;
            const unitPrice = trades[index].unitPrice;

            return (
              <ChartTooltip>
                <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
                <ChartTooltipItem
                  label="Value: "
                  value={toCurrencyFormat(value, wallet.crypto.currencyId)}
                />
                <ChartTooltipItem
                  label="Transactions: "
                  value={toCurrencyFormat(transaction, wallet.crypto.currencyId)}
                />
                <ChartTooltipItem
                  label="Unit Price: "
                  value={toCurrencyFormat(unitPrice, wallet.crypto.currencyId)}
                />
              </ChartTooltip>
            );
          }}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <h2>Units</h2>
        <LineChart
          data={data2}
          height={500}
          yScale
          tooltip={({ point }) => {
            const index = parseInt(point.id.split('.')[1], 10);
            const unitsTotal = trades[index].unitsTotal;
            const stakedTotal = trades[index].cumulativeStakedUnits;

            return (
              <ChartTooltip>
                <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
                <ChartTooltipItem label="Units Total: " value={toNumberFormat(unitsTotal)} />
                <ChartTooltipItem label="Staked Total: " value={toNumberFormat(stakedTotal)} />
              </ChartTooltip>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CryptoWalletHistoryChart;
