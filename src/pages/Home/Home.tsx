import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { cardObj } from '../../utils/cardObj'
import { Row, Col, Layout, Empty, Typography, ConfigProvider } from 'antd';
import Cards from '../../components/Card/Cards'
import Footers from '../../components/Footer/Footers'
import Headers from '../../components/Header/Headers';

const { Content } = Layout

export default function Home() {
    const [data, setData] = useState(cardObj)
    
    return (
        <>
            <Navbar />
            <Headers />
            <Content style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 5px' }}>
                <Row gutter={[16, 16]}>
                    {data && data.length > 0 ? (
                        data.map((item: any, index: number) => (
                            <>
                                <Cards key={index} item={{ ...item }} />
                            </>
                        ))
                    ) : (
                        <Col span={24}>
                            <p style={{ textAlign: 'center' }}>No data found</p>
                        </Col>
                    )}
                </Row>
            </Content>
            <Footers />
        </>
    )
}
