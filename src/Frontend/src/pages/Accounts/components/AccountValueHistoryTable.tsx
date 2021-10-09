import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { AccountDetail, AccountValueHistory } from '../../../api/models';
import { Box, FlexRow } from '../../../components';

interface Props {
  account: AccountDetail;
  onEditClick: (item: AccountValueHistory) => void;
  onAddClick: () => void;
}

const AccountValueHistoryTable: React.FC<Props> = ({ account, onAddClick, onEditClick }) => {
  const columns: ColumnType<AccountValueHistory>[] = [
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
      align: 'right',
      render: (text: string) => <div>{parseInt(text, 10).toLocaleString('cs-CZ')}</div>,
    },
    {
      title: 'Transaction CZK',
      dataIndex: 'transactionCzk',
      key: 'transactionCzk',
      align: 'right',
      render: (text: string) => <div>{parseInt(text, 10).toLocaleString('cs-CZ')} Kč</div>,
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
      <Table bordered columns={columns} dataSource={account.history} rowKey="id" />
    </Box>
  );
};

export default AccountValueHistoryTable;
