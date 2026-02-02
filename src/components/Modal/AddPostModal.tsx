import React from 'react'
import { Modal, Form, Input } from "antd";
import { addPost, getPublishedPost } from '../../utils/services/postService';

interface AddPostModalProps {
  open: boolean;
  onCancel: () => void;
}

export const AddPostModal: React.FC<AddPostModalProps> = ({ open, onCancel }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log("Post Data:", values);
             onCancel();
            await addPost(values);
            // await getPublishedPost()
            form.resetFields();
           
        } catch (error) {
           console.error("Add Post Error:", error);
        }
    };
  return (
      <Modal
          title="Add Post"
          open={open}
          onOk={handleOk}
          onCancel={onCancel}
          okText="Save"
      >
          <Form form={form} layout="vertical">
              <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Please enter title" }]}
              >
                  <Input placeholder="Enter post title" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} placeholder="Enter description" />
              </Form.Item>
          </Form>
      </Modal>
  )
}
