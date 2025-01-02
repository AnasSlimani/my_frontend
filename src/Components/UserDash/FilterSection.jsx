import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import Select from './Select';
import './filterSection.css';

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    marque: '',
    type: '',
    annee: '',
    disponibilite: '',
    tarif: '',
    date_debut: '',
    date_fin: '',
    searchTerm: ''
  });

  const handleSelectChange = (option, value) => {
    const newFilters = { ...filters, [option]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e) => {
    const newFilters = { ...filters, searchTerm: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const marques = ['Mercedes', 'BMW', 'Audi', 'Toyota'];
  const types = ['Sedan', 'SUV', 'Coupe', 'Sport'];
  const annees = ['2020', '2021', '2022', '2023'];
  const disponibilites = ['Available', 'Reserved'];
  const tarifs = ['100-200', '200-300', '300-400', '400+'];

  return (
    <div className="modern-filter-container ">
      <div className="modern-filter-content">
        <div className="filter-row">
          <div className="filter-group">
            <label>Brand</label>
            <Select 
              option="marque"
              values={marques}
              onChange={(value) => handleSelectChange('marque', value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Type</label>
            <Select 
              option="type"
              values={types}
              onChange={(value) => handleSelectChange('type', value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Year</label>
            <Select 
              option="annee"
              values={annees}
              onChange={(value) => handleSelectChange('annee', value)}
            />
          </div>

          <div className="filter-group">
            <label>Availability</label>
            <Select 
              option="disponibilite"
              values={disponibilites}
              onChange={(value) => handleSelectChange('disponibilite', value)}
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label>Price Range</label>
            <Select 
              option="tarif"
              values={tarifs}
              onChange={(value) => handleSelectChange('tarif', value)}
            />
          </div>

          <div className="filter-group date-group">
            <label>Start Date</label>
            <div className="date-input-wrapper">
              {/* <FaCalendarAlt className="date-icon" /> */}
              <input
                type="date"
                className="modern-date-input"
                onChange={(e) => handleSelectChange('date_debut', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group date-group">
            <label>End Date</label>
            <div className="date-input-wrapper">
              {/* <FaCalendarAlt className="date-icon" /> */}
              <input
                type="date"
                className="modern-date-input"
                onChange={(e) => handleSelectChange('date_fin', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group search-group">
            <label>Search</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search cars..."
                className="modern-search-input"
                onChange={handleSearchChange}
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

