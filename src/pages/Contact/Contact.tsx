import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Contact.css'


export default function Contact() {
    const [message, setMessage] = useState('');
    const maxLength = 200;

    const handleChange = (e: any) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setMessage(value);
        }
    };
    return (
        <>
            <Navbar />
            <Header />
            <div className='container'>
                <div className='row justify-content-center align-item-center'>
                    <div className='col-12 col-lg-6'>
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Name</label>
                                <input type="text" className="form-control focus-ring focus-ring-light border-0 border-bottom rounded-3" id="inputEmail4" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Email</label>
                                <input type="email" className="form-control focus-ring focus-ring-light border-0 border-bottom rounded-3" id="inputPassword4" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Phone Number</label>
                                <input type="text" className="form-control focus-ring focus-ring-light border-0 border-bottom rounded-3" id="inputAddress" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Message</label>
                                <textarea value={message}
                                  required  onChange={handleChange} maxLength={200} className="form-control focus-ring focus-ring-light border-0 border-bottom rounded-3" id="exampleFormControlTextarea1" rows={3}></textarea>
                            </div>
                            <div className="text-end text-muted small">
                                
                                {message.length}/{maxLength}
                            </div>
                            {message.length === maxLength && (
                                <div className="text-danger mt-1">Maximum 200 characters allowed.</div>
                            )}
                            <div className="col-12">
                                <button type="submit" className="btn btn-purple-color border-0 text-white">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
