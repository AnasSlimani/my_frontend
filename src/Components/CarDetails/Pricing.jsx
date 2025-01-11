import React, { useState, useEffect } from 'react'
import { Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, UsersInfos } from '../../Components/auth/Authentification'

const Pricing = ({ ID, onReserve }) => {
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("jwtToken")

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${ID}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (response.status === 401) {
          alert("Session expired")
          navigate("/login")
          return
        }
        const data = await response.json()
        setCar(data)
      } catch (error) {
        console.error("Error fetching car:", error)
      }
    }

    fetchCar()
  }, [ID, navigate, token])

  const handleReserve = async () => {
    const token = isAuthenticated()
    if (!token) {
      alert("Please login to reserve a car")
      navigate("/login")
      return
    }

    setLoading(true)
    try {
      const decodedToken = UsersInfos()
      if (!decodedToken) {
        alert("Invalid user information. Please log in again.")
        navigate("/login")
        return
      }

      const { id, FirstName: firstName, LastName: lastName, sub: email, role } = decodedToken
      const user = { id, firstName, lastName, email, role }
      
      const reservationData = {
        status: "entretient",
        utilisateur: user,
        vehicule: car,
      }

      const response = await fetch("http://localhost:8082/api/reservation/addreservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      })

      if (response.ok) {
        if (onReserve) {
          onReserve(car)
        }
        alert("Reservation added successfully!")
      } else {
        console.error('Response status:', response.status)
        alert("Failed to add reservation")
      }
    } catch (error) {
      console.error('Error adding reservation:', error)
      alert('Failed to add reservation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm transition-all duration-300 
                    hover:shadow-lg hover:translate-y-[-2px]">
      <div className='p-8'>
        <div className="flex items-center justify-between mb-6">
          <h2 className='text-2xl font-bold text-gray-900'>Our Price</h2>
          <Tag className="h-6 w-6 text-blue-600" />
        </div>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {car?.prix || '0'} DH
          </span>
        </div>

        <button
          onClick={handleReserve}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-xl py-4 font-semibold
                   transition-all duration-300 hover:bg-blue-700 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   flex items-center justify-center gap-2"
        >
          <Tag className="h-5 w-5" />
          {loading ? 'Processing...' : 'RESERVE'}
        </button>
      </div>
    </div>
  )
}

export default Pricing

