import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { Account, AccountTrade } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  account: Account;
}

const AccountHistoryTable: React.FC<Props> = ({ account }) => {
  const columns: ColumnType<AccountTrade>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Value Before',
      dataIndex: 'valueBefore',
      key: 'valueBefore',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Value Before CZK',
      dataIndex: 'valueBeforeCZK',
      key: 'valueBeforeCZK',
      colSpan: 0,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Transaction CZK',
      dataIndex: 'transactionCZK',
      key: 'transactionCZK',
      colSpan: 0,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Value After',
      dataIndex: 'valueAfter',
      key: 'valueAfter',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Value After CZK',
      dataIndex: 'valueAfterCZK',
      key: 'valueAfterCZK',
      colSpan: 0,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Cumulative Transactions',
      dataIndex: 'cumulativeTransactions',
      key: 'cumulativeTransactions',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, account.currencyId)}</div>,
    },
    {
      title: 'Cumulative Transactions CZK',
      dataIndex: 'cumulativeTransactionsCZK',
      key: 'cumulativeTransactionsCZK',
      colSpan: 0,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
  ];

  const trades = account.history;

  return (
    <Box>
      <Table bordered columns={columns} dataSource={trades} rowKey="id" />
    </Box>
  );
};

export default AccountHistoryTable;
