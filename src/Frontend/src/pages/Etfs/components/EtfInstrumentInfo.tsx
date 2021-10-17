import { Currency, EtfInstrumentDetail } from '../../../api/models';
import { Box } from '../../../components';

interface Props {
  etfInstrument: EtfInstrumentDetail;
  currency?: Currency;
}

const EtfInstrumentInfo: React.FC<Props> = ({ etfInstrument }) => {
  return (
    <Box>
      {etfInstrument.name}
      {/* <Row>
        <Col xs={24} md={12}>
          <Statistic title="Last Value" value={etfInstrument} />
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Profit"
            prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
            value={
              gain?.toLocaleString(DEFAULT_LOCALE, {
                style: 'percent',
                minimumFractionDigits: 2,
              }) ?? '???'
            }
          />
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Total Transaction"
            value={
              account.transactionsCZKTotal &&
              account.transactionsCZKTotal.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })
            }
          />
        </Col>
      </Row> */}
    </Box>
  );
};

export default EtfInstrumentInfo;
