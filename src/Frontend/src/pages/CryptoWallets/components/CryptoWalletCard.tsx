import { Card } from 'antd';
import { useHistory } from 'react-router';

import { CryptoCurrencyWallet } from '../../../api/models';

const { Meta } = Card;

interface Props {
  wallet: CryptoCurrencyWallet;
}

const CryptoWalletCard: React.FC<Props> = ({ wallet }) => {
  const history = useHistory();

  return (
    <Card style={{}} hoverable onClick={() => history.push(`/cryptoWallets/${wallet.id}`)}>
      <Meta
        title={wallet.name}
        // description={cryptoCurrency.conversionRate?.toLocaleString(DEFAULT_LOCALE, {
        //   style: 'currency',
        //   currency: DEFAULT_CURRENCY,
        // })}
      />
    </Card>
  );
};

export default CryptoWalletCard;
