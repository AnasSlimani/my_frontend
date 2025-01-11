import React, { useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './userReservations.css';

const UserReservations = ({ reservations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 3;
  
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="user-reservations">
      <div className="reservations-header">
        <h2 className="section-title">Reservations</h2>
        <span className="reservation-count">Total: {reservations.length}</span>
      </div>
      
      <div className="reservations-list">
        {currentReservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="car-image">
              <img 
                src={`http://localhost:8082${reservation.vehicule?.imagepath}`} 
                alt={`${reservation.vehicule?.marque} ${reservation.vehicule?.modele}`}
              />
              <div className={`status-badge ${reservation.status?.toLowerCase()}`}>
                {reservation.status === 'CONFIRMED' ? (
                  <FaCheckCircle className="status-icon" />
                ) : (
                  <FaTimesCircle className="status-icon" />
                )}
                <span>{reservation.status}</span>
              </div>
            </div>
            <div className="reservation-details">
              <h3>{reservation.vehicule?.marque} {reservation.vehicule?.modele}</h3>
              <div className="reservation-info">
                <div className="date-range">
                  <FaCalendarAlt className="icon" />
                  <div className="dates">
                    <span className="date-label">From</span>
                    <span className="date">{new Date(reservation.dateDebut).toLocaleDateString()}</span>
                    <span className="date-label">To</span>
                    <span className="date">{new Date(reservation.dateFin).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="price">
                  <span className="amount">{reservation.vehicule?.prix} DH</span>
                  <span className="period">per day</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserReservations;

