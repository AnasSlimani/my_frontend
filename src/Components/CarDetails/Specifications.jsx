import React, { useState, useEffect } from 'react'
import { Car, CheckCircle, Type, Calendar, Users, Package, Info } from 'lucide-react'

const Specifications = ({ ID }) => {
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

  const specs = [
    { icon: Car, label: 'Marque', value: car?.marque },
    { icon: CheckCircle, label: 'Modele', value: car?.modele },
    { icon: Type, label: 'Type', value: car?.vehiculeType },
    { icon: Calendar, label: 'Annee', value: car?.annee },
    { icon: Users, label: 'Nbr Reservateurs', value: car?.nbrReservateurs },
    { icon: Package, label: 'Quantite', value: car?.quantite },
    { icon: Info, label: 'Status', value: car?.status }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm mt-6 transition-all duration-300 
                    hover:shadow-lg hover:translate-y-[-2px]">
      <div className='p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 relative inline-block'>
          Specifications
          <span className="absolute bottom-[-4px] left-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
        </h2>

        <div className="space-y-4">
          {specs.map((spec, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-xl
                         transition-colors hover:bg-blue-50 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 
                              transition-colors">
                  <spec.icon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">{spec.label}</span>
              </div>
              <span className="text-gray-600">{spec.value || '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Specifications

