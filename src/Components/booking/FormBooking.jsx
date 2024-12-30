import React, { useState } from 'react'
import './form-booking.css'
import { useLocation } from 'react-router-dom';

export default function FormBooking() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const location = useLocation();
  const carDetails = location.state?.carDetails || {};

  return (
    <div className="booking-container mt-20">
      <div className="booking-wrapper">
        {/* Car Details Card */}
        <div className="car-details-card">
          <div className="car-header">
            <h2 className="car-title ">{carDetails.marque} {carDetails.modele}</h2>
            <div className="price-tag">
              <span className="price">{carDetails.prix}DH</span>
              <span className="price-period">par jour</span>
            </div>
          </div>
          
          <div className="car-image-wrapper">
            <img 
              src={`http://localhost:8082${carDetails.imagepath}`}
              alt={`${carDetails.marque} ${carDetails.modele}`}
              className="car-image"
            />
            <div className="image-overlay">
              <span className="premium-badge">Premium</span>
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <i className="feature-icon">✓</i>
              <div className="feature-content">
                <h3>Assurance Premium</h3>
                <p>Protection complète incluse</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="feature-icon">⚡</i>
              <div className="feature-content">
                <h3>Service 24/7</h3>
                <p>Assistance routière disponible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="booking-form-card">
          <div className="form-header">
            <h2>Réservation</h2>
            <p>Complétez les informations ci-dessous</p>
          </div>

          <form className="booking-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="startDate">Date de début</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Date de fin</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="idCard">N° Carte d'identité</label>
                <input
                  type="text"
                  id="idCard"
                  className="form-input"
                  placeholder="Entrez votre numéro"
                />
              </div>

              <div className="form-group">
                <label htmlFor="creditCard">N° Carte bancaire</label>
                <input
                  type="text"
                  id="creditCard"
                  className="form-input"
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardType">Type de carte</label>
              <select id="cardType" className="form-select">
                <option value="">Sélectionner le type de carte</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </div>

            <div className="terms-section">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                J'accepte les conditions générales
              </label>
              <p className="terms-text">
                En validant ce paiement, vous acceptez nos conditions générales de vente 
                et notre politique de confidentialité.
              </p>
            </div>

            <button type="submit" className="submit-button mt-10">
              Valider le paiement
              <span className="button-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

