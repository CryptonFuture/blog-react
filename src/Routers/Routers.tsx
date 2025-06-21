import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Contact from '../pages/Contact/Contact'

export default function Routers() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact-page' element={<Contact />} />
        </Routes>
      </Router>
    </>
  )
}
