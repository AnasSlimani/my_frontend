import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { UsersTable } from "./UsersTable";
import SideBarAdmin from "./SideBarAdmin";
import FormAddUser from "./FormAddUser";
import FormUpdateUser from "./FormUpdateUser";
import './GestionClients.css';

function GestionClient() {
  const [utilisateurs, setUtilisateur] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/api/utilisateur/AllUtilisateurs"
      );
      const data = await response.json();
      setUtilisateur(data);
    } catch (err) {
      console.error("Erreur fetching users:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`http://localhost:8082/api/utilisateur/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setUtilisateur((prevUtilisateurs) =>
            prevUtilisateurs.filter((utilisateur) => utilisateur.id !== id)
          );
          alert("Utilisateur supprimé avec succès.");
        } else {
          alert("Erreur : Impossible de supprimer l'utilisateur.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression :", err.message);
        alert("Erreur de réseau ou serveur.");
      }
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser({
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateModal(false);
    fetchUtilisateurs();
    setSelectedUser(null);
  };

  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        <Col md={2}>
          <SideBarAdmin />
        </Col>
        <Col md={10} className="dashboard-main">
          <div className="dashboard-content">
            <div className="dashboard-header">
              <div className="header-content">
                <h1 className="dashboard-title">
                  <FaUsers className="dashboard-icon" />
                  User Management
                </h1>
                <p className="dashboard-subtitle">
                  Manage and monitor user accounts
                </p>
              </div>
              <Button className="add-user-btn" onClick={() => setShowAddModal(true)}>
                <FaUserPlus className="btn-icon" />
                Add New User
              </Button>
            </div>

            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <UsersTable 
                data={utilisateurs} 
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        </Col>
      </Row>

      <Modal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)}
        size="lg"
        centered
        className="user-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddUser 
            onSubmitSuccess={() => {
              setShowAddModal(false);
              fetchUtilisateurs();
            }} 
          />
        </Modal.Body>
      </Modal>

      <Modal 
        show={showUpdateModal} 
        onHide={() => {
          setShowUpdateModal(false);
          setSelectedUser(null);
        }}
        size="lg"
        centered
        className="user-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <FormUpdateUser 
              userId={selectedUser.id}
              initialData={selectedUser}
              onSubmitSuccess={handleUpdateSuccess}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default GestionClient;

