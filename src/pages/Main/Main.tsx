import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TagsOutlined,
  CopyOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  SettingOutlined,
  KeyOutlined,
  InboxOutlined,
  PhoneOutlined,
  MessageOutlined,
  FileSearchOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import { Dashboard } from '../Dashboard/Dashboard';
import { Post } from '../Post/Post';
import { Tags } from '../Tag/Tags';

const { Header, Sider, Content } = Layout;

export default function Main() {
  const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderComponent = () => {
    switch (activeKey) {
      case "1": return <Dashboard />;
      case "2": return <Post />;
      case "3": return <Tags />;
      // case "4": return <Pages />;
      // case "5": return <Users />;
      // case "6": return <Category />;
      // case "7": return <Role />;
      // case "8": return <Profile />;
      // case "9": return <Settings />;
      // case "10": return <Permission />;
      // case "11": return <Request />;
      // case "12": return <Contact />;
      // case "13": return <Comment />;
      // case "14": return <Logs />;
      // case "15": return <LogsConfig />;
      default: return null;
    }
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={(e) => setActiveKey(e.key)}
         items={[
          { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
          { key: "2", icon: <FileTextOutlined />, label: "Post" },
          { key: "3", icon: <TagsOutlined />, label: "Tag" },
          { key: "4", icon: <CopyOutlined />, label: "Pages" },
          { key: "5", icon: <TeamOutlined />, label: "Users" },
          { key: "6", icon: <AppstoreOutlined />, label: "Category" },
          { key: "7", icon: <SafetyCertificateOutlined />, label: "Role" },
          { key: "8", icon: <UserOutlined />, label: "Profile" },
          { key: "9", icon: <SettingOutlined />, label: "Settings" },
          { key: "10", icon: <KeyOutlined />, label: "Permission" },
          { key: "11", icon: <InboxOutlined />, label: "Request" },
          { key: "12", icon: <PhoneOutlined />, label: "Contact Us" },
          { key: "13", icon: <MessageOutlined />, label: "Comment" },
          { key: "14", icon: <FileSearchOutlined />, label: "Logs" },
          { key: "15", icon: <SettingOutlined />, label: "Logs Config" },
        ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: '16px',
            padding: 24,
            flex: 1,               // 🔥 important
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         {renderComponent()}
        </Content>
      </Layout>
    </Layout>

  )
}
