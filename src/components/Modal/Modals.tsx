import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios';
import { instance } from '../../utils/axiosConfig';
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { Modal, Form, Input, Button } from 'antd';
import { Dropdown, Menu } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined, DownOutlined, DashboardOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from 'react-router-dom'

interface LoginData {
    email: string,
    password: string,
    role: any
}

declare global {
    interface Window {
        bootstrap: any;
    }
}



export default function Modals() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<LoginData>({
        email: "",
        password: "",
        role: 1
    })

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setTimeout(() => {
            window.location.reload();
        }, 100)
        setIsLoggedIn(false);
    };

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const items: any = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            onClick: () => {
                console.log("Go to Dashboard");
                navigate("/dashboard");
            },
        },
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "Profile",
            onClick: () => {
                console.log("Go to Profile");
            },
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Settings",
            onClick: () => {
                console.log("Go to Settings");
            },
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            danger: true,
            onClick: handleLogout,
        },
    ];

    const login = async () => {
        try {
            setOpen(false);
            const res = await instance.post(`/login`, data)

            setData({
                email: "",
                password: "",
                role: ""
            })

            toast.success(res.data.message)


            localStorage.setItem('id', res.data.user.id)
            localStorage.setItem('email', res.data.user.email)
            localStorage.setItem('tokenType', res.data.user.tokenType)
            localStorage.setItem('access_token', res.data.token)


            // const modalElement = document.getElementById('exampleModal');

            // if (modalElement) {
            //     const modal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
            //     modal.hide();
            // }

            setTimeout(() => {
                window.location.reload();
            }, 7000);
        } catch (err: any) {
            setOpen(true);
            if (err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("An unexpected error occurred.");
            }

        }

    }

    return (
        <>
            {!isLoggedIn ? (

                <Button onClick={() => setOpen(true)}>LOGIN</Button>

            ) : (

                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                >
                    <Button>
                        Account <DownOutlined />
                    </Button>
                </Dropdown>
            )}

            <Modal
                title="Login"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={login}
                    initialValues={data}
                >
                    <Form.Item
                        label="Email address"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Enter a valid email' }
                        ]}
                    >
                        <Input
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password' },
                            { min: 10, message: 'Password must be at least 10 characters long' }
                        ]}
                    >
                        <Input.Password
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                        />
                    </Form.Item>

                    <div style={{ textAlign: 'right' }}>
                        <Button
                            style={{ marginRight: 8 }}
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>

                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal>

            <ToastContainer />
        </>
    )
}
