import React, { useEffect, useState } from 'react'
import { Steps, Button, Table, Checkbox, Modal, Form, Input, Select, Row, Col } from 'antd';
import type { StepsProps } from 'antd';
import { addOnBoardingUser } from '../../utils/services/onBoardingService';
import { getSidebars } from '../../utils/services/sidebarService';

const { Option } = Select;

interface AddPermissionModalProps {
  open: boolean;
  onCancel: () => void;
}

interface Permission {
  id: string;
  group: string;
  add: boolean;
  update: boolean;
  view: boolean;
  delete: boolean;
  full: boolean;
}

interface PersonalInfoForm {
  userId: string;
  username: string;
  email: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
  userType: string;
  department: string;
  phoneNo: string;
  address1: string;
  address2?: string;
}


export const AddPermissionModal: React.FC<AddPermissionModalProps> = ({
  open,
  onCancel,
}) => {
  const [current, setCurrent] = useState<number>(0);
  const [form] = Form.useForm<PersonalInfoForm>();

  const countryData: any = {
    pakistan: ['Punjab', 'Sindh'],
    usa: ['California', 'Texas'],
    uk: ['England', 'Scotland'],
  };

  const cityData: any = {
    Punjab: ['Lahore', 'Faisalabad'],
    Sindh: ['Karachi', 'Hyderabad'],
    California: ['Los Angeles', 'San Diego'],
    Texas: ['Houston', 'Dallas'],
  };

  const zipCodeData: any = {
    Lahore: ['54000', '54100'],
    Karachi: ['74000', '74100'],
    'Los Angeles': ['90001', '90002'],
  };

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [zipOptions, setZipOptions] = useState([]);

  const [permissionData, setPermissionData] = useState<Permission []>([
    { id: "1", group: 'Post', add: false, update: false, view: false, delete: false, full: false },
    { id: "2", group: 'Tag', add: false, update: false, view: false, delete: false, full: false },
    { id: "3", group: 'Pages', add: false, update: false, view: false, delete: false, full: false },
    { id: "4", group: 'Category', add: false, update: false, view: false, delete: false, full: false },
    { id: "5", group: 'Request', add: false, update: false, view: false, delete: false, full: false },
    { id: "6", group: 'Contact Us', add: false, update: false, view: false, delete: false, full: false },
    { id: "7", group: 'Comment', add: false, update: false, view: false, delete: false, full: false },
  ]);

  const onCountryChange = (value: any) => {
    setStateOptions(countryData[value] || []);
    setCityOptions([]);
    setZipOptions([]);

    form.setFieldsValue({
      state: undefined,
      city: undefined,
      zipCode: undefined,
    });
  };

  const onStateChange = (value: any) => {
    setCityOptions(cityData[value] || []);
    setZipOptions([]);

    form.setFieldsValue({
      city: undefined,
      zipCode: undefined,
    });
  };

  const onCityChange = (value: any) => {
    setZipOptions(zipCodeData[value] || []);
    form.setFieldsValue({ zipCode: undefined });
  };

 
  const steps: StepsProps['items'] = [
    {
      title: 'Personal Info',
    },
    {
      title: 'Assign Permission',
    },
  ];


  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrent(1);
    } catch {
    }
  };
  

 const handleFinish = async () => {
  try {
    const values = await form.validateFields([
      'userId',
      'username',
      'email',
      'country',
      'state',
      'city',
      'zipCode',
      'phoneNo',
      'password',
      'confirmPassword',
      'userType',
      'department',
      'address1',
      'address2'
    ]);

    const payload = {
      user: values,
      permissions: permissionData,
    };

    const res = await addOnBoardingUser(payload)

    console.log(res.data);
    
    console.log('FINAL DATA:', payload);

    onCancel();
    form.resetFields();
    setPermissionData([]);
    setCurrent(0);

  } catch (errorInfo) {
    console.log('Validation Failed:', errorInfo);
  }
};

const handlePermissionChange = (id: any, key: string, value: boolean) => {
  setPermissionData(prev =>
    prev.map(item => {
      if (item.id !== id) return item;

      let updatedItem = {
        ...item,
        [key]: value
      };

      if ((key === 'add' || key === 'update' || key === 'delete') && value) {
        updatedItem.view = true;
      }

      if ((key === 'add' || key === 'update' || key === 'delete') && !value) {
        const hasAnyPermission =
          updatedItem.add || updatedItem.update || updatedItem.delete;

        if (!hasAnyPermission) {
          updatedItem.view = false;
        }
      }

      if (key === 'view' && !value) {
        updatedItem.add = false;
        updatedItem.update = false;
        updatedItem.delete = false;
      }

      const isFull =
        updatedItem.add &&
        updatedItem.update &&
        updatedItem.view &&
        updatedItem.delete;

      return {
        ...updatedItem,
        full: isFull
      };
    })
  );
};




