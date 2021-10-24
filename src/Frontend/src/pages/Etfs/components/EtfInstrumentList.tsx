import { List } from 'antd';

import { Currency, EtfInstrument } from '../../../api/models';
import { Box } from '../../../components';
import EtfInstrumentCard from './EtfInstrumentCard';

interface Props {
  etfInstruments: EtfInstrument[];
  currencies?: Currency[];
}

const EtfInstrumentList: React.FC<Props> = ({ etfInstruments, currencies }) => {
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
        dataSource={etfInstruments}
        rowKey="id"
        renderItem={(item) => {
          const currency = currencies?.find((x) => x.id === item.currencyId);

          return (
            <List.Item>
              <EtfInstrumentCard etfInstrument={item} currency={currency} />
            </List.Item>
          );
        }}
      />
    </Box>
  );
};

export default EtfInstrumentList;
