import {
  BankOutlined,
  DashboardOutlined,
  EuroOutlined,
  FundOutlined,
  PayCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Menu as AntMenu } from 'antd';
import { matchPath, useHistory, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
  exact?: boolean;
  icon: string;
}

const menuStructure: MenuItem[] = [
  { label: 'Dashboard', path: '/', icon: 'DashboardOutlined', exact: true },
  { label: 'Accounts', path: '/accounts', icon: 'BankOutlined' },
  { label: 'ETFs', path: '/etfs', icon: 'FundOutlined' },
  { label: 'Crypto Wallets', path: '/cryptoWallets', icon: 'WalletOutlined' },
  { label: 'Currencies', path: '/currencies', icon: 'EuroOutlined' },
  { label: 'Crypto Currencies', path: '/cryptoCurrencies', icon: 'PayCircleOutlined' },
];

const getIcon = (item: MenuItem) => {
  if (item.icon === 'DashboardOutlined') return <DashboardOutlined />;
  if (item.icon === 'BankOutlined') return <BankOutlined />;
  if (item.icon === 'FundOutlined') return <FundOutlined />;
  if (item.icon === 'EuroOutlined') return <EuroOutlined />;
  if (item.icon === 'PayCircleOutlined') return <PayCircleOutlined />;
  if (item.icon === 'WalletOutlined') return <WalletOutlined />;
  return <BankOutlined />;
};

const getActive = (currentPage: string): MenuItem | undefined => {
  const active = menuStructure.find((x) => {
    const match = matchPath(currentPage, { path: x.path, exact: x.exact });

    return match !== null;
  });

  return active;
};

const Menu = () => {
  const history = useHistory();
  const location = useLocation();

  const activePage = getActive(location.pathname);
  const selectedKeys = activePage ? [activePage.path] : [];

  return (
    <AntMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      onClick={(e) => history.push(e.key)}
    >
      {menuStructure.map((item) => {
        return (
          <AntMenu.Item key={item.path} icon={getIcon(item)}>
            {item.label}
          </AntMenu.Item>
        );
      })}
    </AntMenu>
  );
};

export default Menu;
