import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import RecentWinners from '../../Components/RecentWinners/RecentWinners'
import HowItWorks from '../../Components/HowItWorks/HowItWorks'
import Testimonials from '../../Components/Testimonials/Testimonials'
import LuckyDrawWinners from '../../Components/LuckyDrawWinners/LuckyDrawWinners'

const EnaamWinners = () => {
  return (
    <div>
        <Navbar />
            <RecentWinners/>
            <HowItWorks/>
            <LuckyDrawWinners/>
            <Testimonials/>
        <Footer/>
    </div>
  )
}

export default EnaamWinners