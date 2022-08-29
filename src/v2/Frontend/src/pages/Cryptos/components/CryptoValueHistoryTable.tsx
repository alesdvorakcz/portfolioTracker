import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CryptoDetail, CryptoValueHistory } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  crypto: CryptoDetail;
}

const CryptoValueHistoryTable: React.FC<Props> = ({ crypto }) => {
  const columns: ColumnType<CryptoValueHistory>[] = [
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
      render: (text: string) => <div>{toCurrencyFormat(text, crypto.currencyId)}</div>,
    },
  ];

  return (
    <Box>
      <Table bordered columns={columns} dataSource={crypto.history} rowKey="id" />
    </Box>
  );
};

export default CryptoValueHistoryTable;
