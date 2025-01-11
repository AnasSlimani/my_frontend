import React, { useState, useEffect } from 'react'

const Description = ({ ID }) => {
  const [car, setCar] = useState(null)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${ID}`)
        const data = await response.json()
        setCar(data)
      } catch (error) {
        console.error("Error fetching car:", error)
      }
    }

    fetchCar()
  }, [ID])

  return (
    <div className="bg-white rounded-2xl shadow-sm transition-all duration-300 
                    hover:shadow-lg hover:translate-y-[-2px]">
      <div className='p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4 relative inline-block'>
          Description
          <span className="absolute bottom-[-4px] left-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {car?.description || 'Loading description...'}
        </p>
      </div>
    </div>
  )
}

export default Description

