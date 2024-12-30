import React, { useState } from 'react';
import { Table, Form, InputGroup, Button, Badge, Pagination } from 'react-bootstrap';
import { FaSearch, FaPen, FaTrash, FaFilter } from 'react-icons/fa';
import './usersTable.css';

export function UsersTable({ data, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filtering logic
  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Search users..."
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
              <th>Contact</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="table-row-hover">
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.firstName} {user.lastName}</div>
                      <div className="user-id">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="email">{user.email}</div>
                    <div className="phone">{user.phone}</div>
                  </div>
                </td>
                <td>
                  <Badge 
                    className={`role-badge ${user.role.toLowerCase()}`}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button 
                      variant="light"
                      className="edit-button"
                      href={`/admin/clients/UpdateUser/${user.id}`}
                    >
                      <FaPen />
                    </Button>
                    <Button 
                      variant="light"
                      className="delete-button"
                      onClick={() => onDelete(user.id)}
                    >
                      <FaTrash />
                    </Button>
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

