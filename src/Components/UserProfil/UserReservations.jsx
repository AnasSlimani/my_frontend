import React, { useState } from 'react';
import { FaCarAlt, FaTools, FaCheckCircle, FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import ReservationDetailsModal from './ReservationDetailsModal';
import './userReservations.css';

const UserReservations = ({ reservations , userData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reservationsPerPage = 3;
  
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

  const handleInfoClick = async (reservationId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/reservation/reservationdetails/${reservationId}`);
      const details = await response.json();
      setSelectedReservation(details);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching reservation details:', error);
      alert('Failed to fetch reservation details');
    }
  };

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
      
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentReservations.map((reservation) => (
              <tr 
                key={reservation.id} 
                className={`reservation-row ${reservation.status !== 'entretient' ? 'hoverable' : ''}`}
              >
                <td>
                  <div className="vehicle-info">
                    <div className="vehicle-image">
                      <img 
                        src={`http://localhost:8082${reservation.vehicule?.logoPath}`} 
                        alt={`${reservation.vehicule?.marque} ${reservation.vehicule?.modele}`}
                      />
                    </div>
                    <div className="vehicle-details">
                      <div className="vehicle-name">
                        {reservation.vehicule?.marque} {reservation.vehicule?.modele}
                      </div>
                      <div className="reservation-id">ID: {reservation.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${reservation.status?.toLowerCase()}`}>
                    {reservation.status === 'entretient' ? (
                      <>
                        <FaTools className="status-icon" />
                        entretien
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="status-icon" />
                        Payed
                      </>
                    )}
                  </span>
                  {reservation.status !== 'entretient' && (
                    <button
                      className="info-button"
                      onClick={() => handleInfoClick(reservation.id)}
                    >
                      <FaInfoCircle />
                      INFOS
                    </button>
                  )}
                </td>
                <td>
                  <div className="price-info">
                    <span className="amount">{reservation.vehicule?.prix} DH</span>
                    <span className="period">per day</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      <ReservationDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={selectedReservation}
        user={userData}
      />
    </div>
  );
};

export default UserReservations;

