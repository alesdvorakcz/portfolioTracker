import './App.css';

import { Grid, Layout } from 'antd';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Menu } from './components';
import { AccountDetailPage, AccountsPage, CurrenciesPage, DashboardPage, EtfsPage } from './pages';
import CurrencyDetailPage from './pages/Currencies/CurrencyDetailPage';
import EtfInstrumentDetailPage from './pages/Etfs/EtfInstrumentDetailPage';

const { Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

function App() {
  const screens = useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        defaultCollapsed={isCollapsed}
        onCollapse={(collapsed) => {
          setIsCollapsed(collapsed);
        }}
        collapsible={screens.md}
        breakpoint="md"
        collapsedWidth={!screens.md ? 0 : 50}
      >
        {isCollapsed ? (
          <div className="app-logo-collapsed">
            <span>PT</span>
          </div>
        ) : (
          <div className="app-logo">
            <span>Portfolio Tracker</span>
          </div>
        )}
        <Menu />
      </Sider>
      <Layout>
        <Switch>
          <Route exact path="/">
            <DashboardPage />
          </Route>
          <Route path="/accounts/:id">
            <AccountDetailPage />
          </Route>
          <Route path="/accounts">
            <AccountsPage />
          </Route>
          <Route path="/etfs/:id">
            <EtfInstrumentDetailPage />
          </Route>
          <Route path="/etfs">
            <EtfsPage />
          </Route>
          <Route path="/currencies/:id">
            <CurrencyDetailPage />
          </Route>
          <Route path="/currencies">
            <CurrenciesPage />
          </Route>
        </Switch>
        <Footer style={{ textAlign: 'center' }}>Footer text</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
