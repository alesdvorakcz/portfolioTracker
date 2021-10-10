import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { AccountDetail, AccountValueHistory, Currency } from '../../../api/models';
import { DeleteConfirm, FlexRow } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  account: AccountDetail;
  currency?: Currency;
  onEditClick: (item: AccountValueHistory) => void;
  onDeleteClick: (item: AccountValueHistory) => Promise<void>;
  onAddClick: () => void;
}

const AccountValueHistoryTable: React.FC<Props> = ({
  account,
  currency,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
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
      colSpan: 2,
      align: 'right',
      render: (text: string) => (
        <div>
          {parseFloat(text).toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: currency?.id ?? DEFAULT_CURRENCY,
          })}
        </div>
      ),
    },
    {
      title: 'Value Before CZK',
      dataIndex: 'valueBeforeCZK',
      key: 'valueBeforeCZK',
      colSpan: 0,
      align: 'right',
      render: (text: string) => (
        <div>
          {parseInt(text, 10).toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY,
          })}
        </div>
      ),
    },
    {
      title: 'Transaction',
      dataIndex: 'transactionCzk',
      key: 'transactionCzk',
      align: 'right',
      render: (text: string) => (
        <div>
          {parseInt(text, 10).toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY,
          })}
        </div>
      ),
    },
    {
      title: 'Value After',
      dataIndex: 'valueAfter',
      key: 'valueAfter',
      colSpan: 2,
      align: 'right',
      render: (text: string) => (
        <div>
          {parseInt(text, 10).toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: currency?.id ?? DEFAULT_CURRENCY,
          })}
        </div>
      ),
    },
    {
      title: 'Value After CZK',
      dataIndex: 'valueAfterCZK',
      key: 'valueAfterCZK',
      colSpan: 0,
      align: 'right',
      render: (text: string) => (
        <div>
          {parseInt(text, 10).toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY,
          })}
        </div>
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
    <>
      <FlexRow align="right" marginBottom>
        <Button type="primary" onClick={onAddClick}>
          Add Value
        </Button>
      </FlexRow>
      <Table bordered columns={columns} dataSource={account.history} rowKey="id" />
    </>
  );
};

export default AccountValueHistoryTable;
