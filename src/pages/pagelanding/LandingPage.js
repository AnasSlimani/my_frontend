import React from 'react'
import Navbar from '../../Components/LandingPage/Navbar';
import Header from '../../Components/LandingPage/Header';
import About from '../../Components/LandingPage/About';
import Services from '../../Components/LandingPage/Services';
import Cars from '../../Components/LandingPage/Cars';
import Clients from '../../Components/LandingPage/Clients';


const LandingPage = () => {
  return (
    <>
        <Navbar />
        <Header />
        <About />
        <Services />
        <Cars />
        <Clients />
    </>
  )
}

export default LandingPage