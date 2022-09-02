import { List } from 'antd';

import { Etf } from '../../../api/models';
import { Box } from '../../../components';
import { EtfData } from '../../../contexts/tradesContext';
import EtfCard from './EtfCard';

interface Props {
  etfs: Etf[];
  etfData: EtfData;
}

const EtfList: React.FC<Props> = ({ etfs, etfData }) => {
  const data = etfs?.map((etf) => ({
    id: etf.id,
    etf: etf,
    etfWithTrades: etfData.etfs.find((x) => x.id === etf.id),
  }));

  return (
    <Box>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 3,
        }}
        dataSource={data}
        rowKey="id"
        renderItem={({ etf, etfWithTrades }) => (
          <List.Item>
            <EtfCard etf={etf} etfWithTrades={etfWithTrades} />
          </List.Item>
        )}
      />
    </Box>
  );
};

export default EtfList;
