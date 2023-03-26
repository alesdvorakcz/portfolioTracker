import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { Account, AccountHistoryAggregatedRow } from '../../../api/models';
import { toCurrencyFormat, toPercentFormat } from '../../../i18n';
import { getGainColor, getGainIcon } from '../../../utils/helpers';

interface Props {
  account: Account;
  showInCZK: boolean;
}

const AccountMonthlyHistoryTable: React.FC<Props> = ({ account, showInCZK }) => {
  const columns: ColumnType<AccountHistoryAggregatedRow>[] = [
    {
      title: 'Month',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text: string) => <div>{moment.utc(text).format('MMM YYYY')}</div>,
    },
    {
      title: 'Value Before',
      dataIndex: 'valueBefore',
      key: 'valueBefore',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Value After',
      dataIndex: 'valueAfter',
      key: 'valueAfter',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Cumulative Transactions',
      dataIndex: 'cumulativeTransactions',
      key: 'cumulativeTransactions',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
      align: 'right',
      colSpan: 2,
      render: (text: number) => (
        <div style={{ color: getGainColor(text) }}>
          {toCurrencyFormat(text, account.currencyId)}
        </div>
      ),
    },
    {
      title: 'Profit %',
      dataIndex: 'profitPercentage',
      key: 'profitPercentage',
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
      dataIndex: 'cumulativeProfit',
      key: 'cumulativeProfit',
      align: 'right',
      render: (text: number) => (
        <div style={{ color: getGainColor(text) }}>
          {toCurrencyFormat(text, account.currencyId)}
        </div>
      ),
    },
  ];

  const columnsCZK: ColumnType<AccountHistoryAggregatedRow>[] = [
    {
      title: 'Month',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text: string) => <div>{moment.utc(text).format('MMM YYYY')}</div>,
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

  const trades = account.monthlyHistory;

  return (
    <Table
      bordered
      columns={showInCZK ? columnsCZK : columns}
      dataSource={trades}
      rowKey="id"
      pagination={{ pageSize: 50 }}
    />
  );
};

export default AccountMonthlyHistoryTable;
