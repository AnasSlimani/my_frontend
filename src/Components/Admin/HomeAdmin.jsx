// import React from 'react'

import React, { useState, useEffect } from 'react';

import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

 import { FaCar, FaUsers, FaUserShield, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

function HomeAdmin() {



  const [clientsCount, setClientsCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);

    useEffect(() => {
        // Appel à l'API avec fetch
        const fetchClientsCount = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/utilisateur/count'); // URL du backend
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json(); // Assurez-vous que la réponse est au format JSON
                setClientsCount(data); // Mettez à jour l'état avec le nombre de clients
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de clients:', error);
            }
        };

        fetchClientsCount();
    }, []); // [] pour n'exécuter qu'une fois lors du montage

    useEffect(() => {
        // Appel à l'API avec fetch
        const fetchVehiculesCount = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/vehicules/count'); // URL du backend
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json(); // Assurez-vous que la réponse est au format JSON
                setVehiclesCount(data); // Mettez à jour l'état avec le nombre de vehicules
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de clients:', error);
            }
        };

        fetchVehiculesCount();
    }, []); // [] pour n'exécuter qu'une fois lors du montage

    useEffect(() => {
        // Appel à l'API avec fetch
        const fetchReservationCount = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/reservation/count'); // URL du backend
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json(); // Assurez-vous que la réponse est au format JSON
                setReservationCount(data); // Mettez à jour l'état avec le nombre de reservation
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de clients:', error);
            }
        };

        fetchReservationCount();
    }, []); // [] pour n'exécuter qu'une fois lors du montage


    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card text-black'>
                <div className='card-inner '>
                    <h3>Reservations</h3>
                    <FaCalendarCheck className='card_icon'/>
                </div>
                <h1>{reservationCount}</h1>
            </div>
            <div className='card text-black'>
                <div className='card-inner '>
                    <h3>Vehicules</h3>
                    <FaCar className='card_icon'/>
                </div>
                <h1>{vehiclesCount}</h1>
            </div>
            <div className='card text-black'>
                <div className='card-inner'>
                    <h3>Clients</h3>
                    <FaUsers className='card_icon'/>
                </div>
                <h1>{clientsCount}</h1>
            </div>
            <div className='card text-black'>
                <div className='card-inner'>
                    <h3>Chiffre d'affaires</h3>
                    <FaDollarSign className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default HomeAdmin;