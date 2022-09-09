import { Col, Row, Statistic } from 'antd';

import { Box, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import { toCurrencyFormat, toPercentFormat } from '../../i18n';
import RealEstatesList from './components/RealEstatesList';

interface Props {}

const RealEstatesPage: React.FC<Props> = () => {
  const { tradesData } = useTradesContext();
  const { realEstateData } = tradesData;

  const ownStartingCapital = realEstateData.realEstates.reduce(
    (acc, x) => acc + x.ownStartingCapital,
    0
  );
  const startingPrice = realEstateData.realEstates.reduce((acc, x) => acc + x.startingPrice, 0);

  const gainOwn = realEstateData.ownValue / ownStartingCapital - 1;
  const gainTotal = realEstateData.totalValue / startingPrice - 1;
  const gainWithIncome =
    (realEstateData.ownValue + realEstateData.totalIncome) / ownStartingCapital - 1;

  return (
    <PageWrapper title="Real Estates">
      <>
        <Box>
          <Row>
            <Col md={8}>
              <Statistic title="Total Value" value={toCurrencyFormat(realEstateData.totalValue)} />
            </Col>
            <Col md={8}>
              <Statistic title="Own Value" value={toCurrencyFormat(realEstateData.ownValue)} />
            </Col>
            <Col md={8} style={{ textAlign: 'right' }}>
              <Statistic
                title="Remaining Mortage"
                value={toCurrencyFormat(realEstateData.remainingMortage)}
              />
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
        <RealEstatesList realEstateData={realEstateData} />
      </>
    </PageWrapper>
  );
};

export default RealEstatesPage;
