import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import {
  EtfDetail,
  EtfDetailHistoryRow,
  EtfDetailWithTrades,
  EtfValueHistory,
} from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  etfWithTrades?: EtfDetailWithTrades;
  etf: EtfDetail;
}

const EtfValueHistoryTable: React.FC<Props> = ({ etf, etfWithTrades }) => {
  if (etfWithTrades) {
    const columns: ColumnType<EtfDetailHistoryRow>[] = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
      },
      {
        title: 'Value',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        align: 'right',
        render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
      },
    ];

    return (
      <Box>
        <Table bordered columns={columns} dataSource={etfWithTrades.history} rowKey="id" />
      </Box>
    );
  }

  const columns: ColumnType<EtfValueHistory>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text, etf.currencyId)}</div>,
    },
  ];

  return (
    <Box>
      <Table bordered columns={columns} dataSource={etf.history} rowKey="id" />
    </Box>
  );
};

export default EtfValueHistoryTable;
