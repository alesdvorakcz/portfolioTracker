import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CurrencyDetail, CurrencyValueHistory } from '../../../api/models';

interface Props {
  currency: CurrencyDetail;
  onEditClick: (item: CurrencyValueHistory) => void;
}

const CurrencyValueHistoryTable: React.FC<Props> = ({ currency, onEditClick }) => {
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
      render: (text: string) => <div>{parseInt(text, 10).toLocaleString('cs-CZ')}</div>,
    },
    {
      title: '',
      key: 'action',
      render: (_text, record) => <Button onClick={() => onEditClick(record)}>Edit</Button>,
    },
  ];

  return <Table bordered columns={columns} dataSource={currency.history} rowKey="id" />;
};

export default CurrencyValueHistoryTable;
