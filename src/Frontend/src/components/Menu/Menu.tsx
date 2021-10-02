import { Menu as AntMenu } from "antd";
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

function App() {
    return (
        <AntMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <AntMenu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </AntMenu.Item>
          <AntMenu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </AntMenu.Item>
        </AntMenu>
    );
}

export default App;