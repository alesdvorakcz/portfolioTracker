import { Col, Row } from 'antd';

import { PageWrapper, QueryWrapper } from '../../components';
import DashboardAccountsPie from './components/DashboardAccountsPie';
import DashboardAssedClassesPie from './components/DashboardAssetClassesPie';
import DashboardHistoryChart from './components/DashboardHistoryChart';
import { useGetDashboardDataQuery } from './queries';

interface Props {}

const DashboardPage: React.FC<Props> = () => {
  const query = useGetDashboardDataQuery();

  return (
    <PageWrapper title="Dashboard">
      <QueryWrapper
        query={query}
        render={(data) => (
          <>
            <DashboardHistoryChart dashboardData={data} />
            <Row>
              <Col md={12}>
                <DashboardAccountsPie dashboardData={data} />
              </Col>
              <Col md={12}>
                <DashboardAssedClassesPie dashboardData={data} />
              </Col>
            </Row>
          </>
        )}
      />
    </PageWrapper>
  );
};

export default DashboardPage;
