import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CurrencyDetail, CurrencyValueHistory } from '../../../api/models';
import { Box, DeleteConfirm, FlexRow } from '../../../components';

interface Props {
  currency: CurrencyDetail;
  onAddClick: () => void;
  onEditClick: (item: CurrencyValueHistory) => void;
  onDeleteClick: (item: CurrencyValueHistory) => Promise<void>;
}

const CurrencyValueHistoryTable: React.FC<Props> = ({
  currency,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
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
      render: (_text, record) => (
        <Space>
          <Button onClick={() => onEditClick(record)}>Edit</Button>
          <DeleteConfirm onDelete={() => onDeleteClick(record)}>
            <Button>Delete</Button>
          </DeleteConfirm>
        </Space>
      ),
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
