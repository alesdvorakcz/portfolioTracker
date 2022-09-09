import { List } from 'antd';

import { Box } from '../../../components';
import { RealEstateData } from '../../../contexts/tradesContext';
import RealEstateCard from './RealEstateCard';

interface Props {
  realEstateData: RealEstateData;
}

const RealEstatesList: React.FC<Props> = ({ realEstateData }) => {
  return (
    <Box>
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
        dataSource={realEstateData.realEstates}
        rowKey="id"
        renderItem={(realEstate) => (
          <List.Item>
            <RealEstateCard realEstate={realEstate} />
          </List.Item>
        )}
      />
    </Box>
  );
};

export default RealEstatesList;
