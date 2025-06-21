import React, { useState } from 'react'
import './Modal.css'
import axios from 'axios';

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

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const login = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/api/v1/login', data)

            setData({
                email: "",
                password: ""
            })

            console.log(res.data);
            

            const modalElement = document.getElementById('exampleModal');

            if (modalElement) {
                const modal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
                modal.hide();
            }
        } catch (error) {

        }

    }

    return (
        <>
            <button type="button" className="btn-blue-color btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                LOGIN
            </button>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content models">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST'>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input name='email' value={data.email} onChange={handleOnChange} type="email" className="form-control form-control-lg" id="exampleFormControlInput1" required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                                    <input name='password' value={data.password} onChange={handleOnChange} type="password" className="form-control form-control-lg" id="exampleFormControlInput1" required />

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-blue-color btn btn-lg border-0 text-white" data-bs-dismiss="modal">Close</button>
                            <button onClick={login} type="button" className="btn-grey-color btn btn-lg border-0 text-white">
                                submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
