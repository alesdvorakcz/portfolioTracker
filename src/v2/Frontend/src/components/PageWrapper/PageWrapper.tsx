import { Layout, PageHeader } from 'antd';
import { PropsWithChildren } from 'react';

const { Content } = Layout;

interface Props {
  title: string;
  subtitle?: string;
  goBack?: () => void;
  extra?: React.ReactNode;
}

const PageWrapper: React.FC<PropsWithChildren<Props>> = ({
  title,
  subtitle,
  goBack,
  extra,
  children,
}) => {
  return (
    <>
      <PageHeader
        ghost={false}
        onBack={goBack}
        title={title}
        subTitle={subtitle}
        extra={extra}
      ></PageHeader>
      <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
    </>
  );
};

export default PageWrapper;
