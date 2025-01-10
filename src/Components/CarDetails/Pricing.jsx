import { Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, UsersInfos } from '../../Components/auth/Authentification';

export default function Pricing({ ID, onReserve }) {
  const CARid = ID;
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [car, setCar] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${CARid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 401) {
          alert("Session expire");
          navigate("/login");
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.log("Error fetching the car: ", error.message);
      }
    };

    fetchCar();
  }, [CARid, navigate, token]);

  const handleReserve = async () => {
    const token = isAuthenticated();
    if (!token) {
      alert("Please login to reserve a car");
      navigate("/login");
      return;
    }

    try {
      const decodedToken = UsersInfos();
      if (!decodedToken) {
        alert("Invalid user information. Please log in again.");
        navigate("/login");
        return;
      }

      const { id, FirstName: firstName, LastName: lastName, sub: email, role } = decodedToken;
      const user = { id, firstName, lastName, email, role };
      
      const combineForm = {
        status: "entretient",
        utilisateur: user,
        vehicule: car,
      };

      const response = await fetch("http://localhost:8082/api/reservation/addreservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(combineForm),
      });

      if (response.ok) {
        if (onReserve) {
          onReserve(car);
        }
        alert("Reservation added successfully!");
      } else {
        console.log(response.status);
        alert("Failed to add reservation");
      }
    } catch (error) {
      console.error('Error adding car to cart:', error);
      alert('Failed to add car to cart');
    }
  };

  return (
    <div className='p-10 rounded-xl border-2 shadow-md text-black lighgrey'>
      <h2>Our Price : </h2>
      <h2 className='font-bold text-4xl mt-2'>{car.prix} DH</h2>
      <Button 
        className='w-full bg-white text-black mt-3' 
        size='lg'
        onClick={handleReserve}
      >
        <MdOutlineLocalOffer className='text-lg mr-2 text-black' />
        RESERVE
      </Button>
    </div>
  );
}