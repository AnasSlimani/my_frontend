import { Icon } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaCarAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FiType } from "react-icons/fi";
import { IoMan } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";

import { MdDateRange } from "react-icons/md";
import { useNavigate } from 'react-router-dom';




export default function Specifications(props) {
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
        <div className='p-5 rounded-xl border-2 shadow-md mt-3 specification ' >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <FaCarAlt className="text-white text-lg" />
                    </span>
                    <span>Marque</span>
                </div>
                <span>{car.marque}</span>
            </div>
            <div className="flex items-center justify-between mt-10">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <FaCheckCircle className="text-white text-lg" />
                    </span>
                    <span>Modele</span>
                </div>
                <span>{car.modele}</span>
            </div>
            <div className="flex items-center justify-between mt-10">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <FiType className="text-white text-lg" />
                    </span>
                    <span>Type</span>
                </div>
                <span>{car.vehiculeType}</span>
            </div>
            <div className="flex items-center justify-between mt-10">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <MdDateRange className="text-white text-lg" />
                    </span>
                    <span>Annee</span>
                </div>
                <span>{car.annee}</span>
            </div>
            <div className="flex items-center justify-between mt-10">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <IoMan className="text-white text-lg" />
                    </span>
                    <span>Nbr Reservateurs</span>
                </div>
                <span >{car.nbrReservateurs}</span>
            </div>
            <div className="flex items-center justify-between mt-10">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <MdOutlineProductionQuantityLimits className="text-white text-lg" />
                    </span>
                    <span>Quantite</span>
                </div>
                <span >{car.quantite}</span>
            </div>
            <div className="flex items-center justify-between mt-10">
                <div className="flex items-center gap-3 font-bold">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        <GrStatusInfo className="text-white text-lg" />
                    </span>
                    <span>Status</span>
                </div>
                <span >{car.status}</span>
            </div>
        </div>
    )
}
