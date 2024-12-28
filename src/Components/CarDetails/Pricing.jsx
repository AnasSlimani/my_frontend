import { Button } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Pricing(props) {
    const CARid = props.ID;
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
        
    return (
    <div className='p-10 rounded-xl border-2 shadow-md text-black lighgrey ' >
        <h2 >Our Price : </h2>
        <h2 className='font-bold text-4xl  mt-2 ' > {car.prix} DH </h2>

        <Button className='w-full bg-white text-black mt-3' size='lg' ><MdOutlineLocalOffer className='text-lg mr-2 text-black' />RESERVE</Button>
    </div>
  )
}
