import React from 'react'
import { Tag, Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { ActionMenu, type ActionItem } from "../../components/Menu/ActionMenu";
import type { Taged } from '../../utils/Interface/Tag';

export const tagColumns = (
  getColumnSearchProps: any,
  currentPage: number,
  pageSize: number,
  actions: ActionItem<Taged>[]
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
            title: "Tag Name",
            dataIndex: "tagName",
            key: "tagName",
            ...getColumnSearchProps("tagName"),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
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
            render: (_: any, record: Taged) => (
                <ActionMenu<Taged>
                    record={record}
                    actions={actions}
                />
            ),
        },
  
]
