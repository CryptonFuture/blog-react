import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ item }: any) {
     const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('access_token');

      
    useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
    }
  }, []);

    return (
        <>
        {isLoggedIn ?(
             <div className='col-12 col-lg-4 mt-3'>
                <div className="card shadow border-0 rounded-3">
                    <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            </div>
        ) : (
             <p className="text-danger">Please log in to view this content.</p>
        )}
           
        </>
    )
}
