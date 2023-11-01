import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CryptoDetail } from '../../../api/models';
import { CryptoHistoryAggregatedRow, CryptoWithHistory } from '../../../contexts/tradesContext';
import { toCurrencyFormat, toNumberFormat } from '../../../i18n';

interface Props {
  crypto: CryptoDetail;
  history: CryptoWithHistory;
  showInCZK: boolean;
}

const CryptoPortfolioHistoryTable: React.FC<Props> = ({ crypto, history, showInCZK }) => {
  const columns: ColumnType<CryptoHistoryAggregatedRow>[] = [
    {
      title: 'Date',
      dataIndex: 'dateStart',
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
      title: 'Staked Units',
      dataIndex: 'stakedUnits',
      key: 'stakedUnits',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Total Staked Units',
      dataIndex: 'cumulativeStakedUnits',
      key: 'cumulativeStakedUnits',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Total Units',
      dataIndex: 'unitsTotal',
      key: 'unitsTotal',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    // {
    //   title: 'Value Before',
    //   dataIndex: 'valueBefore',
    //   key: 'valueBefore',
    //   align: 'right',
    //   render: (text: string) => <div>{toCurrencyFormat(text, crypto.currencyId)}</div>,
    // },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, crypto.currencyId)}</div>,
    },
    {
      title: 'Total Transactions',
      dataIndex: 'cumulativeTransactions',
      key: 'cumulativeTransactions',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, crypto.currencyId)}</div>,
    },
    {
      title: 'Value After',
      dataIndex: 'valueAfter',
      key: 'valueAfter',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, crypto.currencyId)}</div>,
    },
    // {
    //   title: 'Profit',
    //   dataIndex: 'profit',
    //   key: 'profit',
    //   align: 'right',
    //   colSpan: 2,
    //   render: (text: number) => (
    //     <div style={{ color: getGainColor(text) }}>{toCurrencyFormat(text, crypto.currencyId)}</div>
    //   ),
    // },
    // {
    //   title: 'Profit %',
    //   dataIndex: 'profitPercentage',
    //   key: 'profitPercentage',
    //   align: 'right',
    //   colSpan: 0,
    //   render: (text: number) => (
    //     <div style={{ color: getGainColor(text) }}>
    //       {getGainIcon(text)} {toPercentFormat(text)}
    //     </div>
    //   ),
    // },
    // {
    //   title: 'Cumulative Profit',
    //   dataIndex: 'cumulativeProfit',
    //   key: 'cumulativeProfit',
    //   align: 'right',
    //   render: (text: number) => (
    //     <div style={{ color: getGainColor(text) }}>{toCurrencyFormat(text, crypto.currencyId)}</div>
    //   ),
    // },
  ];

  const columnsCZK: ColumnType<CryptoHistoryAggregatedRow>[] = [
    {
      title: 'Date',
      dataIndex: 'dateStart',
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
      title: 'Staked Units',
      dataIndex: 'stakedUnits',
      key: 'stakedUnits',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Total Staked Units',
      dataIndex: 'cumulativeStakedUnits',
      key: 'cumulativeStakedUnits',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Total Units',
      dataIndex: 'unitsTotal',
      key: 'unitsTotal',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    // {
    //   title: 'Value Before',
    //   dataIndex: 'valueBeforeCZK',
    //   key: 'valueBeforeCZK',
    //   align: 'right',
    //   render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    // },
    {
      title: 'Transaction',
      dataIndex: 'transactionCZK',
      key: 'transactionCZK',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Total Transactions',
      dataIndex: 'cumulativeTransactionsCZK',
      key: 'cumulativeTransactionsCZK',
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
    // {
    //   title: 'Profit',
    //   dataIndex: 'profitCZK',
    //   key: 'profitCZK',
    //   align: 'right',
    //   colSpan: 2,
    //   render: (text: number) => (
    //     <div style={{ color: getGainColor(text) }}>{toCurrencyFormat(text)}</div>
    //   ),
    // },
    // {
    //   title: 'Profit %',
    //   dataIndex: 'profitPercentageCZK',
    //   key: 'profitPercentageCZK',
    //   align: 'right',
    //   colSpan: 0,
    //   render: (text: number) => (
    //     <div style={{ color: getGainColor(text) }}>
    //       {getGainIcon(text)} {toPercentFormat(text)}
    //     </div>
    //   ),
    // },
    // {
    //   title: 'Cumulative Profit',
    //   dataIndex: 'cumulativeProfitCZK',
    //   key: 'cumulativeProfitCZK',
    //   align: 'right',
    //   render: (text: number) => (
    //     <div style={{ color: getGainColor(text) }}>{toCurrencyFormat(text)}</div>
    //   ),
    // },
  ];

  const data = history.allWalletsHistory;

  return (
    <Table
      bordered
      columns={showInCZK ? columnsCZK : columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 50 }}
    />
  );
};

export default CryptoPortfolioHistoryTable;
