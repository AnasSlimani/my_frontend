import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";
import SideBarAdmin from "./SideBarAdmin";
import './GestionClients.css';

function GestionReservation() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/reservation/allReservations");
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error("Erreur fetching reservations:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Search functionality
  const filteredReservations = reservations.filter(reservation => {
    const searchStr = searchTerm.toLowerCase();
    return (
      (reservation.utilisateur?.firstName?.toLowerCase().includes(searchStr) ||
       reservation.utilisateur?.lastName?.toLowerCase().includes(searchStr)) ||
      (reservation.vehicule?.marque?.toLowerCase().includes(searchStr) ||
       reservation.vehicule?.modele?.toLowerCase().includes(searchStr)) ||
      reservation.status?.toLowerCase().includes(searchStr) ||
      reservation.dateDebut?.includes(searchStr) ||
      reservation.dateFin?.includes(searchStr)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        <Col md={2}>
          <SideBarAdmin />
        </Col>
        <Col md={10} className="dashboard-main">
          <div className="dashboard-content">
            {/* Header Section */}
            <div className="dashboard-header">
              <div className="header-content">
                <h1 className="dashboard-title">
                  <FaCalendarAlt className="dashboard-icon" />
                  Reservation Management
                </h1>
                <p className="dashboard-subtitle">
                  Manage and monitor vehicle reservations
                </p>
              </div>
            </div>

            {/* Main Content */}
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <div className="dashboard-container">
                {/* Search Bar */}
                <div className="search-section">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Search reservations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control search-input"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="table-container">
                  <table className="table modern-table">
                    <thead>
                      <tr>
                        <th>User Info</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        <th>Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((reservation) => (
                        <tr key={reservation.id}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                {reservation.utilisateur?.firstName?.[0]}{reservation.utilisateur?.lastName?.[0]}
                              </div>
                              <div className="user-details">
                                <div className="user-name">
                                  {reservation.utilisateur?.firstName} {reservation.utilisateur?.lastName}
                                </div>
                                <div className="user-id">ID: {reservation.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="vehicle-info">
                              <div className="vehicle-name">{reservation.vehicule?.marque}</div>
                              <div className="vehicle-model">{reservation.vehicule?.modele}</div>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${reservation.status?.toLowerCase()}`}>
                              {reservation.status}
                            </span>
                          </td>
                          <td>
                            <div className="dates-info">
                              <div className="date-item">
                                <FaCalendarPlus className="date-icon start" />
                                <span>{reservation.dateDebut}</span>
                              </div>
                              <div className="date-item">
                                <FaCalendarCheck className="date-icon end" />
                                <span>{reservation.dateFin}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination-section">
                  <div className="entries-info">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReservations.length)} of {filteredReservations.length} entries
                  </div>
                  <div className="pagination">
                    <button 
                      className="page-button"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx + 1}
                        className={`page-button ${currentPage === idx + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      className="page-button"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionReservation;

