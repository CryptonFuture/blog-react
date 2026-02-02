import React, {useState} from 'react'
import { Row, Col, Card, Statistic, Table  } from "antd";
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
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
  // { title: "Comments", value: 340, icon: <MessageOutlined />, color: "#faad14" },
  { title: "Pages", value: 12, icon: <CopyOutlined />, color: "#13c2c2" },
  { title: "Tags", value: 45, icon: <TagsOutlined />, color: "#722ed1" },
  // { title: "Pages", value: 12, icon: <CopyOutlined />, color: "#13c2c2" },
  // { title: "Category", value: 8, icon: <AppstoreOutlined />, color: "#eb2f96" },
  // { title: "Roles", value: 5, icon: <SafetyCertificateOutlined />, color: "#fa541c" },
  // { title: "Permissions", value: 25, icon: <KeyOutlined />, color: "#fa8c16" },
  // { title: "Requests", value: 7, icon: <InboxOutlined />, color: "#52c41a" },
  // { title: "Contact Us", value: 18, icon: <PhoneOutlined />, color: "#722ed1" },
  // { title: "Logs", value: 1200, icon: <FileSearchOutlined />, color: "#1890ff" },
];

const areaData = [
  { date: '2026-01-01', Users: 30, Posts: 20 },
  { date: '2026-01-02', Users: 50, Posts: 25 },
  { date: '2026-01-03', Users: 70, Posts: 30 },
];

const pieData = [
  { name: 'Users', value: 120 },
  { name: 'Posts', value: 85 },
  { name: 'Comments', value: 340 },
  { name: 'Tags', value: 45 },
];

const barData = [
  { name: 'Jan', Users: 30, Posts: 20, Comments: 50 },
  { name: 'Feb', Users: 40, Posts: 25, Comments: 70 },
  { name: 'Mar', Users: 50, Posts: 30, Comments: 90 },
];

const lineData = [
  { date: '2026-01-01', Users: 30, Posts: 20 },
  { date: '2026-01-02', Users: 40, Posts: 25 },
  { date: '2026-01-03', Users: 50, Posts: 30 },
];

const tableData = [
  { key: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
  { key: 2, name: 'Jane Smith', role: 'Editor', status: 'Inactive' },
  { key: 3, name: 'Bob Johnson', role: 'Moderator', status: 'Active' },
];

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

export const Dashboard = () => {
   const COLORS = ["#1677ff", "#52c41a", "#faad14", "#722ed1"];


  return (
      // <Row gutter={16}>
      //     {stats.map((item, i) => (
      //         <Col span={6} key={i}>
      //             <Card
      //                 bordered={false}
      //                 style={dashboardCardStyle}
      //             >
      //                 <span style={{ fontSize: 28, color: "#001529" }}>
      //                     {item.icon}
      //                 </span>

      //                 <h2 style={{ margin: "12px 0 4px", color: "#001529" }}>
      //                     {item.value}
      //                 </h2>

      //                 <p style={{ color: "rgba(0,0,0,0.6)", margin: 0 }}>
      //                     {item.title}
      //                 </p>
      //             </Card>
      //         </Col>
      //     ))}
      // </Row>

        <div style={{ padding: 20 }}>
      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((item, i) => (
          <Col xs={24} sm={12} md={8} lg={6} key={i}>
            <Card style={dashboardCardStyle} bordered={false}>
              <span style={{ fontSize: 28, color: "#001529" }}>{item.icon}</span>
              <h2 style={{ margin: "12px 0 4px", color: "#001529" }}>{item.value}</h2>
              <p style={{ color: "rgba(0,0,0,0.6)", margin: 0 }}>{item.title}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} md={8}>
          <Card title="Pie Chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Bar Chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#1677ff" />
                <Bar dataKey="Posts" fill="#52c41a" />
                <Bar dataKey="Comments" fill="#faad14" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Line Chart">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Users" stroke="#1677ff" />
                <Line type="monotone" dataKey="Posts" stroke="#52c41a" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Auto Table */}
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="User Table">
            <Table dataSource={tableData} columns={tableColumns} pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
      </Row>
    </div>
    )
}

const dashboardCardStyle: any = {
  // background: "#fff",            
  color: "#001529",              
  borderRadius: 8,
  height: 160,
  width: "100%",
  marginBottom: 16,
//   border: "1px solid royalblue",  
  // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
