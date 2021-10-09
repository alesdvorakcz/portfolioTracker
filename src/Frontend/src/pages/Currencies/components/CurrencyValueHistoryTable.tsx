import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CurrencyDetail, CurrencyValueHistory } from '../../../api/models';
import { Box, FlexRow } from '../../../components';

interface Props {
  currency: CurrencyDetail;
  onEditClick: (item: CurrencyValueHistory) => void;
  onAddClick: () => void;
}

const CurrencyValueHistoryTable: React.FC<Props> = ({ currency, onAddClick, onEditClick }) => {
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
      render: (text: string) => (
        <div>{Intl.NumberFormat('cs-CZ', { style: 'decimal' }).format(parseFloat(text))}</div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_text, record) => <Button onClick={() => onEditClick(record)}>Edit</Button>,
    },
  ];

  return (
    <Box>
      <FlexRow align="right" marginBottom>
        <Button type="primary" onClick={onAddClick}>
          Add Value
        </Button>
      </FlexRow>
      <Table bordered columns={columns} dataSource={currency.history} rowKey="id" />
    </Box>
  );
};

export default CurrencyValueHistoryTable;
