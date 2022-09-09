import { Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import RealEstateDetailInfo from './components/RealEstateDetailInfo';
import RealEstateHistoryChart from './components/RealEstateHistoryChart';
import RealEstateHistoryTable from './components/RealEstateHistoryTable';

const { TabPane } = Tabs;

interface Props {}

const RealEstateDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tradesData } = useTradesContext();
  const { realEstateData } = tradesData;

  const realEstate = realEstateData.realEstates.find((x) => x.id === id);

  return (
    <PageWrapper
      title={realEstate?.name || 'Real Estate Detail'}
      subtitle={realEstate?.id || 'Real Estate Detail'}
      goBack={() => navigate(-1)}
    >
      <>
        {realEstate && (
          <>
            <RealEstateDetailInfo realEstate={realEstate} />
            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <RealEstateHistoryTable realEstate={realEstate} />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <RealEstateHistoryChart realEstate={realEstate} />
              </TabPane>
            </Tabs>
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default RealEstateDetailPage;
