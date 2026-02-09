import React, { useEffect, useState } from 'react'
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
  UserOutlined,
  SettingOutlined,
  KeyOutlined,
  InboxOutlined,
  PhoneOutlined,
  MessageOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { Button, Layout, Dropdown, Avatar, Badge, Menu, theme } from 'antd';
import Footers  from '../../components/Footer/Footers'

import { getSidebars } from '../../utils/services/sidebarService'
import { Contents } from '../../components/Content/Contents'
import { getIcon } from '../../components/Icon/Icon'


const { Header, Sider, Content } = Layout

export default function Main() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const COLORS = darkMode
    ? ["#69b1ff", "#95de64", "#ffd666", "#b37feb"]
    : ["#1677ff", "#52c41a", "#faad14", "#722ed1"];
    
  const [collapsed, setCollapsed] = useState(true);
  const [activeKey, setActiveKey] = useState<string>("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const userMenuItems = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { key: "logout", label: "Logout" },
  ];

  const getSidebar = async () => {
    try {
      const res = await getSidebars()

      const formattedData = res.data.map((item: any) => ({
        key: item.key,
        label: item.name,
        icon: getIcon(item.name),
      }))

      setMenuItems(formattedData)

    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
    finally {
    }

  }

  useEffect(() => {
    getSidebar()
  }, []);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={260} collapsedWidth={80} style={{
        margin: 16,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#001529',     // dark theme
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }} trigger={null} collapsible collapsed={collapsed}>
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
          onClick={(e) => setActiveKey(String(e.key))}
          items={menuItems}
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
            background: colorBgContainer,
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
            flex: 1,
            borderRadius: borderRadiusLG,
          }}
        >
          <Contents activeKey={activeKey} />
        </Content>

        <Footers />
      </Layout>
    </Layout>

  )
}
