import {
  BankOutlined,
  DashboardOutlined,
  EuroOutlined,
  FundOutlined,
  ImportOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import { Menu as AntMenu } from 'antd';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', key: '/', pattern: '/', icon: <DashboardOutlined /> },
  { label: 'Accounts', key: '/accounts', pattern: '/accounts/*', icon: <BankOutlined /> },
  { label: 'ETFs', key: 'etfs', pattern: '/etfs/*', icon: <FundOutlined /> },
  {
    label: 'Currencies',
    key: 'currencies',
    pattern: '/currencies/*',
    icon: <EuroOutlined />,
  },
  {
    label: 'Crypto',
    key: 'cryptos',
    pattern: '/cryptos/*',
    icon: <PayCircleOutlined />,
  },
  {
    label: 'Import',
    key: 'import',
    pattern: '/import/*',
    icon: <ImportOutlined />,
  },
];

const getActive = (currentPage: string) => {
  const active = menuItems.find((x) => {
    const match = matchPath(x.pattern, currentPage);

    return match !== null;
  });

  return active;
};

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = getActive(location.pathname);
  const selectedKeys = activePage ? [activePage.key] : [];

  return (
    <AntMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      onClick={(e) => navigate(e.key)}
      items={menuItems}
    />
  );
};

export default Menu;
