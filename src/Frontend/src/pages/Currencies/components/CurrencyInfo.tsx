import { Descriptions } from 'antd';

import { CurrencyDetail } from '../../../api/models';
import { Box } from '../../../components';

interface Props {
  currency: CurrencyDetail;
}

const CurrencyInfo: React.FC<Props> = ({ currency }) => {
  return (
    <Box>
      <Descriptions title="Info" column={1}>
        <Descriptions.Item label="Id">{currency.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{currency.name}</Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default CurrencyInfo;
