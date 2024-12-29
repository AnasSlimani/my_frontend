import React, { useState, useEffect } from 'react';
import './Panier.css';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const Panier = ({ onTogglePanier }) => {
  const [reservedCars, setReservedCars] = useState([]);

  useEffect(() => {
    const fetchReservedCars = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await fetch(`http://localhost:8082/api/reservation/reservedcars/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setReservedCars(data);
        } else {
          console.error("Failed to fetch reserved cars");
        }
      } catch (error) {
        console.error("Error fetching reserved cars:", error);
      }
    };

    fetchReservedCars();
  }, []);

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

