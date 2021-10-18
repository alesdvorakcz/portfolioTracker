import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { Currency, EtfInstrumentDetail, EtfTradeHistory } from '../../../api/models';
import { DeleteConfirm, FlexRow } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfInstrument: EtfInstrumentDetail;
  currency?: Currency;
  onEditClick: (item: EtfTradeHistory) => void;
  onDeleteClick: (item: EtfTradeHistory) => Promise<void>;
  onAddClick: () => void;
}

const ValueHistoryTable: React.FC<Props> = ({
  etfInstrument,
  currency,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const columns: ColumnType<EtfTradeHistory>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      colSpan: 2,
      align: 'right',
      render: (text: string) => <div>{parseInt(text).toLocaleString(DEFAULT_LOCALE)}</div>,
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
          Add trade
        </Button>
      </FlexRow>
      <Table bordered columns={columns} dataSource={etfInstrument.tradeHistory} rowKey="id" />
    </>
  );
};

export default ValueHistoryTable;
