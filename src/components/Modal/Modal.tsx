import React, { useState } from 'react'
import './Modal.css'

export default function Modal() {

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
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input type="email" className="form-control form-control-lg" id="exampleFormControlInput1" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                                    <input type="password" className="form-control form-control-lg" id="exampleFormControlInput1" required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-blue-color btn btn-lg border-0 text-white" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn-grey-color btn btn-lg border-0 text-white">
                               submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
