import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { RealEstate, RealEstateHistory } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  realEstate: RealEstate;
}

const RealEstateHistoryTable: React.FC<Props> = ({ realEstate }) => {
  const columns: ColumnType<RealEstateHistory>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{moment.utc(text).format('l')}</div>,
    },
    {
      title: 'Income',
      dataIndex: 'income',
      key: 'income',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Cumulative Income',
      dataIndex: 'cumulativeIncome',
      key: 'cumulativeIncome',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Remaining Mortage',
      dataIndex: 'remainingMortage',
      key: 'remainingMortage',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Estimated Price',
      dataIndex: 'estimatedPrice',
      key: 'estimatedPrice',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Own Value',
      dataIndex: 'ownValue',
      key: 'ownValue',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
    {
      title: 'Total Value Including Income',
      dataIndex: 'totalValueIncludingIncome',
      key: 'totalValueIncludingIncome',
      align: 'right',
      render: (text: string) => <div>{toCurrencyFormat(text)}</div>,
    },
  ];

  const trades = realEstate.history;

  return (
    <Box>
      <Table bordered columns={columns} dataSource={trades} rowKey="id" />
    </Box>
  );
};

export default RealEstateHistoryTable;
