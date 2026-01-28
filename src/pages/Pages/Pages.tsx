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

interface DataType {
  key: string;
  pageName: string;
  pageUrl: string
  description: string;
  status: string;
  createdAt: string
}

type DataIndex = keyof DataType;

const actionMenu = (record: DataType): MenuProps => ({
  items: [
    {
      key: 'view',
      label: 'View',
      onClick: () => {
        console.log('View', record);
      },
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => {
        console.log('Edit', record);
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => {
        console.log('Delete', record);
      },
    },
  ],
});

export const Pages: React.FC<PostProps> = () => {
     const [size, setSize] = useState<SizeType>('large');
    
      const [searchText, setSearchText] = useState('');
      const [searchedColumn, setSearchedColumn] = useState('');
      const [data, setData] = useState<DataType[]>([]);
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
    
      const pageSize = pagination.pageSize;
      const currentPage = pagination.current;
    
      const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
      };
    
      const getPage = async (
        page = pagination.current,
        limit = pagination.pageSize
      ) => {
        setLoading(true);
        try {
          const res = await instance.get('/getPages', {
            params: {
              page,
              limit,
            },
          })
          setData(res.data.data)
    
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
    
      const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        filterDropdownProps: {
          onOpenChange(open) {
            if (open) {
              setTimeout(() => searchInput.current?.select(), 100);
            }
          },
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const columns: TableColumnsType<DataType> = [
        {
          title: 'S.No',
          key: 'sno',
          width: 70,
          align: 'center',
          render: (_: any, __: any, index: number) =>
            (currentPage - 1) * pageSize + index + 1,
        },
        {
          title: 'Page Name',
          dataIndex: 'pageName',
          key: 'pageName',
          //   width: '20%',
          ...getColumnSearchProps('pageName'),
          sorter: (a, b) => a.pageName.length - b.pageName.length,
          sortDirections: ['descend', 'ascend'],
    
        },

         {
          title: 'Page Url',
          dataIndex: 'pageUrl',
          key: 'pageUrl',
          //   width: '20%',
          ...getColumnSearchProps('pageUrl'),
          sorter: (a, b) => a.pageUrl.length - b.pageUrl.length,
          sortDirections: ['descend', 'ascend'],
    
        },

        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (value: boolean) => (
            <Tag color={value ? 'green' : 'red'}>
              {value ? 'Active' : 'InActive'}
            </Tag>
          ),
          //    width: '20%',
          //   ...getColumnSearchProps('status'),
          sorter: (a, b) => a.status.length - b.status.length,
          sortDirections: ['descend', 'ascend'],
    
        },
    
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
          //   width: '20%',
          //   ...getColumnSearchProps('createdAt'),
          sorter: (a, b) => a.createdAt.length - b.createdAt.length,
          sortDirections: ['descend', 'ascend'],
          render: (createdAt: string) => moment(createdAt).format("MM-DD-YYYY")
        },
    
        {
          title: 'Actions',
          key: 'actions',
          align: 'center',
          render: (_, record) => (
            <Dropdown menu={actionMenu(record)} trigger={['click']}>
              <Button
                type="text"
                icon={<MoreOutlined style={{ fontSize: 18 }} />}
              />
            </Dropdown>
          ),
        }
      ];
  return (
    <>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Title>Page</Title>
              <Button onClick={openModal} size={size} type="primary">Add Page</Button>
          </Space>
          {/* <Divider>Tag</Divider> */}
          <Table<DataType>
              style={{ marginTop: 10 }}
              className={styles.customTable}
              columns={columns}
              dataSource={data}
              loading={loading}
              pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  showSizeChanger: true,
                  pageSizeOptions: ['5', '10', '20', '50'],
              }}
              onChange={handleTableChange}
              rowKey="key"
              bordered

              scroll={{ y: 70 * 5 }}
          />
           <AddPageModal
                  open={isModalOpen}
                  onCancel={closeModal}
                  modalOpen={isModalOpen}
                />
          </>
  )
}
