import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { CryptoCurrencyDetail, CryptoCurrencyValueHistory } from '../../../api/models';
import { Box, FlexRow } from '../../../components';

interface Props {
  cryptoCurrency: CryptoCurrencyDetail;
  // onEditClick: (item: CryptoCurrencyValueHistory) => void;
  // onAddClick: () => void;
}

const CryptoCurrencyValueHistoryTable: React.FC<Props> = ({
  cryptoCurrency,
  // onAddClick,
  // onEditClick,
}) => {
  const columns: ColumnType<CryptoCurrencyValueHistory>[] = [
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
    // {
    //   title: '',
    //   key: 'action',
    //   render: (_text, record) => <Button onClick={() => onEditClick(record)}>Edit</Button>,
    // },
  ];

  return (
    <Box>
      <FlexRow align="right" marginBottom>
        <Button
          type="primary"
          // onClick={onAddClick}
        >
          Add Value
        </Button>
      </FlexRow>
      <Table bordered columns={columns} dataSource={cryptoCurrency.history} rowKey="id" />
    </Box>
  );
};

export default CryptoCurrencyValueHistoryTable;
