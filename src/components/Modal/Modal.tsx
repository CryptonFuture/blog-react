import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios';
import { instance } from '../../utils/axiosConfig';
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'

interface LoginData {
    email: string,
    password: string
}

declare global {
    interface Window {
        bootstrap: any;
    }
}

export default function Modal() {
    const [data, setData] = useState<LoginData>({
        email: "",
        password: ""
    })

     const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const login = async (e: any) => {
        e.preventDefault()
        try {
            const res = await instance.post(`/login`, data)

            setData({
                email: "",
                password: ""
            })

            toast.success(res.data.message)


            localStorage.setItem('id', res.data.user.id)
            localStorage.setItem('email', res.data.user.email)
            localStorage.setItem('tokenType', res.data.user.tokenType)
            localStorage.setItem('access_token', res.data.token)


            const modalElement = document.getElementById('exampleModal');

            if (modalElement) {
                const modal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
                modal.hide();
            }

             setTimeout(() => {
                window.location.reload();
            }, 7000);
        } catch (err: any) {
            if(err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("An unexpected error occurred.");
            }
            
        }

    }

    return (
        <>
        {!isLoggedIn ? (

            <button type="button" className="btn-blue-color btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                LOGIN
            </button>

        ): (
            <button
                type="button"
                className="btn-red-color btn text-white"
                onClick={handleLogout}
            >
                LOGOUT
            </button>
        )}

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content models">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                            <button type="button" className="btn-close btn-close-color" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST'>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input name='email' value={data.email} onChange={handleOnChange} type="email" className="form-control" id="exampleFormControlInput1" required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                                    <input name='password' value={data.password} onChange={handleOnChange} type="password" className="form-control" id="exampleFormControlInput1" required />

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-blue-color btn border-0 text-white" data-bs-dismiss="modal">Close</button>
                            <button onClick={login} type="button" className="btn-grey-color btn border-0 text-white">
                                submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
