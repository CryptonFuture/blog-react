import React from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5" >
                    <a className="navbar-brand" href="index.html">Blog</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link to={'/'} className="nav-link px-lg-3 py-3 py-lg-4">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4">About</Link></li>
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4">Sample Post</Link></li>
                            <li className="nav-item"><Link to={'/contact-page'} className="nav-link px-lg-3 py-3 py-lg-4">Contact</Link></li>
                            <li className='nav-item nav-link px-lg-3 py-2 py-lg-3'>
                                <Modal />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
