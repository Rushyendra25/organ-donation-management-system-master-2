import React from 'react'
import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import {Outlet} from 'react-router-dom'
import './RootLayout.css'

function RootLayout() {


  return (
    <div>
      <Nav   />
      <div className='out'>
      <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout