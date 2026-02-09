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
import type { ActionItem } from "../../components/Menu/ActionMenu";
import type { Pemission } from '../../utils/Interface/Permission'
import { permissionColumns } from "../../components/useColumn/permissionColumns";
import { AddPermissionModal } from '../../components/Modal/AddPermissionModal';
import { getOnBoardingUser } from '../../utils/services/onBoardingService'

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

const permissionActions: ActionItem<Pemission>[] = [
 
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

export const Permission: React.FC<PostProps> = () => {
      const { getColumnSearchProps } = useColumnSearch<Pemission>();
    
     const [size, setSize] = useState<SizeType>('large'); 
      const [data, setData] = useState<any[]>([]);
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

      const getOnBoardingUsers = async () => {
          setLoading(true);
          try {
            const res = await getOnBoardingUser()
            setData(res.data)   
      
          } catch (error) {
              console.error("Failed to fetch posts:", error);
          }
          finally {
            setLoading(false);
          }
         
        }
      
         useEffect(() => {
              getOnBoardingUsers()
        }, []);

    const handleTableChange = (paginationInfo: any) => {
        getOnBoardingUser();
    };
   
  return (
     <div style={{ padding: 20 }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Title>User</Title>
            <Button onClick={openModal} size={size} type="primary">Add User</Button>
          </Space>
    
          <ReusableTable<Pemission>
            columns={permissionColumns(
              getColumnSearchProps,
              pagination.current!,
              pagination.pageSize!,
              permissionActions
            )}
            data={data}
            loading={loading}
            pagination={pagination}
            onChange={handleTableChange}
            rowKey="key"
            className={styles.customTable}
          />;
            <AddPermissionModal
                  open={isModalOpen}
                  onCancel={closeModal}
                />
        </div>
  )
}
