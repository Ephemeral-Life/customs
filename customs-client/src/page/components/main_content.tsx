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
  const [iframeSrc, setIframeSrc] = useState('./components/sensitive_rules_content');
  const handleMenuClick = (e:any) => {
    // 根据点击的菜单项设置对应的src
    const menuItemKey = e.key;
    let src = '';
    switch (menuItemKey) {
      case '1':
        src = './components/sensitive_rules_content';
        break;
      case '2':
        src = 'https://example.com/item2';
        break;
      case '3':
        src = 'https://example.com/item3';
        break;
      // 添加其他菜单项的处理逻辑
      default:
        break;
    }
    setIframeSrc(src);
  };

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
            handleMenuClick(item);
            props.handleSwitch(label);
          }}
        />
      </Sider>
      <Layout>
          <iframe src={iframeSrc} className='main_iframe' title='main_iframe'>

          </iframe>
      </Layout>
    </Layout>
    </div>
  );
};

export default Main_Content;
