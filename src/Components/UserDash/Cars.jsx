import React, { useState, useEffect } from 'react';
import './Cars.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, UsersInfos } from '../../Components/auth/Authentification';

const Cars = ({ filters, onReserve }) => {
  const [cars, setCars] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
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
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          alert("Session expired");
          navigate("/login");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          console.error("Failed to fetch cars, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching the cars:", error);
      }
    };
    fetchCars();
  }, [filters, navigate]);

  const handleReserve = async (car) => {
    if (!isAuthenticated()) {
      alert("Please login to reserve a car");
      navigate("/login");
      return;
    }

    try {
      const token = isAuthenticated();
      const decodedToken = UsersInfos();
      const { id, FirstName: firstName, LastName: lastName, sub: email, role } = decodedToken;
      const user = { id, firstName, lastName, email, role };

      const combineForm = {
        status: "entretient",
        utilisateur: user,
        vehicule: car,
      };

      console.log(combineForm);

      const response = await fetch("http://localhost:8082/api/reservation/addreservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(combineForm),
      });

      if (response.ok) {
        alert("Reservation added");
        const insertedReservation = await response.text();
        console.log(JSON.parse(insertedReservation).id);
        onReserve(car);
      } else {
        console.error("Failed to add reservation, status:", response.status);
        alert("Failed to add reservation");
      }
    } catch (error) {
      console.error("Error adding car to cart:", error);
      alert("Failed to add car to cart");
    }
  };

  return (
    <div className="containere">
      <div className="card__container">
        {cars.map((car) => (
          <article className="card__article" key={car.id}>
            <img
              src={`http://localhost:8082${car.imagepath}`}
              alt="Car"
              className="card__img"
            />
            <div className="card__data">
              <span className="card__description">
                Prix : {car.prix}, Etat : {car.status}
              </span>
              <h2 className="card__title">
                <img
                  src={`http://localhost:8082${car.logoPath}`}
                  alt="Car Logo"
                  className="iconse"
                />
                {car.marque} {car.modele}
              </h2>
              <div className="buttons">
                <Link to={`/CarDetail/${car.id}`} className="card__button">
                  Read More
                </Link>
                <button onClick={() => handleReserve(car)}>RESERVE</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Cars;
