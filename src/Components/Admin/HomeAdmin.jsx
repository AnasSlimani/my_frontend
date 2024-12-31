import React, { useState, useEffect } from 'react';
import { FaCalendarCheck, FaCar, FaUsers, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './homeadmin.css';

function HomeAdmin() {
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    const fetchClientsCount = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/utilisateur/count');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setClientsCount(data);
      } catch (error) {
        console.error('Error fetching client count:', error);
      }
    };

    fetchClientsCount();
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
          <h1>300</h1>
          <span className="percentage">+3.2% vs last month</span>
        </div>
        
        <div className='card'>
          <div className='card-inner'>
            <h3>Vehicules</h3>
            <FaCar className='card_icon'/>
          </div>
          <h1>12</h1>
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

