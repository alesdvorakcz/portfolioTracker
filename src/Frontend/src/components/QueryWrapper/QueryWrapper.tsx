import { Alert } from 'antd';
import { UseQueryResult } from 'react-query';

import { LoadingIndicator } from '..';

interface Props<T> {
  query: UseQueryResult<T>;
  render: (data: T) => React.ReactNode;
}

function QueryWrapper<T>({ query, render }: Props<T>) {
  return (
    <>
      {query.isLoading && <LoadingIndicator inBox />}
      {query.error && <Alert message={(query.error as any).message} type="error" />}
      {query.isSuccess && <>{render(query.data)}</>}
    </>
  );
}

export default QueryWrapper;
