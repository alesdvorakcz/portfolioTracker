import { Layout, PageHeader } from 'antd';

const { Content } = Layout;

interface Props {
  title: string;
  subtitle?: string;
  goBack?: () => void;
}

const PageWrapper: React.FC<Props> = ({ title, subtitle, goBack, children }) => {
  return (
    <>
      <PageHeader ghost={false} onBack={goBack} title={title} subTitle={subtitle}></PageHeader>
      <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
    </>
  );
};

export default PageWrapper;
