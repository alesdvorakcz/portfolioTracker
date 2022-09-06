import { Card, Statistic } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { Crypto } from '../../../api/models';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  crypto: Crypto;
}

const CryptoCard: React.FC<Props> = ({ crypto }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{}}
      hoverable
      onClick={() => navigate(`/cryptos/coins/${crypto.id}`)}
      title={crypto.name}
      extra={crypto.lastValue && moment(crypto.lastValue.date).format('l')}
    >
      {crypto.lastValue && (
        <Statistic
          title="Value"
          value={toCurrencyFormat(crypto.lastValue?.value, crypto.currencyId)}
        />
      )}
    </Card>
  );
};

export default CryptoCard;
