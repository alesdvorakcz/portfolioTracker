import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { EtfDetailHistoryRow, EtfDetailWithTrades } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toNumberFormat } from '../../../i18n';

interface Props {
  etf: EtfDetailWithTrades;
}

const EtfTradesHistoryTable: React.FC<Props> = ({ etf }) => {
  const columns: ColumnType<EtfDetailHistoryRow>[] = [
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
      render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
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
      title: 'Units Change',
      dataIndex: 'unitsChange',
      key: 'unitsChange',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
    },
    {
      title: 'Units Total',
      dataIndex: 'unitsTotal',
      key: 'unitsTotal',
      align: 'right',
      render: (text: string) => <div>{toNumberFormat(text)}</div>,
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
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
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
    },
  ];

  const trades = etf.history.filter((x) => x.transaction > 0) ?? [];

  return (
    <Box>
      <Table bordered columns={columns} dataSource={trades} rowKey="id" />
    </Box>
  );
};

export default EtfTradesHistoryTable;
