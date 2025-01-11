import React from 'react'
import CarNavBare from './CarNavBare'
import Details from './Details'
import './Details.css'
import ImageGallery from './ImageGallery'
import Description from './Description'
import Features from './Features'
import Pricing from './Pricing'
import Specifications from './Specifications'

const CarDetails = ({ idCar }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <CarNavBare />
      <div className='p-6 md:p-10 lg:px-20 mt-20 max-w-7xl mx-auto'>
        <Details ID={idCar} />

        <div className='grid grid-cols-1 lg:grid-cols-3 w-full mt-10 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            <ImageGallery ID={idCar} />
            <Description ID={idCar} />
            <Features ID={idCar} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-6">
              <Pricing ID={idCar} />
              <Specifications ID={idCar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails

