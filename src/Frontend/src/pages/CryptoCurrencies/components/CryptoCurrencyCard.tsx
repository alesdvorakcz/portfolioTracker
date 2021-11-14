import { Card } from 'antd';
import { useHistory } from 'react-router';

import { CryptoCurrency } from '../../../api/models';

const { Meta } = Card;

interface Props {
  cryptoCurrency: CryptoCurrency;
}

const CryptoCurrencyCard: React.FC<Props> = ({ cryptoCurrency }) => {
  const history = useHistory();

  return (
    <Card
      style={{}}
      hoverable
      onClick={() => history.push(`/cryptoCurrencies/${cryptoCurrency.id}`)}
    >
      <Meta
        title={cryptoCurrency.name}
        // description={cryptoCurrency.conversionRate?.toLocaleString(DEFAULT_LOCALE, {
        //   style: 'currency',
        //   currency: DEFAULT_CURRENCY,
        // })}
      />
    </Card>
  );
};

export default CryptoCurrencyCard;
