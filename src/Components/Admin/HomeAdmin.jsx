import React, { useState, useEffect } from 'react';
import { FaCalendarCheck, FaCar, FaUsers, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './homeadmin.css';

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
    }, []);

  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Reservations</h3>
            <FaCalendarCheck className='card_icon'/>
          </div>
          <h1>{reservationCount}</h1>
          <span className="percentage">+3.2% vs last month</span>
        </div>
        
        <div className='card'>
          <div className='card-inner'>
            <h3>Vehicules</h3>
            <FaCar className='card_icon'/>
          </div>
          <h1>{vehiclesCount}</h1>
          <span className="percentage">+3.2% vs last month</span>
        </div>
        
        <div className='card'>
          <div className='card-inner'>
            <h3>Clients</h3>
            <FaUsers className='card_icon'/>
          </div>
          <h1>{clientsCount}</h1>
          <span className="percentage">+5.9% vs last month</span>
        </div>
        
        <div className='card'>
          <div className='card-inner'>
            <h3>Chiffre d'affaires</h3>
            <FaDollarSign className='card_icon'/>
          </div>
          <h1>42</h1>
          <span className="percentage">+8.4% vs last month</span>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4361ee" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4361ee" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default HomeAdmin;

