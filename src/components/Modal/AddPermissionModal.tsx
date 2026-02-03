import React, { useState } from 'react'
import { Steps, Button, Table, Checkbox, Modal, Form, Input, Select, Row, Col } from 'antd';
import type { StepsProps } from 'antd';

const { Option } = Select;



interface AddPermissionModalProps {
  open: boolean;
  onCancel: () => void;
}

interface PersonalInfoForm {
  userId: string;
  username: string;
  email: string;
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
      // validation error
    }
  };
  

 const handleFinish = async () => {
  try {
    // Get all form values from Step 0
    const formValues = await form.validateFields();

    // Combine with Step 1 permission data
    const finalData = {
      ...formValues,
      permissions: permissionData, // array from Step 1
    };

    console.log('FINAL DATA:', finalData);

    // Reset everything
    setCurrent(0);
    form.resetFields();
    setPermissionData((prev) =>
      prev.map((item) => ({
        ...item,
        add: false,
        update: false,
        view: false,
        delete: false,
        full: false,
        subPermission1: false,
        subPermission2: false,
      }))
    );

    // Close modal
    onCancel();
  } catch (errorInfo) {
    console.log('Validation Failed:', errorInfo);
  }
};


  const stateOptions = ['California', 'Texas', 'New York', 'Florida'];
  const cityOptions = {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Texas: ['Houston', 'Dallas', 'Austin'],
    'New York': ['New York City', 'Buffalo', 'Albany'],
    Florida: ['Miami', 'Orlando', 'Tampa'],
  };
  const zipCodeOptions = {
    'Los Angeles': ['90001', '90002', '90003'],
    'San Francisco': ['94101', '94102', '94103'],
    Houston: ['77001', '77002', '77003'],
    Dallas: ['75201', '75202', '75203'],
    // Add more mappings as needed
  };

  const [permissionData, setPermissionData] = useState([
  { id: 1, group: 'Post', add: false, update: false, view: false, delete: false, full: false },
  { id: 2, group: 'Tag', add: false, update: false, view: false, delete: false, full: false },
  { id: 3, group: 'Pages', add: false, update: false, view: false, delete: false, full: false },
  { id: 4, group: 'Category', add: false, update: false, view: false, delete: false, full: false },
  { id: 5, group: 'Request', add: false, update: false, view: false, delete: false, full: false },
  { id: 6, group: 'Contact Us', add: false, update: false, view: false, delete: false, full: false },
  { id: 7, group: 'Comment', add: false, update: false, view: false, delete: false, full: false }

  // add more groups as needed
]);

const handlePermissionChange = (id: any, field: any, value: any) => {
  setPermissionData((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
  );
};

// If Full Access is checked, set all checkboxes for that row to true
const handleFullAccessChange = (id: any, value: any) => {
  setPermissionData((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, full: value, add: value, update: value, view: value, delete: value }
        : item
    )
  );
};


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

      {/* STEP CONTENT */}
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

            {/* Country */}
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: 'Country is required' }]}
              >
                <Select placeholder="Select country">
                  <Select.Option value="pakistan">Pakistan</Select.Option>
                  <Select.Option value="usa">USA</Select.Option>
                  <Select.Option value="uk">UK</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/* State */}
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: 'State is required' }]}
              >
                <Select placeholder="Select state">
                  {stateOptions.map((state) => (
                    <Option key={state} value={state}>
                      {state}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* City */}
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'City is required' }]}
              >
                <Select placeholder="Select city">
                  {/* You can dynamically load cities based on selected state */}
                  {cityOptions['California'].map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Zip Code */}
            <Col span={12}>
              <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[{ required: true, message: 'Zip code is required' }]}
              >
                <Select placeholder="Select zip code">
                  {/* You can dynamically load zip codes based on selected city */}
                  {zipCodeOptions['Los Angeles'].map((zip) => (
                    <Option key={zip} value={zip}>
                      {zip}
                    </Option>
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
                <Input.Password placeholder="Enter password" />
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
          rowKey="id"
          pagination={false}
          dataSource={permissionData} // your permission array
          scroll={{ y: 400 }} // scroll if table is long
          bordered
          
        >
          <Table.Column title="Permission Group" dataIndex="group" key="group" />

          <Table.Column
            title="Add"
            key="add"
            render={(text, record) => (
              <Checkbox
                checked={record.add}
                onChange={(e) => handlePermissionChange(record.id, 'add', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="Update"
            key="update"
            render={(text, record) => (
              <Checkbox
                checked={record.update}
                onChange={(e) => handlePermissionChange(record.id, 'update', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="View"
            key="view"
            render={(text, record) => (
              <Checkbox
                checked={record.view}
                onChange={(e) => handlePermissionChange(record.id, 'view', e.target.checked)}
              />
            )}
          />

          <Table.Column
            title="Delete"
            key="delete"
            render={(text, record) => (
              <Checkbox
                checked={record.delete}
                onChange={(e) => handlePermissionChange(record.id, 'delete', e.target.checked)}
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


      {/* FOOTER BUTTONS */}
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
