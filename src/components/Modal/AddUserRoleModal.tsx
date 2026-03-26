import React from 'react'
import { Modal, Form, Input } from "antd";
import { addPage, getPages } from '../../utils/services/pageService';

interface AddUserRoleModalProps {
    opens: boolean;
    onClose: () => void;
}

export const AddUserRoleModal: React.FC<AddUserRoleModalProps> = ({ opens, onClose }) => {
     const [form] = Form.useForm();
    
        const handleOk = async () => {
            try {
                const values = await form.validateFields();
                console.log("Page Data:", values);
                await addPage(values)
                onClose();
                form.resetFields();
    
            } catch (error) {
                console.error("Add Page Error:", error);
            }
        };
  return (
      <Modal
          title="Assign New Role"
          open={opens}
          onOk={handleOk}
          onCancel={onClose}
          okText="Save"
      >
          <Form form={form} layout="vertical">
              <Form.Item
                  label="Role Name"
                  name="roleName"
                  rules={[{ required: true, message: "Please enter role name" }]}
              >
                  <Input placeholder="Enter role name" />
              </Form.Item>

              <Form.Item
                  label="Role Value"
                  name="roleValue"
                  rules={[{ required: true, message: "Please enter role value" }]}
              >
                  <Input placeholder="Enter role value" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} placeholder="Enter description" />
              </Form.Item>
          </Form>
      </Modal>
  )
}
