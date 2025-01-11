import React, { useState, useEffect } from 'react'
import { Check } from 'lucide-react'

const Features = ({ ID }) => {
  const [features, setFeatures] = useState([])

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${ID}`)
        const data = await response.json()
        if (data.features) {
          const parsedFeatures = typeof data.features === 'string' 
            ? JSON.parse(data.features) 
            : data.features
          setFeatures(Object.entries(parsedFeatures))
        }
      } catch (error) {
        console.error("Error fetching features:", error)
      }
    }

    fetchFeatures()
  }, [ID])

  return (
    <div className="bg-white rounded-2xl shadow-sm transition-all duration-300 
                    hover:shadow-lg hover:translate-y-[-2px]">
      <div className='p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 relative inline-block'>
          Features
          <span className="absolute bottom-[-4px] left-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {features.map(([key, value]) => value && (
            <div 
              key={key}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors
                         hover:bg-blue-50 group"
            >
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-blue-600 transition-transform 
                                group-hover:scale-110" />
              </div>
              <span className="text-gray-700 font-medium">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features

