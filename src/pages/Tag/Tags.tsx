import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, message, Divider, Tag, Dropdown, Menu } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { instance } from '../../utils/axiosConfig';
import moment from "moment"
import type { MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { Typography } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { AddTagModal } from '../../components/Modal/AddTagModal';
import { getTags } from '../../utils/services/tagService'
import type { Taged } from '../../utils/Interface/Tag';
import type { ActionItem } from '../../components/Menu/ActionMenu';
import { ReusableTable } from '../../components/Table/ReusableTable';
import { tagColumns } from '../../components/useColumn/tagColumns';
import { useColumnSearch } from '../../components/useColumn/useColumnSearch';

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

const tagActions: ActionItem<Taged>[] = [
 
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


export const Tags: React.FC<PostProps> = () => {
  const { getColumnSearchProps } = useColumnSearch<Taged>();
  
  const [size, setSize] = useState<SizeType>('large');

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState<[]>([]);
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


  const getTag = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    setLoading(true);
    try {
      const res = await getTags(page, limit)
      setData(res.data)

      setPagination({
        current: res.data.pagination.currentPage,
        pageSize: res.data.pagination.limit,
        total: res.data.pagination.totalRecords,
      });

    } catch (error: any) {
      console.error("Failed to fetch tags:", error);
      message.destroy(); 
      message.error(error.message)
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getTag()
  }, []);

  const handleTableChange = (paginationInfo: any) => {
    getTag(paginationInfo.current, paginationInfo.pageSize);
  };

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Title>Tag</Title>
        <Button onClick={openModal} size={size} type="primary">Add Tag</Button>
      </Space>
      {/* <Divider>Tag</Divider> */}
     <ReusableTable<Taged>
             columns={tagColumns(
               getColumnSearchProps,
               pagination.current!,
               pagination.pageSize!,
               tagActions
             )}
             data={data}
             loading={loading}
             pagination={pagination}
             onChange={handleTableChange}
             rowKey="key"
             className={styles.customTable}
           />
     
      <AddTagModal
        open={isModalOpen}
        onCancel={closeModal}
        modalOpen={isModalOpen}
      />
    </div>
  )
}