const handleFullAccessChange = (id: any, value: any) => {
  setPermissionData((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, full: value, add: value, update: value, view: value, delete: value }
        : item
    )
  );
};

// const fetchSidebarPermissions = async () => {
//   try {
//     const res = await getSidebars();

//     const hiddenModules = [
//       'logs',
//       'logs configuration',
//       'dashboard',
//       'iam',
//       'onboarding',
//     ];

//     const formattedPermissions = res.data
//       .filter((item: any) =>
//         !hiddenModules.includes(item.name?.toLowerCase())
//       )
//       .map((item: any) => ({
//         id: item.id,
//         group: item.name,
//         add: false,
//         update: false,
//         view: false,
//         delete: false,
//         full: false,
//       }));

//     setPermissionData(formattedPermissions);
//   } catch (error) {
//     console.error('Failed to load sidebar permissions', error);
//   }
// };

// useEffect(() => {
//   fetchSidebarPermissions()
// }, [])



  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="100%" 
      style={{ top: 20 }}
      destroyOnClose
      closable={false}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', padding: '24px' }}
    >
      <Steps current={current} items={steps} style={{ marginBottom: 24 }} />

      {current === 0 && (
        <Form
          form={form}
          layout="vertical"
          name="personalInfoForm"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="User ID"
                name="userId"
               
                rules={[{ required: true, message: 'User ID is required' }]}
                
              >
                <Input placeholder="Enter user ID" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Username is required' }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Enter valid email' },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: 'Country is required' }]}
              >
                <Select placeholder="Select country" onChange={onCountryChange}>
                  <Select.Option value="pakistan">Pakistan</Select.Option>
                  <Select.Option value="usa">USA</Select.Option>
                  <Select.Option value="uk">UK</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="State" name="state">
                <Select placeholder="Select state" onChange={onStateChange}>
                  {stateOptions.map((state) => (
                    <Select.Option key={state} value={state}>
                      {state}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="City" name="city">
                <Select placeholder="Select city" onChange={onCityChange}>
                  {cityOptions.map((city) => (
                    <Select.Option key={city} value={city}>
                      {city}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Zip Code" name="zipCode">
                <Select placeholder="Select zip code">
                  {zipOptions.map((zip) => (
                    <Select.Option key={zip} value={zip}>
                      {zip}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone No"
                name="phoneNo"
                rules={[{ required: true, message: 'Phone number is required' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
                hasFeedback
              >
                <Input.Password  placeholder="Enter password" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="User Type"
                name="userType"
                rules={[{ required: true, message: 'User type is required' }]}
              >
                <Select placeholder="Select user type">
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Department is required' }]}
              >
                <Select placeholder="Select department">
                  <Select.Option value="quality">Quality</Select.Option>
                  <Select.Option value="production">Production</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Address 1"
                name="address1"
                rules={[{ required: true, message: 'Address 1 is required' }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Address 2"
                name="address2"
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      {current === 1 && (
        <Table
          rowKey={(record) => record.id || Math.random()} 
          pagination={false}
          dataSource={permissionData} 
          scroll={{ y: 400 }} 
          bordered
          
        >
          <Table.Column title="Permission Group" dataIndex="group" key="group" />

          <Table.Column
            title="Add"
            key="add"
            render={(text, record) => (
              <Checkbox
                checked={record.add}
                onChange={(e) => record.id && handlePermissionChange(record.id, 'add', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="Update"
            key="update"
            render={(text, record) => (
              <Checkbox
                checked={record.update}
                onChange={(e) => record.id && handlePermissionChange(record.id, 'update', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="View"
            key="view"
            render={(text, record) => (
              <Checkbox
                checked={record.view}
                onChange={(e) => record.id && handlePermissionChange(record.id, 'view', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="Delete"
            key="delete"
            render={(text, record) => (
              <Checkbox
                checked={record.delete}
                onChange={(e) => record.id && handlePermissionChange(record.id, 'delete', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="Full Access"
            key="full"
            render={(text, record) => (
              <Checkbox
                checked={record.full}
                onChange={(e) => handleFullAccessChange(record.id, e.target.checked)}
              />
            )}
          />
        </Table>
      )}


      <div style={{ marginTop: 24, textAlign: 'right' }}>
        {current > 0 && (
          <Button style={{ marginRight: 8 }} onClick={() => setCurrent(0)}>
            Back
          </Button>
        )}

        {current === 0 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}

        {current === 1 && (
          <Button type="primary" onClick={handleFinish}>
            Finish
          </Button>
        )}
      </div>
    </Modal>
  )
}
