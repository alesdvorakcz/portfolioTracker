import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CryptoCurrencyDetail, CryptoCurrencyValueHistory } from '../../../api/models';
import { Box, DeleteConfirm, FlexRow } from '../../../components';

interface Props {
  cryptoCurrency: CryptoCurrencyDetail;
  onEditClick: (item: CryptoCurrencyValueHistory) => void;
  onDeleteClick: (item: CryptoCurrencyValueHistory) => Promise<void>;
  onAddClick: () => void;
}

const CryptoCurrencyValueHistoryTable: React.FC<Props> = ({
  cryptoCurrency,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const columns: ColumnType<CryptoCurrencyValueHistory>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Conversion Rate EUR',
      dataIndex: 'conversionRateEUR',
      key: 'conversionRateEUR',
      align: 'right',
      render: (text: string) => (
        <div>{Intl.NumberFormat('cs-CZ', { style: 'decimal' }).format(parseFloat(text))}</div>
      ),
    },
    {
      title: 'Conversion Rate USD',
      dataIndex: 'conversionRateUSD',
      key: 'conversionRateUSD',
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
      <Table bordered columns={columns} dataSource={cryptoCurrency.history} rowKey="id" />
    </Box>
  );
};

export default CryptoCurrencyValueHistoryTable;
