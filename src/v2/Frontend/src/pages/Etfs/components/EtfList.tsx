import { Alert, List } from 'antd';

import { Box, LoadingIndicator } from '../../../components';
import { useEtfsQuery } from '../queries';
import EtfCard from './EtfCard';

interface Props {}

const EtfList: React.FC<Props> = () => {
  const query = useEtfsQuery();

  return (
    <Box>
      <>
        {query.isLoading && <LoadingIndicator />}
        {query.error && <Alert message={(query.error as any).message} type="error" />}
        {query.isSuccess && (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            dataSource={query.data}
            rowKey="id"
            renderItem={(item) => (
              <List.Item>
                <EtfCard etf={item} />
              </List.Item>
            )}
          />
        )}
      </>
    </Box>
  );
};

export default EtfList;
