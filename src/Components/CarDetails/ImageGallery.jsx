import React from 'react'
import { useState, useEffect } from 'react';

export default function ImageGallery(props) {
  const CARid = props.ID;
  const [car, setCar] = useState([]);

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
    <div className="group">
      <img 
        src={`http://localhost:8082${car.detailpic}`} 
        className='w-full h-[500px] object-cover rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300' 
        alt={`${car.marque} ${car.modele}`}
      />
    </div>
  )
}

