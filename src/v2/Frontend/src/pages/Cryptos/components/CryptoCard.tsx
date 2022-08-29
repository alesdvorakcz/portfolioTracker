import { Card } from 'antd';
import { useNavigate } from 'react-router';

import { Crypto } from '../../../api/models';
// import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

const { Meta } = Card;

interface Props {
  crypto: Crypto;
}

const CryptoCard: React.FC<Props> = ({ crypto }) => {
  const navigate = useNavigate();

  return (
    <Card style={{}} hoverable onClick={() => navigate(`/cryptos/${crypto.id}`)}>
      <Meta title={crypto.name} />
    </Card>
  );
};

export default CryptoCard;
