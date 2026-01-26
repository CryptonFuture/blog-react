import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'antd';

export default function Cards({ item }: any) {
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
             <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    hoverable
                    cover={<img alt={item.title} src={item.image} />}
                >
                    <Card.Meta title={item.title} description={item.description} />
                </Card>
            </Col>
        ) : (
            ''
        )}
           
        </>
    )
}
