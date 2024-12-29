import React from 'react';
import './Panier.css';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';

const Panier = ({ onTogglePanier, reservedCars }) => {
  return (
    <>
      <button className="close-panier" onClick={onTogglePanier}>
        <FaTimes />
      </button>

      <h2 className="panier-title">Panier</h2>
      <hr />

      <div className="panier-items">
        {reservedCars.map((reservation) => (
          <div className="panier-item" key={reservation.id}>
            <div className="item-info">
              <p><strong>Name:</strong> {reservation.vehicule.marque} {reservation.vehicule.modele}</p>
              <p><strong>Modèle:</strong> {reservation.vehicule.annee}</p>
              <p><strong>Prix:</strong> {reservation.vehicule.prix} DH</p>
            </div>
            <button className="remove-item">
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

      <button className="validate-btn">Valider</button>
    </>
  );
};

export default Panier;

