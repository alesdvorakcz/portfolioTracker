import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { CryptoData } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  cryptoData: CryptoData;
}

const CryptosHistoryChart: React.FC<Props> = ({ cryptoData }) => {
  const cryptos = cryptoData.cryptoWallets.map((wallet) => ({
    id: wallet.id,
    name: wallet.name,
    valueData: wallet.history.map((item) => ({
      x: moment.utc(item.date).format('YYYY-MM-DD'),
      y: item.valueAfterCZK,
    })),
    transactionsData: wallet.history.map((item) => ({
      x: moment.utc(item.date).format('YYYY-MM-DD'),
      y: item.cumulativeTransactionsCZK,
    })),
  }));

  const data = cryptos.reduce<Serie[]>((acc, item) => {
    return [
      ...acc,
      { id: `values_${item.id}`, data: item.valueData },
      { id: `transactions_${item.id}`, data: item.transactionsData },
    ];
  }, []);

  return (
    <LineChart
      data={data}
      height={500}
      tooltip={({ point }) => {
        const wallet = cryptos.find(
          (x) => x.id.toString() === point.serieId.toString().split('_')[1]
        );
        if (!wallet) return <div>Error</div>;

        const index = parseInt(point.id.split('.')[1], 10);
        const value = wallet.valueData[index].y;
        const transaction = wallet.transactionsData[index].y;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Wallet: " value={wallet.name} />
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem
              label="Value: "
              value={value?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            />
            <ChartTooltipItem
              label="Transactions: "
              value={transaction?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default CryptosHistoryChart;
