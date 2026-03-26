import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined  } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Tag, message, Divider, Dropdown, Menu } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { instance } from '../../utils/axiosConfig';
import moment from "moment"
import type { MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { Typography } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { ReusableTable } from "../../components/Table/ReusableTable";
import { useColumnSearch } from "../../components/useColumn/useColumnSearch";
import { activeUserColumns } from "../../components/useColumn/activeUserColumn";
import type { inActiveUser } from '../../utils/Interface/User'
import type { ActionItem } from "../../components/Menu/ActionMenu";
import { getInActiveUser } from '../../utils/services/userService'

type SizeType = ConfigProviderProps['componentSize'];

const { Title } = Typography;

interface PostProps {
  size?: "small" | "middle" | "large";
}

const useStyle = createStyles(({ css, token }) => {
  const { antCls }: any = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
          }
        }
      }
    `,
  };
});

const inActiveUserActions: ActionItem<inActiveUser>[] = [
 
    {
      key: 'view',
      label: 'View',
      onClick: (record) => {
        console.log('View', record);
      },
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: (record) => {
        console.log('Edit', record);
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: (record) => {
        console.log('Delete', record);
      },
    },
  ]


export const InActiveUser: React.FC<PostProps> = () => {
   const { getColumnSearchProps } = useColumnSearch<inActiveUser>();
      
        const [size, setSize] = useState<SizeType>('large'); 
        const [data, setData] = useState<inActiveUser[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
        const [pagination, setPagination] = useState({
          current: 1,
          pageSize: 10,
          total: 0,
        })
      
      
      
      const { styles } = useStyle();

      const getInActiveUsers = async (
          page = pagination.current,
          limit = pagination.pageSize
        ) => {
          setLoading(true);
          try {
            const res = await getInActiveUser(page, limit)
            setData(res.data)
      
            setPagination({
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
            })
      
            getInActiveUser(pagination.current, pagination.pageSize)
      
          } catch (error: any) {
            console.error("Failed to fetch posts:", error);
            message.destroy(); 
            message.error(error.message)
          }
          finally {
            setLoading(false);
          }
      
        }
  
      const handleTableChange = (paginationInfo: any) => {
          getInActiveUsers(paginationInfo.current, paginationInfo.pageSize);
      };

         useEffect(() => {
                  getInActiveUsers()
            }, []);
  
  return (
    <div>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        {/* <Button onClick={openModal} size={size} type="primary">Add Post</Button> */}
      </Space>

      <ReusableTable<inActiveUser>
        columns={activeUserColumns(
          getColumnSearchProps,
          pagination.current!,
          pagination.pageSize!,
          inActiveUserActions
        )}
        data={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="key"
        className={styles.customTable}
      />


    </div>
  )
}
