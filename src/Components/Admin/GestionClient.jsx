import React, { useEffect, useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import FormAddUser from "./FormAddUser";
import UpdateUser from "./UpdateUser";


import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";

function GestionClient() {
  const [utilisateurs, setUtilisateur] = useState([]);
  const [filter, setFilter] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8082/api/utilisateur/AllUtilisateurs"
        );
        const data = await response.json();
        setUtilisateur(data);
        console.log(utilisateurs);
      } catch (err) {
        console.error("Erreur fetching users:", err.message);
      }
    };

    fetchUtilisateurs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const response = await fetch(`http://localhost:8082/api/utilisateur/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          // Met à jour la liste des utilisateurs après suppression
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

  

  
  const handleUpdate = (id) => {
    navigate(`/admin/clients/UpdateUser/${id}`);
  };

  

  const filteredUtilisateurs = utilisateurs.filter(
    (utilisateur) =>
      utilisateur.firstName
        .toLowerCase()
        .includes(filter.firstName.toLowerCase()) &&
      utilisateur.lastName
        .toLowerCase()
        .includes(filter.lastName.toLowerCase()) &&
      utilisateur.email.toLowerCase().includes(filter.email.toLowerCase())
  );

  return (
    <Container
      fluid
      style={{ backgroundColor: "white", color: "black", minHeight: "100vh" }}
    >
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark vh-100">
          <SideBarAdmin />
        </Col>

        {/* Main Content */}
        <Col md={10}>
          <Container className="mt-4">
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Filtrer les Utilisateurs</h2>
                  <Link to="/admin/clients/FormAddUser">
                  <Button variant="success" type="button" className="mt-3">
                    Add User
                  </Button>
                  </Link>
                  
                </div>

                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="filterFirstName">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filtrer par Prénom"
                          name="firstName"
                          value={filter.firstName}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="filterLastName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filtrer par Nom"
                          name="lastName"
                          value={filter.lastName}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="filterEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filtrer par Email"
                          name="email"
                          value={filter.email}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col>
                <h1 className="text-center">Utilisateurs</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
  {filteredUtilisateurs.map((utilisateur) => (
    <tr key={utilisateur.id}>
      <td>{utilisateur.firstName}</td>
      <td>{utilisateur.lastName}</td>
      <td>{utilisateur.email}</td>
      <td>{utilisateur.phone}</td>
      <td>{utilisateur.role}</td>
      <td className="flex  gap-2 justify-center align-middle align-top" >
        <Button className="mt-2" variant="outline-success" onClick={() => handleUpdate(utilisateur.id)}>
          Update
        </Button>
        <Button className="mt-2" variant="outline-danger" onClick={() => handleDelete(utilisateur.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>

                </Table>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionClient;
