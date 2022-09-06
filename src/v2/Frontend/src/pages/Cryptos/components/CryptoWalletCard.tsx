import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { useNavigate } from 'react-router';

import { CryptoWallet } from '../../../api/models';
import { DEFAULT_CURRENCY, toCurrencyFormat, toPercentFormat } from '../../../i18n';

interface Props {
  wallet: CryptoWallet;
}

const CryptoWalletCard: React.FC<Props> = ({ wallet }) => {
  const navigate = useNavigate();

  const isSameCurrency = wallet.crypto.currencyId === DEFAULT_CURRENCY;
  let valueText = toCurrencyFormat(wallet.value, wallet.crypto.currencyId);

  if (!isSameCurrency && !!wallet?.valueCZK) {
    valueText += ` / ${toCurrencyFormat(wallet.valueCZK)}`;
  }

  const gain =
    wallet.valueCZK && wallet.cumulativeTransactionsCZK
      ? wallet.valueCZK / wallet.cumulativeTransactionsCZK - 1
      : null;

  const isGainPositive = gain && gain > 0;

  return (
    <Card title={wallet.name} hoverable onClick={() => navigate(`/cryptos/wallet/${wallet.id}`)}>
      <Statistic title="Value" value={valueText} />
      <Statistic
        title="Profit"
        prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
        value={toPercentFormat(gain ?? 0)}
      />
    </Card>
  );
};

export default CryptoWalletCard;
