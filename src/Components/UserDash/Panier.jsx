import React, { useState, useEffect } from 'react';
import './Panier.css';
import { X, Trash2, ShoppingCart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Panier = ({ onTogglePanier, reservedCars, onReservationDelete }) => {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  
  const handleCarSelection = (reservationId) => {
    setSelectedCarId(reservationId);
  };
  
  useEffect(() => {
    const selectedCar = reservedCars.find(car => car.id === selectedCarId);
    setTotalPrice(selectedCar ? selectedCar.vehicule.prix : 0);
  }, [selectedCarId, reservedCars]);
  
  const handleValidateReservation = () => {
    if (selectedCarId) {
      const selectedCar = reservedCars.find(car => car.id === selectedCarId);
      navigate('/booking', { state: { carDetails: selectedCar } });
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`http://localhost:8082/api/reservation/deletereservation/${reservationId}`, {
        method: 'DELETE',
        headers: {
          "Authorization":`Bearer ${token}`
      },
        
      });
      if (response.ok) {
        // Call the onReservationDelete function to update the parent component's state
        onReservationDelete(reservationId);
        // If the deleted reservation was selected, clear the selection
        if (selectedCarId === reservationId) {
          setSelectedCarId(null);
        }
      } else {
        console.error('Failed to delete reservation');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="panier-container">
      <div className="panier-header">
        <div className="header-content">
          <ShoppingCart className="w-6 h-6" />
          <h2>Panier</h2>
          <button className="close-button" onClick={onTogglePanier}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="cars-count">
          {reservedCars.length} véhicules disponibles
        </div>
      </div>

      <div className="panier-items">
        {reservedCars.map((reservation) => (
          <div className="panier-item" key={reservation.id}>
            <input
              type="radio"
              name="carSelection"
              className="car-radio"
              checked={selectedCarId === reservation.id}
              onChange={() => handleCarSelection(reservation.id)}
            />
            <div className="item-image">
              <img 
                src={`http://localhost:8082${reservation.vehicule.imagepath}`} 
                alt={`${reservation.vehicule.marque} ${reservation.vehicule.modele}`}
              />
            </div>
            <div className="item-details">
              <div className="item-header">
                <h3>{reservation.vehicule.marque} {reservation.vehicule.modele}</h3>
                <button 
                  className="remove-button" 
                  onClick={() => handleDeleteReservation(reservation.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="item-info">
                <div className="info-row">
                  <span className="label">Modèle</span>
                  <span className="value">{reservation.vehicule.annee}</span>
                </div>
                <div className="info-row">
                  <span className="label">Prix</span>
                  <span className="value price">{reservation.vehicule.prix} DH</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="panier-footer">
        <div className="total-section">
          <div className="total-row">
            <span>Total</span>
            <span className="total-price">{totalPrice} DH</span>
          </div>
        </div>
        <button 
          className="validate-button"
          disabled={!selectedCarId}
          onClick={handleValidateReservation}
        >
          <span>Valider la réservation</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Panier;

