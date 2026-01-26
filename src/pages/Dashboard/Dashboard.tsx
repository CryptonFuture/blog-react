import React from 'react'
import { Row, Col, Card, Statistic } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  TagsOutlined,
  CopyOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
  InboxOutlined,
  PhoneOutlined,
  MessageOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

const stats = [
  { title: "Users", value: 120, icon: <UserOutlined />, color: "#1677ff" },
  { title: "Posts", value: 85, icon: <FileTextOutlined />, color: "#52c41a" },
  { title: "Comments", value: 340, icon: <MessageOutlined />, color: "#faad14" },
  { title: "Tags", value: 45, icon: <TagsOutlined />, color: "#722ed1" },
  { title: "Pages", value: 12, icon: <CopyOutlined />, color: "#13c2c2" },
  { title: "Category", value: 8, icon: <AppstoreOutlined />, color: "#eb2f96" },
  { title: "Roles", value: 5, icon: <SafetyCertificateOutlined />, color: "#fa541c" },
  { title: "Permissions", value: 25, icon: <KeyOutlined />, color: "#fa8c16" },
  { title: "Requests", value: 7, icon: <InboxOutlined />, color: "#52c41a" },
  { title: "Contact Us", value: 18, icon: <PhoneOutlined />, color: "#722ed1" },
  { title: "Logs", value: 1200, icon: <FileSearchOutlined />, color: "#1890ff" },
];

export const Dashboard = () => {
  return (
      <Row gutter={16}>
          {stats.map((item, i) => (
              <Col span={6} key={i}>
                  <Card
                      bordered={false}
                      style={dashboardCardStyle}
                  >
                      <span style={{ fontSize: 28, color: "#001529" }}>
                          {item.icon}
                      </span>

                      <h2 style={{ margin: "12px 0 4px", color: "#001529" }}>
                          {item.value}
                      </h2>

                      <p style={{ color: "rgba(0,0,0,0.6)", margin: 0 }}>
                          {item.title}
                      </p>
                  </Card>
              </Col>
          ))}
      </Row>
    )
}

const dashboardCardStyle: any = {
  background: "#fff",            
  color: "#001529",              
  borderRadius: 8,
  height: 160,
  width: "100%",
  marginBottom: 16,
//   border: "1px solid royalblue",  
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
