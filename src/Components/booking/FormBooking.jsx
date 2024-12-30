import React, { useState } from 'react'
import './form-booking.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function FormBooking() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const location = useLocation();
  const carDetails = location.state?.carDetails.vehicule || {};
  const reservationId = location.state?.carDetails.id || {};
  const navigate = useNavigate();


  const reserve = async ()=> {
      const token = localStorage.getItem("jwtToken");
      try {
        console.log(token);
        const response1 = await fetch(`http://localhost:8082/api/reservation/reservecar/${reservationId}/${startDate}/${endDate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        

        if (response1.ok){
          const reservation1 = await response1.json() ;
          console.log(reservation1); 
        }    
      }catch(error) {
          console.log("error while reservig car " + error);     
      }
  }

  const handelConfirmPaiment = async (event) => {
    const token = localStorage.getItem("jwtToken");
    event.preventDefault();
    console.log("car id : " + carDetails.id);
    console.log("starting date enterd  : " + startDate);
    console.log("ending  date enterd : " + endDate);

    try {
      const response = await fetch(`http://localhost:8082/api/reservation/checkconflect/${carDetails.id}/${startDate}/${endDate}`,{
        headers: {
          "Authorization":`Bearer ${token}`
          }});
      if(response.ok){
          const reservation = await response.json() ;  
          const nbrReservationConflect = reservation.length;     
          if (nbrReservationConflect != 0) {
            alert("vehicule deja reserve , choisir une autre ")
            navigate("/signup");
          }
          else {
            reserve();
          }
      }
    } catch (error) {
        console.log(error);
      
    }
    
  }


  
  return (
    <div className="booking-container mt-20">
      <div className="booking-wrapper">
        {/* Car Details Card */}
        <div className="car-details-card">q
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

