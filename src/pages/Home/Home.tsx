import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import { cardObj } from '../../utils/cardObj'
import Footer from '../../components/Footer/Footer'

export default function Home() {
    const [data, setData] = useState(cardObj)
    
    return (
        <>
            <Navbar />
            <Header />
            <div className='container'>
                <div className='row'>
                    {
                        data && data.length > 0 ? data.map((item: any, index) => {
                            return (
                                <>
                                    <Card key={index} item={{ ...item }} />
                                </>
                            )
                        })
                            : "no record found"
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
