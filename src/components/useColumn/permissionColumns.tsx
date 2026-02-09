import React from 'react'
import { Tag, Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { ActionMenu, type ActionItem } from "../Menu/ActionMenu";
import type { Post } from '../../utils/Interface/Post'

export const permissionColumns = (
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
            title: "Name",
            dataIndex: "username",
            key: "username",
            ...getColumnSearchProps("username"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Phone No",
            dataIndex: "phoneNo",
            key: "phoneNo",
            ...getColumnSearchProps("phoneNo"),
        },
         {
            title: "ID no",
            dataIndex: "userId",
            key: "userId",
            ...getColumnSearchProps("userId"),
        },
        {
            title: "User Type",
            dataIndex: "userType",
            key: "userType",
            ...getColumnSearchProps("userType"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (v: boolean) => (
                <Tag color={v ? "green" : "red"}>
                    {v ? "Active" : "InActive"}
                </Tag>
            ),
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
