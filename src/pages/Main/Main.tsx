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
  BellOutlined,
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
import { Button, Layout, Dropdown, Avatar, Badge, Menu, theme } from 'antd';
import { Switch } from "antd";

import { Dashboard } from '../Dashboard/Dashboard';
import { Posts } from '../Post/Posts';
import { Tags } from '../Tag/Tags';
import { Pages } from '../Pages/Pages';
import { Users } from '../Users/Users';
import { Request } from '../Request/Request'
import { ContactUs } from '../ContactUs/ContactUs'
import './Main.css'
import { Permission } from '../Permission/Permission';

const { Header, Sider, Content, Footer } = Layout

export default function Main() {
  const [darkMode, setDarkMode] = useState(false);

  const COLORS = darkMode
    ? ["#69b1ff", "#95de64", "#ffd666", "#b37feb"]
    : ["#1677ff", "#52c41a", "#faad14", "#722ed1"];
  const [collapsed, setCollapsed] = useState(true);
  const [activeKey, setActiveKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //   const userMenu = (
  //   <Menu
  //     items={[
  //       { key: "profile", label: "Profile" },
  //       { key: "settings", label: "Settings" },
  //       { key: "logout", label: "Logout" },
  //     ]}
  //     onClick={(e) => {
  //       if (e.key === "logout") {
  //         console.log("Logging out...");
  //       } else if (e.key === "profile") {
  //         console.log("Go to profile...");
  //       } else if (e.key === "settings") {
  //         console.log("Go to settings...");
  //       }
  //     }}
  //   />
  // );

  const userMenuItems = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { key: "logout", label: "Logout" },
  ];

  const renderComponent = () => {
    switch (activeKey) {
      case "1": return <Dashboard />;
      case "2": return <Posts />;
      case "3": return <Tags />;
      case "4": return <Pages />;
      case "5": return <Users />;
      // case "6": return <Category />;
      // case "7": return <Role />;
      // case "8": return <Profile />;
      // case "9": return <Settings />;
      case "10": return <Permission />;
      case "11": return <Request />;
      case "12": return <ContactUs />;
      // case "13": return <Comment />;
      // case "14": return <Logs />;
      // case "15": return <LogsConfig />;
      default: return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider  width={260} collapsedWidth={80} style={{
        margin: 16,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#001529',     // dark theme
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}  trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="demo-logo-vertical" />
        <div
          className="demo-logo-vertical"
          style={{
            height: 60,
            margin: '16px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          MyApp
        </div> */}
        

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
            { key: "5", icon: <TeamOutlined />, label: "IAM" },
            { key: "6", icon: <AppstoreOutlined />, label: "Category" },
            // { key: "7", icon: <SafetyCertificateOutlined />, label: "Role" },
            // { key: "8", icon: <UserOutlined />, label: "Profile" },
            // { key: "9", icon: <SettingOutlined />, label: "Settings" },
            { key: "10", icon: <KeyOutlined />, label: "OnBoarding" },
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
            padding: "0 16px",
            margin: 16,
            borderRadius: 50,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background:  colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

            {/* <Switch
              checked={darkMode}
              onChange={(checked) => setDarkMode(checked)}
              checkedChildren="🌙 Dark"
              unCheckedChildren="☀️ Light"
            /> */}

            <Badge count={5}>
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 20 }} />}
              />
            </Badge>

            <Dropdown menu={{
              items: userMenuItems,
              onClick: (e) => {
                if (e.key === "logout") {
                  console.log("Logging out...");
                } else if (e.key === "profile") {
                  console.log("Go to profile...");
                } else if (e.key === "settings") {
                  console.log("Go to settings...");
                }
              },

            }} placement="bottomRight">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            // margin: '16px',
            // padding: 24,
            flex: 1,               // 🔥 important
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderComponent()}
        </Content>

        <Footer
          style={{
            textAlign: "center",
            margin: 16,
            borderRadius: 12,
            background: colorBgContainer,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </Footer>
        
      </Layout>
    </Layout>

  )
}
