import React from 'react'
import CarNavBare from './CarNavBare'
import Details from './Details'
import './Details.css'
import { useParams } from 'react-router-dom'
import ImageGallery from './ImageGallery'
import Description from './Description'
import Features from './Features'
import Pricing from './Pricing'
import Specifications from './Specifications'
import { useNavigate } from 'react-router-dom';

const Cardetails = (props) => {
  const idCar = props.idCar;
  return (
    <>
      <CarNavBare />
      <div className='p-10 md:px-20 mt-20  carDETAIL'>
        
        <Details ID={idCar} />

        <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5' >

          
          {/* left */}
          <div className='md:col-span-2' >
            {/* Image Gallery */}
              <ImageGallery ID={idCar} />
            {/* Description */}
              <Description ID={idCar} />
            {/* Features List */}
              <Features ID={idCar} />
          </div>
          
          
          {/* right */}
          <div>
            {/* Pricing */}
              <Pricing ID={idCar} />

            {/* Car Properties */}
              <Specifications ID={idCar} />
          </div>
        </div>

      </div>
    </>

  )
}

export default Cardetails