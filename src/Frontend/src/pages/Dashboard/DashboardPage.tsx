import { useState } from 'react';

import { Box, FlexRow, PageWrapper, QueryWrapper, RadioButtonSwitch } from '../../components';
import DashboardAccountsPie from './components/DashboardAccountsPie';
import DashboardAssedClassesPie from './components/DashboardAssetClassesPie';
import DashboardHistoryChart from './components/DashboardHistoryChart';
import DashboardTotalHistoryChart from './components/DashboardTotalHistoryChart';
import { useGetDashboardDataQuery } from './queries';

interface Props {}

const DashboardPage: React.FC<Props> = () => {
  const query = useGetDashboardDataQuery();
  const [all, setAll] = useState(false);
  const [classes, setClasses] = useState(false);

  return (
    <PageWrapper title="Dashboard">
      <QueryWrapper
        query={query}
        render={(data) => (
          <>
            <Box>
              <FlexRow align="right">
                <RadioButtonSwitch
                  items={[
                    { id: 'accounts', label: 'Účty' },
                    { id: 'all', label: 'Celkem' },
                  ]}
                  defaultValue="accounts"
                  onChange={(x) => setAll(x === 'all')}
                />
              </FlexRow>
              {all ? (
                <DashboardTotalHistoryChart dashboardData={data} />
              ) : (
                <DashboardHistoryChart dashboardData={data} />
              )}
            </Box>
            <Box>
              <FlexRow align="right">
                <RadioButtonSwitch
                  items={[
                    { id: 'accounts', label: 'Účty' },
                    { id: 'classes', label: 'Kategorie' },
                  ]}
                  defaultValue="accounts"
                  onChange={(x) => setClasses(x === 'classes')}
                />
              </FlexRow>
              {classes ? (
                <DashboardAssedClassesPie dashboardData={data} />
              ) : (
                <DashboardAccountsPie dashboardData={data} />
              )}
            </Box>
          </>
        )}
      />
    </PageWrapper>
  );
};

export default DashboardPage;
