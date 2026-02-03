import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Divider, Tag, Dropdown, Menu } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { instance } from '../../utils/axiosConfig';
import moment from "moment"
import type { MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { Typography } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { AddPageModal } from '../../components/Modal/AddPageModal';
import { getPages } from '../../utils/services/pageService';
import type { ActionItem } from '../../components/Menu/ActionMenu';
import { ReusableTable } from '../../components/Table/ReusableTable';
import { useColumnSearch } from '../../components/useColumn/useColumnSearch';
import type { Paged } from '../../utils/Interface/Page';
import { pageColumns } from '../../components/useColumn/pageColumns';

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


const pageActions: ActionItem<Paged>[] = [
 
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


export const Pages: React.FC<PostProps> = () => {
    const { getColumnSearchProps } = useColumnSearch<Paged>();
  
     const [size, setSize] = useState<SizeType>('large');
    
      const [searchText, setSearchText] = useState('');
      const [searchedColumn, setSearchedColumn] = useState('');
      const [data, setData] = useState<Paged[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const searchInput = useRef<InputRef>(null);
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
      });
    
      const openModal = (): void => {
        setIsModalOpen(true);
      };
    
      const closeModal = (): void => {
        setIsModalOpen(false);
      };
    
      const { styles } = useStyle();
    
      const getPage = async (
        page = pagination.current,
        limit = pagination.pageSize
      ) => {
        setLoading(true);
        try {
         const res = await getPages(page, limit)
          setData(res.data)
    
          setPagination({
            current: res.data.pagination.currentPage,
            pageSize: res.data.pagination.limit,
            total: res.data.pagination.totalRecords,
          });
    
        } catch (error) {
          console.error("Failed to fetch tags:", error);
        }
        finally {
          setLoading(false);
        }
    
      }
    
      useEffect(() => {
        getPage()
      }, []);
    
      const handleTableChange = (paginationInfo: any) => {
        getPage(paginationInfo.current, paginationInfo.pageSize);
      };
    
  return (
        <div style={{ padding: 20 }}>

    
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Title>Page</Title>
              <Button onClick={openModal} size={size} type="primary">Add Page</Button>
          </Space>
          {/* <Divider>Tag</Divider> */}
           <ReusableTable<Paged>
                      columns={pageColumns(
                        getColumnSearchProps,
                        pagination.current!,
                        pagination.pageSize!,
                        pageActions
                      )}
                      data={data}
                      loading={loading}
                      pagination={pagination}
                      onChange={handleTableChange}
                      rowKey="key"
                      className={styles.customTable}
                    />
           <AddPageModal
                  open={isModalOpen}
                  onCancel={closeModal}
                  modalOpen={isModalOpen}
                />
          </div>
  )
}
