import React from 'react'
import { Tag, Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { ActionMenu, type ActionItem } from "../Menu/ActionMenu";
import type { Post } from '../../utils/Interface/Post'

export const logsColumn = (
  getColumnSearchProps: any,
  currentPage: number,
  pageSize: number,
  actions: ActionItem<Post>[]
) => [

        {
            title: "S.No",
            key: "sno",
            width: 70,
            align: "center",
            render: (_: any, __: any, index: number) =>
                (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: "Username",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Login Time",
            dataIndex: "login_time",
            key: "login_time",
            render: (v: string) =>
        v
            ? new Date(v).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
              })
            : "-",
            ...getColumnSearchProps("login_time"),
        },

        {
            title: "Logout Time",
            dataIndex: "logout_time",
            key: "logout_time",
            render: (v: string) =>
        v
            ? new Date(v).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
              })
            : "-",
            ...getColumnSearchProps("logout_time"),
        },
       
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (v: string) => moment(v).format("MM-DD-YYYY"),
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (_: any, record: Post) => (
                <ActionMenu<Post>
                    record={record}
                    actions={actions}
                />
            ),
        },
  
]
