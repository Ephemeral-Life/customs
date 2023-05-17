import React, { useState } from 'react';
import './css/main.css';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
interface handleSwitch {
    handleSwitch: (data: string) => void;
}

const { Sider } = Layout;
const Main_Content: React.FC<handleSwitch> = (props) => {
  const [collapsed] = useState(false);
  return (
    <div className='content'>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          className='menu-container'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '敏感规则管理',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
          onSelect={(item) => {
            const label = item.domEvent.currentTarget.innerText;
            props.handleSwitch(label);
          }}
        />
      </Sider>
      <Layout>
          <iframe src='./components/sensitive_rules_content' className='main_iframe' title='main_iframe'>

          </iframe>
      </Layout>
    </Layout>
    </div>
  );
};

export default Main_Content;