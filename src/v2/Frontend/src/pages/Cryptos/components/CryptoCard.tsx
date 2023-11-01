import { Card, Statistic } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { Crypto } from '../../../api/models';
import { CryptoWithHistory } from '../../../contexts/tradesContext';
import { toCurrencyFormat, toNumberFormat } from '../../../i18n';

interface Props {
  crypto: Crypto;
  history?: CryptoWithHistory;
}

const CryptoCard: React.FC<Props> = ({ crypto, history }) => {
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
          title="Coin Value"
          value={toCurrencyFormat(crypto.lastValue?.value, crypto.currencyId)}
        />
      )}
      {history && (
        <>
          <Statistic
            title="Portfolio Value"
            value={toCurrencyFormat(history.value, crypto.currencyId)}
          />
          <Statistic title="Units" value={toNumberFormat(history.unitsTotal)} />
        </>
      )}
    </Card>
  );
};

export default CryptoCard;
