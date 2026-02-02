import React from 'react'
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

export interface ReusableTableProps<T> {
  columns: any[]
  data: T[]
  loading?: boolean
  pagination: TablePaginationConfig
  onChange: (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => void
  rowKey: string | ((record: T) => string)
  scrollY?: number
  className?: string
}



export const ReusableTable = <T extends object>({
  columns,
  data,
  loading,
  pagination,
  onChange,
  rowKey,
  scrollY = 350,
  className,
}: ReusableTableProps<T>) => {
  return (
    <Table<T>
      className={className}
      style={{ marginTop: 10 }}
      bordered
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      scroll={{ y: scrollY }}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: (total) => `Total ${total} records`,
        onChange: (page, pageSize) => {
          onChange(
            { ...pagination, current: page, pageSize },
            {},
            {}
          )
        },
        onShowSizeChange: (current, size) => {
          onChange(
            { ...pagination, current: 1, pageSize: size },
            {},
            {}
          )
        },
      }}
    />
  )
}
