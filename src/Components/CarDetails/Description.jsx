import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Description(props) {
    const CARid = props.ID;
    const navigate = useNavigate();
    const [car, setCar] = useState([]);
    const token = localStorage.getItem("jwtToken");
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/vehicules/${CARid}`);
                if (response.status === 401) {
                    alert("Session expire");
                    navigate("/login");
                  }
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
            <div className='p-10 rounded-xl shadow-md mt-6 border-2 text-white ' >
                <h2 className='my-2 font-bold text-2xl' >Description</h2>
                <p> {car.description} </p>
            </div>
        </div>
    )
}
