import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CryptoCurrencyTrade, CryptoCurrencyWalletDetail } from '../../../api/models';
import { Box, DeleteConfirm, FlexRow } from '../../../components';

interface Props {
  wallet: CryptoCurrencyWalletDetail;
  onAddClick: () => void;
  onEditClick: (item: CryptoCurrencyTrade) => void;
  onDeleteClick: (item: CryptoCurrencyTrade) => Promise<void>;
}

const CryptoWalletTradesTable: React.FC<Props> = ({
  wallet,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const columns: ColumnType<CryptoCurrencyTrade>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Change EUR',
      dataIndex: 'changeEUR',
      key: 'changeEUR',
      align: 'right',
      render: (text: string) => (
        <div>{Intl.NumberFormat('cs-CZ', { style: 'decimal' }).format(parseFloat(text))}</div>
      ),
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      align: 'right',
      render: (text: string) => (
        <div>{Intl.NumberFormat('cs-CZ', { style: 'decimal' }).format(parseFloat(text))}</div>
      ),
    },
    {
      title: 'Amount After',
      dataIndex: 'amountAfter',
      key: 'amountAfter',
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
          Add Trade
        </Button>
      </FlexRow>
      <Table bordered columns={columns} dataSource={wallet.trades} rowKey="id" />
    </Box>
  );
};

export default CryptoWalletTradesTable;
