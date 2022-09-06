import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { Etf, EtfDetailWithTrades } from '../../../api/models';
import { DEFAULT_CURRENCY, toCurrencyFormat, toPercentFormat } from '../../../i18n';

interface Props {
  etf: Etf;
  etfWithTrades?: EtfDetailWithTrades;
}

const EtfCard: React.FC<Props> = ({ etf, etfWithTrades }) => {
  const navigate = useNavigate();

  const isSameCurrency = etf.currencyId === DEFAULT_CURRENCY;
  let valueText = toCurrencyFormat(etfWithTrades?.value, etfWithTrades?.currencyId);

  if (!isSameCurrency && !!etfWithTrades?.valueCZK) {
    valueText += ` / ${toCurrencyFormat(etfWithTrades.valueCZK)}`;
  }

  const gain =
    etfWithTrades?.valueCZK && etfWithTrades?.cumulativeTransactionsCZK
      ? etfWithTrades.valueCZK / etfWithTrades.cumulativeTransactionsCZK - 1
      : null;

  const isGainPositive = gain && gain > 0;

  const lastPrice = !!etfWithTrades?.history.length ? etfWithTrades.history[0] : undefined;

  return (
    <Card title={etf.name} extra={etf.ticker} hoverable onClick={() => navigate(`/etfs/${etf.id}`)}>
      {etfWithTrades && (
        <>
          <Statistic title="Value" value={valueText} />
          <Statistic
            title="Profit"
            prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
            value={toPercentFormat(gain ?? 0)}
          />
          <Statistic
            title="UnitPrice"
            value={
              lastPrice &&
              `${toCurrencyFormat(lastPrice.unitPrice, etf.currencyId)} (${moment
                .utc(lastPrice.date)
                .format('l')})`
            }
          />
        </>
      )}
    </Card>
  );
};

export default EtfCard;
