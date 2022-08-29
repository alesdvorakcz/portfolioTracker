import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CurrencyDetail, CurrencyValueHistory } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  currency: CurrencyDetail;
}

const CurrencyValueHistoryTable: React.FC<Props> = ({ currency }) => {
  const columns: ColumnType<CurrencyValueHistory>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Conversion Rate',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
  ];

  return (
    <Box>
      <Table bordered columns={columns} dataSource={currency.history} rowKey="id" />
    </Box>
  );
};

export default CurrencyValueHistoryTable;
