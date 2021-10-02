import React, { useState } from 'react';
import { Layout, Grid } from 'antd';

import "./App.css";
import { Menu } from './components';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

function App() {
  const screens = useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        defaultCollapsed={isCollapsed}
        onCollapse={(collapsed, type) => {
          setIsCollapsed(collapsed);
        }}
        collapsible={screens.md}
        breakpoint="md"
        collapsedWidth={!screens.md ? 0 : 50}
      >
        {isCollapsed 
          ? <div className="app-logo-collapsed"><span>PT</span></div> 
          : <div className="app-logo"><span>Portfolio Tracker</span></div>
        }
        <Menu />
      </Sider>
      <Layout>
        <Header className="app-header" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="app-content" style={{ padding: 24, minHeight: 360 }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
