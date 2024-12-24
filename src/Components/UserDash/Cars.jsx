import React, { useState, useEffect } from 'react'
import './Cars.css'
import ReservationForm from './ReservationForm';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Cars = ({ filters }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCars = async () => {
        try {
            let url = "http://localhost:8082/api/vehicules/filtered?";
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    url += `${key}=${encodeURIComponent(value)}&`;
                }
            });

            const token = localStorage.getItem("jwtToken");
            const response = await fetch(url);
            if (response.status === 401) {
              alert("Session expire");
              navigate("/login");
            }
            if (response.ok) {
                const data = await response.json();
                setCars(data);
            } else {
                console.error("Failed to fetch cars, status:", response.status);
            }
        } catch (error) {
            console.log("Error fetching the cars: ", error);
        }
    };

    fetchCars();
}, [filters]);

  const handleReserveClick = (carName) => {
    setSelectedCar(carName);
    setShowForm(true);
  };

  return (
    <div className="containere">
      <div className="card__container">
        {cars.map(car => (
          <article className="card__article" key={car.id} >
            <img src={`http://localhost:8082${car.imagepath}`} alt="image" className="card__img" />
            <div className="card__data">
              <span className="card__description">Prix : {car.prix} , Etat : {car.status}</span>
              <h2 className="card__title"><img src={`http://localhost:8082${car.logoPath}`} alt="Car Logo" className="iconse" />{car.marque} {car.modele} </h2>
              <div className="buttons">
                <Link to={'/CarDetail/'+car.id}><a href="#" className="card__button">Read More</a></Link> 
                <button onClick={() => handleReserveClick(`${car.marque} ${car.modele}`)}>RESERVE</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {showForm && (
        <ReservationForm
          carName={selectedCar}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default Cars

