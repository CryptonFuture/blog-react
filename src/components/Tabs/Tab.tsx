import React from 'react'
import { Tabs } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

export const Tab: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>

    <Tabs
      onChange={onChange}
      type="card"
      items={[
        {
          label: "Active User",
          key: "active",
          children: "Content of Active User",
        },
        {
          label: "Inactive User",
          key: "inactive",
          children: "Content of Inactive User",
        },
        {
          label: "Role",
          key: "role",
          children: "Content of Role",
        },
        {
          label: "Action",
          key: "action",
          children: "Content of Action",
        },
      ]}
    />
    </div>
  )
}
