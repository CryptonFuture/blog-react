import React from 'react'
import { Layout, theme } from 'antd';

const { Footer } = Layout



export default function Footers() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
  return (
    <>
       <Footer
          style={{
            textAlign: "center",
            margin: 16,
            borderRadius: 50,
            background: colorBgContainer,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </Footer>
    </>
  )
}
