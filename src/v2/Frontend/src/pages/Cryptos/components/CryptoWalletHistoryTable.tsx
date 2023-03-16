import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CryptoWallet, CryptoWalletHistoryRow } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toNumberFormat } from '../../../i18n';

interface Props {
  wallet: CryptoWallet;
}

const CryptoWalletHistoryTable: React.FC<Props> = ({ wallet }) => {
  const columns: ColumnType<CryptoWalletHistoryRow>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Units Change',
      dataIndex: 'unitsChange',
      key: 'unitsChange',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Units Total',
      dataIndex: 'unitsTotal',
      key: 'unitsTotal',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, wallet.crypto.currencyId)}</div>,
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
      title: 'Staked Units',
      dataIndex: 'stakedUnits',
      key: 'stakedUnits',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Staked Units Total',
      dataIndex: 'cumulativeStakedUnits',
      key: 'cumulativeStakedUnits',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Value After',
      dataIndex: 'valueAfter',
      key: 'valueBefore',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, wallet.crypto.currencyId)}</div>,
    },
    {
      title: 'Value After CZK',
      dataIndex: 'valueAfterCZK',
      key: 'valueBeforeCZK',
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
      render: (text: string) => <div>{toCurrencyFormat(text, wallet.crypto.currencyId)}</div>,
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

  const trades = wallet.history.filter((x) => x.unitsChange > 0 || x.stakedUnits > 0);

  return (
    <Box>
      <Table bordered columns={columns} dataSource={trades} rowKey="id" />
    </Box>
  );
};

export default CryptoWalletHistoryTable;
