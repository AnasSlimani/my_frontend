import React, { useState, useEffect } from 'react'
import './Details.css'
import { Calendar, Gauge, GaugeCircle, Fuel } from 'lucide-react'

const Details = ({ ID }) => {
  const [car, setCar] = useState(null)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${ID}`)
        const data = await response.json()
        setCar(data)
      } catch (error) {
        console.error("Error fetching car details:", error)
      }
    }

    fetchCar()
  }, [ID])

  if (!car) return null

  const stats = [
    { icon: Calendar, label: car.annee },
    { icon: Gauge, label: `${car.maxCount} km` },
    { icon: GaugeCircle, label: car.vitesse },
    { icon: Fuel, label: car.Fuel }
  ]

  return (
    <div className="animate-fadeIn">
      <div className='text-gray-900'>
        <h1 className='font-bold text-4xl md:text-5xl tracking-tight'>{car.marque}</h1>
        <p className='text-lg text-gray-600 mt-2'>{car.modele}</p>

        <div className='flex flex-wrap gap-3 mt-6'>
          {stats.map((Stat, index) => (
            <div 
              key={index}
              className='flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm
                       transition-all duration-300 hover:shadow-md hover:scale-105'
            >
              <Stat.icon className='h-5 w-5 text-blue-600' />
              <span className='text-gray-700 font-medium'>{Stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Details

