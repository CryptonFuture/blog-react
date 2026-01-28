import React from 'react'
import { Modal, Form, Input } from "antd";
import { addPage, getPage } from '../../utils/services/pageService';

interface AddPageModalProps {
  open: boolean;
  modalOpen: boolean
  onCancel: () => void;
}

export const AddPageModal: React.FC<AddPageModalProps> = ({ modalOpen, open, onCancel }) => {
     const [form] = Form.useForm();
    
        const handleOk = async () => {
            try {
                const values = await form.validateFields();
                console.log("Page Data:", values);
                await addPage(values)
                await getPage()
                onCancel();
                form.resetFields();
               
            } catch (error) {
               console.error("Add Page Error:", error);
            }
        };
  return (
    <Modal
              title="Add Page"
              open={open}
              onOk={handleOk}
              onCancel={onCancel}
              okText="Save"
          >
              <Form form={form} layout="vertical">
                  <Form.Item
                      label="Page Name"
                      name="pageName"
                      rules={[{ required: true, message: "Please enter page name" }]}
                  >
                      <Input placeholder="Enter page name" />
                  </Form.Item>

                  <Form.Item
                      label="Page Url"
                      name="pageUrl"
                      rules={[{ required: true, message: "Please enter page url" }]}
                  >
                      <Input placeholder="Enter page url" />
                  </Form.Item>
    
                  <Form.Item label="Description" name="description">
                      <Input.TextArea rows={4} placeholder="Enter description" />
                  </Form.Item>
              </Form>
          </Modal>
  )
}
