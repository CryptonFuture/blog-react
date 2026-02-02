import React from 'react'
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface CommonTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
}

export const CommonTable = <T extends object> ({
columns,
  data,
  loading
}: CommonTableProps<T>) => {
   return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}
