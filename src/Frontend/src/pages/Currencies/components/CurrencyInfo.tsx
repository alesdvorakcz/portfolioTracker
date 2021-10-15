import { Descriptions } from 'antd';

import { CurrencyDetail } from '../../../api/models';
import { Box } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  currency: CurrencyDetail;
}

const CurrencyInfo: React.FC<Props> = ({ currency }) => {
  return (
    <Box>
      <Descriptions title="Info" column={1}>
        <Descriptions.Item label="Id">{currency.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{currency.name}</Descriptions.Item>
        <Descriptions.Item label="Conversion Rate">
          {currency.conversionRate?.toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY,
          })}
        </Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default CurrencyInfo;
