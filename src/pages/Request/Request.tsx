import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Divider, message, Tag, Dropdown, Menu } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { instance } from '../../utils/axiosConfig';
import moment from "moment"
import type { MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { Typography } from 'antd';
import type { ConfigProviderProps } from 'antd';

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
  username: string;
  reqInfo: string;
  status: string;
  createdAt: string
}

type DataIndex = keyof DataType;

const actionMenu = (record: DataType): MenuProps => ({
  items: [
    {
      key: 'approved',
      label: 'Approved',
      onClick: () => {
        console.log('Approved', record);
      },
    },
    {
      key: 'reject',
      label: 'Reject',
      onClick: () => {
        console.log('Reject', record);
      },
    },
    {
      key: 'view',
      label: 'View',
      danger: true,
      onClick: () => {
        console.log('View', record);
      },
    },
  ],
});

export const Request: React.FC<PostProps> = () => {
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
    
      const getRequest = async (
        page = pagination.current,
        limit = pagination.pageSize
      ) => {
        setLoading(true);
        try {
          const res = await instance.get('/getActiveRequest', {
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
    
        } catch (error: any) {
          console.error("Failed to fetch tags:", error);
          message.destroy()
          message.error(error.message)
        }
        finally {
          setLoading(false);
        }
    
      }
    
      useEffect(() => {
        getRequest()
      }, []);
    
      const handleTableChange = (paginationInfo: any) => {
        getRequest(paginationInfo.current, paginationInfo.pageSize);
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
          title: 'User Name',
          dataIndex: 'username',
          key: 'username',
          //   width: '20%',
          ...getColumnSearchProps('username'),
          sorter: (a, b) => a.username.length - b.username.length,
          sortDirections: ['descend', 'ascend'],
    
        },
        {
          title: 'Req Info',
          dataIndex: 'reqInfo',
          key: 'reqInfo',
          //   width: '20%',
          ...getColumnSearchProps('reqInfo'),
          sorter: (a, b) => a.reqInfo.length - b.reqInfo.length,
          sortDirections: ['descend', 'ascend']
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
       <div style={{ padding: 20 }}>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Title>Request</Title>
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
         </div>
  )
}
