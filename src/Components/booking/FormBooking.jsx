import React, { useState } from 'react';
import './form-booking.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ReservationConflictWindow from './ReservationConflictWindow';
import PaymentSuccessWindow from './PaymentSuccessWindow';
import {calculateDuration} from './CalulateDuration'

export default function FormBooking() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showReservationConflict, setShowReservationConflict] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [conflictEndDate, setConflictEndDate] = useState('');
  
  const location = useLocation();
  const carDetails = location.state?.carDetails.vehicule || {};
  const reservationId = location.state?.carDetails.id || {};
  const navigate = useNavigate();

  const [formBooking, setFormBooking] = useState({  
        cinClient : '',
        numeroCarteBancaire : '',
        modePaiment : '',
        montant : '',
        datePaiment : new Date().toISOString().split('T')[0],
        status : 'done'
      })
  

  const reserve = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(
        `http://localhost:8082/api/reservation/reservecar/${reservationId}/${startDate}/${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
            const reservationData = await response.json();
            console.log(reservationData);

            const response2 = await fetch(
              `http://localhost:8082/api/paiment/${reservationId}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`,
                },
                body : JSON.stringify(formBooking)
              }
            ); 
            if(response2.ok){
              alert("paiment fait avec succes");
            }else {
              alert("echec de paiment");
            }
            
      } else {
        console.error(`Failed to reserve the car: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error while reserving the car: ${error}`);
    }
  };

  const handelConfirmPaiment = async (event) => {
    const token = localStorage.getItem('jwtToken');
    event.preventDefault();

    if(isNaN(formBooking.numeroCarteBancaire)){
      alert("Veuillez entrer un numéro de carte bancaire valide");
      return;
    }
    

    const duration = calculateDuration(startDate, endDate);
    if (typeof(duration) == 'number'){
      formBooking.montant = carDetails.prix * duration ;
    }else{
      alert("invalid date entered");
      return
    } 

    console.log('car id:', carDetails.id);
    console.log(formBooking);
  
    try {
      const response = await fetch(
        `http://localhost:8082/api/reservation/checkconflect/${carDetails.id}/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const reservation = await response.json();
        const nbrReservationConflicts = reservation.length;

        if (nbrReservationConflicts !== 0) {
          setConflictEndDate(reservation[0].dateFin);
          setShowReservationConflict(true);
        } else {
          await reserve();
          setShowPaymentSuccess(true);
        }
      } else {
        console.error(`Failed to check conflict: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error while checking conflict: ${error}`);
    }
  };

  const handelFormChange = (event) => {
    const { name, value } = event.target;
      setFormBooking({
          ...formBooking,
          [name]: value
      });
  }


  return (
    <div className="booking-container mt-20">
      <div className="booking-wrapper">
        {/* Car Details Card */}
        <div className="car-details-card">
          <div className="car-header">
            <h2 className="car-title">
              {carDetails.marque} {carDetails.modele}
            </h2>
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

{/* //////////////////////////////////// ////////////////////////////////////////////////////////////////////////*/}
          <form className="booking-form" onSubmit={handelConfirmPaiment}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="startDate">Date de début</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
              
                  className="form-input"
                  required
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="idCard">N° Carte d'identité</label>
                <input
                  type="text"
                  id="idCard"
                  className="form-input"
                  placeholder="Entrez votre numéro"
                  name='cinClient'
                  value={formBooking.cinClient}
                  onChange={handelFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="creditCard">N° Carte bancaire</label>
                <input
                  type="text"
                  id="creditCard"
                  className="form-input"
                  placeholder="XXXX XXXX XXXX XXXX"
                  name='numeroCarteBancaire'
                  minLength={16}
                  maxLength={16}
                  value={formBooking.numeroCarteBancaire}
                  onChange={handelFormChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardType">Type de carte</label>
              <select id="cardType" className="form-select" name='modePaiment'  value={formBooking.modePaiment} onChange={handelFormChange} required>
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
                En validant ce paiement, vous acceptez nos conditions générales
                de vente et notre politique de confidentialité.
              </p>
            </div>

            <button type="submit" className="submit-button mt-10">
              Valider le paiement
              <span className="button-icon">→</span>
            </button>
          </form>
        </div>
      </div>
      {showReservationConflict && (
        <ReservationConflictWindow
          onClose={() => setShowReservationConflict(false)}
          endDate={conflictEndDate}
        />
      )}
      {showPaymentSuccess && (
        <PaymentSuccessWindow
          onClose={() => setShowPaymentSuccess(false)}
          startDate={startDate}
          carDetails={carDetails}
        />
      )}
    </div>
  );
}
