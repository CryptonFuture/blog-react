import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined  } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Tag, Divider, Dropdown, Menu } from 'antd';
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
import type {  activeUser } from '../../utils/Interface/User'
import type { ActionItem } from "../../components/Menu/ActionMenu";

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

const activeUserActions: ActionItem<activeUser>[] = [
 
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


export const ActiveUser: React.FC<PostProps> = () => {
    const { getColumnSearchProps } = useColumnSearch<activeUser>();
    
      const [size, setSize] = useState<SizeType>('large'); 
      const [data, setData] = useState<activeUser[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
      })
    
      const openModal = (): void => {
        setIsModalOpen(true);
      };
    
      const closeModal = (): void => {
        setIsModalOpen(false);
      };
    
      const { styles } = useStyle();

    const handleTableChange = (paginationInfo: any) => {
        // getPost(paginationInfo.current, paginationInfo.pageSize);
    };

  return (
    <div>
         <Space style={{ width: '100%', justifyContent: 'space-between' }}>
           {/* <Button onClick={openModal} size={size} type="primary">Add Post</Button> */}
         </Space>
   
         <ReusableTable<activeUser>
           columns={activeUserColumns(
             getColumnSearchProps,
             pagination.current!,
             pagination.pageSize!,
             activeUserActions
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
