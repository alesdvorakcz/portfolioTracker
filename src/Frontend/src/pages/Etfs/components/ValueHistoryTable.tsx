import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { Currency, EtfInstrumentDetail, EtfInstrumentValueHistory } from '../../../api/models';
import { DeleteConfirm, FlexRow } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfInstrument: EtfInstrumentDetail;
  currency?: Currency;
  onEditClick: (item: EtfInstrumentValueHistory) => void;
  onDeleteClick: (item: EtfInstrumentValueHistory) => Promise<void>;
  onAddClick: () => void;
}

const ValueHistoryTable: React.FC<Props> = ({
  etfInstrument,
  currency,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const columns: ColumnType<EtfInstrumentValueHistory>[] = [
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
      <Table bordered columns={columns} dataSource={etfInstrument.valueHistory} rowKey="id" />
    </>
  );
};

export default ValueHistoryTable;
