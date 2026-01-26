import React, {useEffect, useState} from 'react'
import { Modal, Form, Input } from "antd";
import { addTag, getTag } from '../../utils/services/tagService';

interface AddPostModalProps {
  open: boolean;
  modalOpen: boolean
  onCancel: () => void;
}
export const AddTagModal: React.FC<AddPostModalProps> = ({ modalOpen, open, onCancel }) => {
        const [form] = Form.useForm();
        const [tags, setTags] = useState([]);

        const handleOk = async () => {
            try {
                const values = await form.validateFields();
                console.log("Tag Data:", values);
               
                await addTag(values);
                
                form.resetFields();
                onCancel();
               
            } catch (error) {
               console.error("Add Tag Error:", error);
            }
        };

  return (
      <Modal
          title="Add Tag"
          open={open}
          onOk={handleOk}
          onCancel={onCancel}
          okText="Save"
      >
          <Form form={form} layout="vertical">
              <Form.Item
                  label="Tag Name"
                  name="tagName"
                  rules={[{ required: true, message: "Please enter tag name" }]}
              >
                  <Input placeholder="Enter tag name" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} placeholder="Enter description" />
              </Form.Item>
          </Form>
      </Modal>
  )
}
