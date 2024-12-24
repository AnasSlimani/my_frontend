import React from 'react'
import CarDetails from '../../Components/CarDetails/Cardetails'
import { useParams } from 'react-router-dom';

const CarDetail = () => {
  const {id} = useParams();
  return (
    <CarDetails idCar={id} />
  )
}

export default CarDetail