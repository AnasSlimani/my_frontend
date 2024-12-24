import React from 'react'
import './Details.css'
import { useState, useEffect } from 'react';
import { HiOutlineCalendar } from "react-icons/hi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";






const Details = (props) => {
  console.log(props.ID);
  const CARid = props.ID;
  const [car, setCar] = useState([]);
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${CARid}`);
        const data = await response.json();
        setCar(data)
      } catch (error) {
        console.log("Error fetching the car : ", error.message)
      }
    }

    fetchCar();
  }, []);
  return (
    <div>
      <div className='text-white' >
        <h2 className='font-bold text-3xl'>{car.marque}</h2>
        <p className='text-sm' > {car.modele} </p>

        <div className='flex gap-2 mt-3'>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3 ' >
            <HiOutlineCalendar className='h-7 w-7 text-primary' />
            <h2 className='text-primary text-sm' > {car.annee} </h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3 ' >
            <IoSpeedometerOutline className='h-7 w-7 text-primary' />
            <h2 className='text-primary text-sm' > {car.maxCount} </h2>
          </div>
          <div className='flex gap-2  items-center bg-blue-50 rounded-full p-2 px-3 ' >
            <GiGearStickPattern className='h-7 w-7 text-primary' />
            <h2 className='text-primary text-sm' > {car.vitesse} </h2>
          </div>
          <div className='flex gap-2  items-center bg-blue-50 rounded-full p-2 px-3 ' >
            <FaGasPump className='h-7 w-7 text-primary' />
            <h2 className='text-primary text-sm' > {car.Fuel} </h2>
          </div>
        </div>
      </div>

      <div>
        {/* <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse">

        </div> */}
      </div>

    </div>
  )
}


export default Details