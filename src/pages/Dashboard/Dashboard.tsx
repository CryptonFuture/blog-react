import React, {useState} from 'react'
import { Row, Col, Card, Statistic, Table  } from "antd";
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer, CartesianGrid  } from 'recharts';
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
  { title: "Users", value: 120, icon: <UserOutlined />, color: "#1677ff",  chartData: [
      { value: 10 },
      { value: 30 },
      { value: 20 },
      { value: 50 },
      { value: 40 }
    ] },
  { title: "Posts", value: 85, icon: <FileTextOutlined />, color: "#52c41a", chartData: [
      { value: 10 },
      { value: 30 },
      { value: 20 },
      { value: 50 },
      { value: 40 }
    ] },
  // { title: "Comments", value: 340, icon: <MessageOutlined />, color: "#faad14" },
  { title: "Pages", value: 12, icon: <CopyOutlined />, color: "#13c2c2", chartData: [
      { value: 10 },
      { value: 30 },
      { value: 20 },
      { value: 50 },
      { value: 40 }
    ] },
  { title: "Tags", value: 45, icon: <TagsOutlined />, color: "#722ed1", chartData: [
      { value: 10 },
      { value: 30 },
      { value: 20 },
      { value: 50 },
      { value: 40 }
    ] },
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

// const lineData = [
//   { date: '2026-01-01', Users: 30, Posts: 20 },
//   { date: '2026-01-02', Users: 40, Posts: 25 },
//   { date: '2026-01-03', Users: 50, Posts: 30 },
// ];

const lineData = [
  { date: "Jan", Users: 20, Posts: 20 },
  { date: "Feb", Users: 30, Posts: 25 },
  { date: "Mar", Users: 28, Posts: 30 },
  { date: "Apr", Users: 40, Posts: 35 },
  { date: "May", Users: 35, Posts: 40 },
  { date: "Jun", Users: 50, Posts: 45 }
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
   const COLORS = [
  "#91caff",
  "#bae0ff",
  "#d6e4ff",
  "#adc6ff",
  "#c2e7ff"
];


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
        {stats.map((item, i) => {
          // Define gradient colors per card
          const COLORS = [
            { start: "#1677ff", end: "#e6f4ff" }, // Blue
            { start: "#00c853", end: "#e0f7e9" }, // Green
            { start: "#ffbf00", end: "#fff5e6" }, // Yellow
            { start: "#ff4d4f", end: "#ffe6e6" }  // Red
          ];
          const color = COLORS[i % COLORS.length];

          return (
            <Col xs={24} sm={12} md={12} lg={6} key={i}>
              <Card
                bordered={false}
                style={{
                  height: 140,
                  padding: "16px 18px",
                  borderRadius: 10,
                  position: "relative",

                }}
              >
                {/* Icon Top Right */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 16,
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: color.start,
                    background: color.end,
                    borderRadius: "50%"
                  }}
                >
                  {item.icon}
                </div>

                {/* Text Top Left */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 16
                  }}
                >
                  <h3 style={{ margin: 0 }}>{item.value}</h3>
                  <p style={{ margin: 0, color: "gray", fontSize: 13 }}>
                    {item.title}
                  </p>
                </div>

                {/* Gradient Area Chart */}
                <div style={{ position: "absolute", bottom: 10, left: 0, right: 0 }}>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={item.chartData}>
                      <defs>
                        <linearGradient id={`bg-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={color.start} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={color.start} stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color.start}
                        strokeWidth={2}
                        fill={`url(#bg-gradient-${i})`}
                        dot={false}
                      />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} md={8}>
          <Card title="Pie Chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
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
                <Bar dataKey="Users" fill="#69b1ff" />
                <Bar dataKey="Posts" fill="#91caff" />
                <Bar dataKey="Comments" fill="#bae0ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Area Chart">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                    <stop offset="70%" stopColor="#16a34a" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

             
                <Area
                  type="monotoneX"
                  dataKey="Users"
                  stroke="#16a34a"
                  strokeWidth={3}
                  fill="url(#colorUsers)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
{/* 
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
        </Col> */}

        
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

const dashboardCardStyle = {
  height: 90,
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  borderRadius: 10,
};
