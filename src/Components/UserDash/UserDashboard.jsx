import React, { useState, useEffect } from 'react';
import Cars from './Cars';
import Panier from './Panier';
import NavBare from '../LandingPage/NavBare';
import FilterSection from './FilterSection';
import './section.css';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const [showPanier, setShowPanier] = useState(false);
  const [filters, setFilters] = useState({});
  const [reservedCars, setReservedCars] = useState([]);
  const { isAuthenticated } = useAuth();

  const handleReservationDelete = (deletedReservationId) => {
    setReservedCars(prevCars => prevCars.filter(car => car.id !== deletedReservationId));
  };

  const togglePanier = () => {
    if (isAuthenticated) {
      setShowPanier(!showPanier);
    } else {
      alert("Please log in to view your cart.");
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const fetchReservedCars = async () => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(`http://localhost:8082/api/reservation/reservedcars/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReservedCars(data);
      } else {
        console.error("Failed to fetch reserved cars");
      }
    } catch (error) {
      console.error("Error fetching reserved cars:", error);
    }
  };

  useEffect(() => {
    fetchReservedCars();
  }, [isAuthenticated]);

  const handleReserve = async (car) => {
    if (isAuthenticated) {
      await fetchReservedCars();
      setShowPanier(true);
    } else {
      alert("Please log in to reserve a car.");
    }
  };

  return (
    <div>
      <NavBare onTogglePanier={togglePanier} />
      <FilterSection onFilterChange={handleFilterChange} />
      <div className="main">
        <div className={showPanier ? 'cars-section open' : 'cars-section'}>
          <Cars filters={filters} onReserve={handleReserve} isAuthenticated={isAuthenticated} />
        </div>
        {showPanier && isAuthenticated && (
          <div className={`panier-section ${showPanier ? 'show' : 'hide'}`}>
            <Panier
              onTogglePanier={togglePanier}
              reservedCars={reservedCars}
              onReservationDelete={handleReservationDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

