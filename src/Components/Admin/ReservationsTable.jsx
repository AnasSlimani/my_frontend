import React, { useState } from 'react';
import { Table, Form, InputGroup, Button, Badge, Pagination } from 'react-bootstrap';
import { FaSearch, FaFilter, FaCalendar } from 'react-icons/fa';
import './reservationsTable.css';

export function ReservationsTable({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filtering logic
  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="dashboard-container">
      {/* Search and Filter Section */}
      <div className="search-section">
        <div className="search-box">
          <InputGroup>
            <InputGroup.Text className="search-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </InputGroup>
        </div>
        <div className="filter-box">
          <Button variant="light" className="filter-button">
            <FaFilter /> Filters
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <Table hover responsive className="modern-table">
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
              <tr key={reservation.id} className="table-row-hover">
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {reservation.utilisateur?.firstName?.[0] || ''}{reservation.utilisateur?.lastName?.[0] || ''}
                    </div>
                    <div className="user-details">
                      <div className="user-name">
                        {`${reservation.utilisateur?.firstName || ''} ${reservation.utilisateur?.lastName || ''}`}
                      </div>
                      <div className="user-id">ID: {reservation.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="vehicle-info">
                    <div className="vehicle-name">{reservation.vehicule?.marque || 'N/A'}</div>
                    <div className="vehicle-model">{reservation.vehicule?.modele || 'N/A'}</div>
                  </div>
                </td>
                <td>
                  <Badge 
                    className={`status-badge ${reservation.status?.toLowerCase()}`}
                  >
                    {reservation.status}
                  </Badge>
                </td>
                <td>
                  <div className="dates-info">
                    <div className="date-range">
                      <FaCalendar className="date-icon" />
                      <span>{reservation.dateDebut} - {reservation.dateFin}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="pagination-section">
        <div className="entries-info">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
        </div>
        <Pagination className="modern-pagination">
          <Pagination.Prev
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}

