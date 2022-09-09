import { Col, Row, Statistic } from 'antd';

import { RealEstate } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toPercentFormat } from '../../../i18n';

interface Props {
  realEstate: RealEstate;
}

const RealEstateDetailInfo: React.FC<Props> = ({ realEstate }) => {
  const gainOwn = realEstate.ownValue / realEstate.ownStartingCapital - 1;
  const gainTotal = realEstate.totalValue / realEstate.startingPrice - 1;
  const gainWithIncome =
    (realEstate.ownValue + realEstate.totalIncome) / realEstate.ownStartingCapital - 1;

  return (
    <Box>
      <Row>
        <Col xs={24} md={8}>
          <Statistic title="Starting Price" value={toCurrencyFormat(realEstate.startingPrice)} />
        </Col>
        <Col xs={12} md={8}>
          <Statistic
            title="Own Starting Capital"
            value={toCurrencyFormat(realEstate.ownStartingCapital)}
          />
        </Col>
        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
          <Statistic
            title="Mortage LTV"
            value={toPercentFormat(1 - realEstate.ownStartingCapital / realEstate.startingPrice)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <Statistic title="Total Value" value={toCurrencyFormat(realEstate.totalValue)} />
        </Col>
        <Col xs={12} md={8}>
          <Statistic title="Own Value" value={toCurrencyFormat(realEstate.ownValue)} />
        </Col>
        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
          <Statistic title="Income" value={toCurrencyFormat(realEstate.totalIncome)} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <Statistic title="Own Gain" value={toPercentFormat(gainOwn)} />
        </Col>
        <Col xs={24} md={8}>
          <Statistic title="Total Gain" value={toPercentFormat(gainTotal)} />
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
          <Statistic title="Own Gain With Income" value={toPercentFormat(gainWithIncome)} />
        </Col>
      </Row>
    </Box>
  );
};

export default RealEstateDetailInfo;
