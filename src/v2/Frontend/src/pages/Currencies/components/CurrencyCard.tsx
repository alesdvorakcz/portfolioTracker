import { Card } from 'antd';
import { useNavigate } from 'react-router';

import { Currency } from '../../../api/models';
// import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

const { Meta } = Card;

interface Props {
  currency: Currency;
}

const CurrencyCard: React.FC<Props> = ({ currency }) => {
  const navigate = useNavigate();

  return (
    <Card style={{}} hoverable onClick={() => navigate(`/currencies/${currency.id}`)}>
      <Meta
        title={currency.name}
        // description={currency.conversionRate?.toLocaleString(DEFAULT_LOCALE, {
        //   style: 'currency',
        //   currency: DEFAULT_CURRENCY,
        // })}
      />
    </Card>
  );
};

export default CurrencyCard;
