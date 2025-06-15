import React from 'react'

export default function Card({ item }: any) {
    return (
        <>
            <div className='col-12 col-lg-4 mt-3'>
                <div className="card shadow border-0 rounded-3">
                    <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
