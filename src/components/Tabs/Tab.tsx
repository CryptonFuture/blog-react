import React from 'react'
import { Tabs } from 'antd';
import { ActiveUser } from '../../pages/ActiveUser/ActiveUser';
import { InActiveUser } from '../../pages/InActiveUser/InActiveUser';
import { Role } from '../../pages/Role/Role';
import { Action } from '../../pages/Action/Action';

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
          children: <ActiveUser />,
        },
        {
          label: "Inactive User",
          key: "inactive",
          children: <InActiveUser />,
        },
        {
          label: "Role",
          key: "role",
          children: <Role />,
        },
        {
          label: "Action",
          key: "action",
          children: <Action />,
        },
      ]}
    />
    </div>
  )
}
