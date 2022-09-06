import { Card, Statistic } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { Currency } from '../../../api/models';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  currency: Currency;
}

const CurrencyCard: React.FC<Props> = ({ currency }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{}}
      hoverable
      onClick={() => navigate(`/currencies/${currency.id}`)}
      title={currency.name}
      extra={currency.lastValue && moment(currency.lastValue.date).format('l')}
    >
      {currency.lastValue && (
        <Statistic title="Value" value={toCurrencyFormat(currency.lastValue?.conversionRate)} />
      )}
    </Card>
  );
};

export default CurrencyCard;
