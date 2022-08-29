import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { EtfDetail, EtfValueHistory } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  etf: EtfDetail;
}

const EtfValueHistoryTable: React.FC<Props> = ({ etf }) => {
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
