import React, { useState } from 'react';
import './ReservationForm.css';

const ReservationForm = ({ carName, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!startDate) {
      newErrors.startDate = 'Veuillez remplir la date de début';
    }
    if (!endDate) {
      newErrors.endDate = 'Veuillez remplir la date de fin';
    }
    if (!isChecked) {
      newErrors.checkbox = 'Veuillez accepter les conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Show errors
    } else {
      alert('Réservation soumise avec succès !');
      setErrors({});
      // Reset or close the form
      onClose();
    }
  };

  return (
    <div className="reservation-form-overlay">
      <div className="reservation-form">
        <h2>Reserve {carName}</h2>
        <form onSubmit={handleSubmit}>
          {/* Date Début */}
          <div>
            <label>Date Début:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && <p className="error-message">{errors.startDate}</p>}
          </div>

          {/* Date Fin */}
          <div>
            <label>Date Fin:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && <p className="error-message">{errors.endDate}</p>}
          </div>

          {/* Checkbox */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="termsCheckbox" className="checkbox-label">
              J'ai lu ces conditions et j'accepte
            </label>
            {errors.checkbox && <p className="error-message">{errors.checkbox}</p>}
          </div>

          {/* Buttons */}
          <button type="submit">Submit Reservation</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
