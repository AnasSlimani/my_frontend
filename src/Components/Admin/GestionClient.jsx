import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { UsersTable } from "./UsersTable";
import SideBarAdmin from "./SideBarAdmin";
import './GestionClients.css';

function GestionClient() {
  const [utilisateurs, setUtilisateur] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchUtilisateurs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const response = await fetch(`http://localhost:8082/api/utilisateur/${id}`, {
          method: "DELETE",
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
                  <FaUsers className="dashboard-icon" />
                  User Management
                </h1>
                <p className="dashboard-subtitle">
                  Manage and monitor user accounts
                </p>
              </div>
              <Link to="/admin/clients/FormAddUser">
                <Button className="add-user-btn">
                  <FaUserPlus className="btn-icon" />
                  Add New User
                </Button>
              </Link>
            </div>

            {/* Main Content */}
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <UsersTable data={utilisateurs} onDelete={handleDelete} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionClient;
