import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import HangTowerWinners from '../../Components/HangTowerWinners/HangTowerWinners'
import Testimonials from '../../Components/Testimonials/Testimonials'


const HangTowerPage = () => {
  return (
    <div>
      <Navbar/>
      <HangTowerWinners/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default HangTowerPage
