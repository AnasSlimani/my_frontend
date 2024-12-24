import React, { useState } from 'react';

export default function Select({ option, values, onChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <>
      {option === 'date_debut' || option === 'date_fin' ? (
        <div className="date-input-container">
          <input
            type="date"
            name={option}
            value={selectedValue}
            className="filter-date"
            onChange={handleChange}
          />
          {!selectedValue && (
            <span className="date-placeholder">
              {option === 'date_debut' ? 'Date début' : 'Date fin'}
            </span>
          )}
        </div>
      ) : (
        <select name={option} value={selectedValue} onChange={handleChange}>
          <option value="">{option} </option>
          {values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

