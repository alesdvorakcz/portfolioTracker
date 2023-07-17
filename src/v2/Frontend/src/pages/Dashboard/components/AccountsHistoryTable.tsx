import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { AccountData, NetWorthHistoryAggregated } from '../../../contexts/tradesContext';
import { toCurrencyFormat, toPercentFormat } from '../../../i18n';
import { getGainColor, getGainIcon } from '../../../utils/helpers';

interface Props {
  accountData: AccountData;
  timeRange: string;
}

const AccountsHistoryTable: React.FC<Props> = ({ accountData, timeRange }) => {
  let trades: NetWorthHistoryAggregated[] = [];
  if (timeRange === 'Yearly') {
    trades = accountData.yearlyHistory;
  } else if (timeRange === 'Monthly') {
    trades = accountData.monthlyHistory;
  } else {
    trades = accountData.history;
  }

  const columns: ColumnType<NetWorthHistoryAggregated>[] = [
    {
      title: 'Date',
      dataIndex: 'dateStart',
      key: 'date',
      render: (text: string) => (
        <div>
          {timeRange === 'Monthly'
            ? moment.utc(text).format('MMM YYYY')
            : timeRange === 'Yearly'
            ? moment.utc(text).format('YYYY')
            : moment.utc(text).format('l')}
        </div>
      ),
    },
    {
      title: 'Value Before',
      dataIndex: 'valueBeforeCZK',
      key: 'valueBeforeCZK',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Transaction',
      dataIndex: 'transactionCZK',
      key: 'transactionCZK',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Value After',
      dataIndex: 'valueAfterCZK',
      key: 'valueAfterCZK',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Cumulative Transactions',
      dataIndex: 'cumulativeTransactionsCZK',
      key: 'cumulativeTransactionsCZK',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Profit',
      dataIndex: 'profitCZK',
      key: 'profitCZK',
      align: 'right',
      colSpan: 2,
      render: (text: number) => (
        <div style={{ color: getGainColor(text) }}>{toCurrencyFormat(text)}</div>
      ),
    },
    {
      title: 'Profit %',
      dataIndex: 'profitPercentageCZK',
      key: 'profitPercentageCZK',
      align: 'right',
      colSpan: 0,
      render: (text: number) => (
        <div style={{ color: getGainColor(text) }}>
          {getGainIcon(text)} {toPercentFormat(text)}
        </div>
      ),
    },
    {
      title: 'Cumulative Profit',
      dataIndex: 'cumulativeProfitCZK',
      key: 'cumulativeProfitCZK',
      align: 'right',
      render: (text: number) => (
        <div style={{ color: getGainColor(text) }}>{toCurrencyFormat(text)}</div>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={trades}
      rowKey="id"
      pagination={{ pageSize: 50 }}
    />
  );
};

export default AccountsHistoryTable;
