import { Skeleton } from 'antd';

import { Box } from '..';

interface Props {
  inBox?: boolean;
}

// <div
//   style={{
//     height: 150,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   }}
// >
//   <Spin tip="Loading..." size="large" />
// </div>

const LoadingIndicator: React.FC<Props> = ({ inBox }) => {
  if (inBox) {
    return (
      <Box>
        <Skeleton active />
      </Box>
    );
  }
  return <Skeleton active />;
};

export default LoadingIndicator;
