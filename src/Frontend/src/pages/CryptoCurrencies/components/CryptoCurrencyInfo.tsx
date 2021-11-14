import { Descriptions } from 'antd';

import { CryptoCurrencyDetail } from '../../../api/models';
import { Box } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  cryptoCurrency: CryptoCurrencyDetail;
}

const CryptoCurrencyInfo: React.FC<Props> = ({ cryptoCurrency }) => {
  return (
    <Box>
      <Descriptions title="Info" column={1}>
        <Descriptions.Item label="Id">{cryptoCurrency.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{cryptoCurrency.name}</Descriptions.Item>
        <Descriptions.Item label="Conversion Rate EUR">
          {cryptoCurrency.converstionRateEUR?.toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY, //TODO
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Conversion Rate USD">
          {cryptoCurrency.converstionRateUSD?.toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY, //TODO
          })}
        </Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default CryptoCurrencyInfo;
