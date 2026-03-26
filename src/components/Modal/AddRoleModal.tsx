import React, { useEffect, useState } from "react";
import { Steps, Button, Table, Checkbox, Modal, Form, Input, Select, Row, Col, message } from 'antd';
import type { StepsProps } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { getUser } from '../../utils/services/userService'
import { getRole } from '../../utils/services/roleService'
import { assignRole, assignNewRole } from '../../utils/services/assignService'

type SizeType = ConfigProviderProps['componentSize'];

interface PostProps {
    size?: "small" | "middle" | "large";
}

interface AssignRoleModalProps {
    open: boolean;
    onCancel: () => void;
}

export const AddRoleModal: React.FC<AssignRoleModalProps> = ({ open, onCancel }) => {
    const [current, setCurrent] = useState<number>(0);
    const [form] = Form.useForm<any>();
    const [size, setSize] = useState<SizeType>('large');
    const [data, setData] = useState<any[]>([]);
    const [role, setRole] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [formValues, setFormValues] = useState({
        name: "",
        role: "",
        description: ""
    })
    

    const [loading, setLoading] = useState<boolean>(false);

    const steps: StepsProps['items'] = [
        {
            title: 'Select Users',
        },
        {
            title: 'Select Roles',
        },
        {
            title: 'Assign New Role'
        }
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));

        form.setFieldsValue({ [name]: value }); // sync with antd form
    };


    const handleNext = async () => {
        if (current === 0 && selectedUsers.length === 0) {
            message.error('Please select at least one user');
            return;
        }

        if (current === 1 && selectedRoles.length === 0) {
            message.error('Please select at least one role');
            return;
        }

        setCurrent(current + 1);
    };

    const handleFinish = async () => {
        try {
            
            await form.validateFields()

            const payload = {
                selectedUsers,
                selectedRoles
            }

            const dataPayload = {
                name: formValues.name,
                role: formValues.role,
                description: formValues.description
            }

            await Promise.all([
                assignRole(payload),
                assignNewRole(dataPayload)
            ])

        
            setLoading(true);

            message.success("Roles assigned successfully");

            onCancel();
            form.resetFields();
            setCurrent(0);
        } catch (err: any) {
            message.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getUsers = async (

    ) => {
        setLoading(true);
        try {
            const res = await getUser()
            setData(res.data)

            console.log(res.data, 'res');


        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
        finally {
            setLoading(false);
        }

    }


    const getRoles = async (

    ) => {
        setLoading(true);
        try {
            const res = await getRole()
            setRole(res.data)

            console.log(res.data, 'res');


        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (open) {
            getUsers()
            getRoles()
            form.resetFields();
            setSelectedUsers([]);
            setSelectedRoles([]);
            setFormValues({
                name: "",
                role: "",
                description: ""
            })
            setCurrent(0);
        }

    }, [open]);

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            width={1000}
            style={{ top: 20 }}
            destroyOnClose
            closable={false}
            bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', padding: '24px' }}
        >
            <Steps current={current} items={steps} style={{ marginBottom: 24 }} />

            <Form
                form={form}
                layout="vertical"
                name="assignRoleForm"

            >
                {current === 0 && (

                    <Row gutter={[16, 16]}>
                        {/* Select Users */}
                        <Col span={12}>
                            <Form.Item
                                name="selectedUsers"
                                rules={[{ required: true, message: 'Please select at least one user' }]}
                            >
                                <Checkbox.Group
                                    value={selectedUsers}
                                    onChange={(values) => {
                                        setSelectedUsers(values as string[]);
                                        form.setFieldsValue({ selectedUsers: values });
                                    }}
                                    style={{ width: '100%' }}>
                                    <Row gutter={[16, 16]}>
                                        {data.map(user => (
                                            <Col span={12} key={user._id}>
                                                <Checkbox value={user._id}>{user.firstname} {user.lastname}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>


                    </Row>

                )}

                {current === 1 && (

                    <Row gutter={[16, 16]}>
                        {/* Select Roles */}
                        <Col span={12}>
                            <Form.Item
                                name="selectedRoles"
                                rules={[{ required: true, message: 'Please select at least one role' }]}
                            >
                                <Checkbox.Group
                                    value={selectedRoles}
                                    onChange={(values) => {
                                        setSelectedRoles(values as string[]);
                                        form.setFieldsValue({ selectedRoles: values });
                                    }}
                                    style={{ width: '100%' }}>
                                    <Row gutter={[16, 16]}>
                                        {role.map(role => (
                                            <Col span={12} key={role._id}>
                                                <Checkbox value={role._id}>{role.name}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>


                    </Row>


                )}

                {current === 2 && (
                    <>
                        <Form.Item
                            label="Role Name"
                            name="name"
                             rules={[{ required: true, message: "Please enter role name" }]}
                        >
                            <Input name="name" value={formValues.name} onChange={handleChange} placeholder="Enter role name" />
                        </Form.Item>

                        <Form.Item
                            label="Role Value"
                            name="role"
                           rules={[{ required: true, message: "Please enter role value" }]}
                        >
                            <Input  name="role" value={formValues.role} onChange={handleChange} placeholder="Enter role value" />
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <Input.TextArea name="description" value={formValues.description} onChange={handleChange} rows={4} placeholder="Enter description" />
                        </Form.Item>
                    </>
                )}

               
            </Form>


            <div style={{ marginTop: 24, textAlign: 'right' }}>
                {current > 0 && (
                    <Button style={{ marginRight: 8 }} onClick={() => setCurrent(0)}>
                        Back
                    </Button>
                )}

                {current < 2 && (
                    <Button type="primary" onClick={handleNext}>
                        Next
                    </Button>
                )}

                {current === 2 && (
                    <Button type="primary" loading={loading} onClick={handleFinish}>
                        Finish
                    </Button>
                )}
            </div>
        </Modal>
    )
}
