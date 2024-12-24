import React from 'react';
import './Panier.css';
import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // Import icons from react-icons

const token = localStorage.getItem("jwtToken");
const Panier = ({ onTogglePanier }) => {
  return (
    <>
      {/* Close Button */}
      <button className="close-panier" onClick={onTogglePanier}>
        <FaTimes />
      </button>

      {/* Title */}
      <h2 className="panier-title">Panier</h2>
      <hr />

      {/* Cart Items */}
      <div className="panier-items">
        <div className="panier-item">
          <div className="item-info">
            <p><strong>Name:</strong> BMW X5</p>
            <p><strong>Modèle:</strong> 2020</p>
            <p><strong>Prix:</strong> 500 DH</p>
          </div>
          <button className="remove-item">
            <FaTrashAlt />
          </button>
        </div>

        <div className="panier-item">
          <div className="item-info">
            <p><strong>Name:</strong> Audi Q7</p>
            <p><strong>Modèle:</strong> 2021</p>
            <p><strong>Prix:</strong> 700 DH</p>
          </div>
          <button className="remove-item">
            <FaTrashAlt />
          </button>
        </div>
        <div className="panier-item">
          <div className="item-info">
            <p><strong>Name:</strong> Audi Q7</p>
            <p><strong>Modèle:</strong> 2021</p>
            <p><strong>Prix:</strong> 700 DH</p>
          </div>
          <button className="remove-item">
            <FaTrashAlt />
          </button>
        </div>
      </div>

      {/* Validate Button */}
      <button className="validate-btn">Valider</button>
    </>
  );
};

export default Panier;
