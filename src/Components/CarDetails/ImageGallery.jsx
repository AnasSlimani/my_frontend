import React, { useState, useEffect } from 'react'

const ImageGallery = ({ ID }) => {
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${ID}`)
        const data = await response.json()
        setCar(data)
      } catch (error) {
        console.error("Error fetching car:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [ID])

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 w-full h-[500px] rounded-2xl"></div>
    )
  }

  return (
    <div className="relative group">
      <img
        src={`http://localhost:8082${car?.detailpic}`}
        alt={`${car?.marque} ${car?.modele}`}
        className="w-full h-[500px] object-cover rounded-2xl shadow-lg
                 transition-all duration-500 group-hover:shadow-xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    rounded-2xl" />
    </div>
  )
}

export default ImageGallery

