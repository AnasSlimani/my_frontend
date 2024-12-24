import React, { useState } from 'react';
import Cars from './Cars';
import Panier from './Panier';
import NavBare from '../LandingPage/NavBare';
import FilterSection from './FilterSection';
import './section.css';

const UserDashboard = () => {
  const [showPanier, setShowPanier] = useState(false);
  const [filters, setFilters] = useState({});

  const togglePanier = () => {
    setShowPanier(!showPanier);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <NavBare onTogglePanier={togglePanier} />
      <FilterSection onFilterChange={handleFilterChange} />
      <div className="main">
        <div className={showPanier ? 'cars-section open' : 'cars-section'}>
          <Cars filters={filters} />
        </div>
        {showPanier && (
          <div className={`panier-section ${showPanier ? 'show' : 'hide'}`}>
            <Panier onTogglePanier={togglePanier} />
          </div>        
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

