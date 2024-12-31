import React, { useEffect, useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";

function GestionReservation() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState({
    utilisateur_nom: "",
    vehicule_marque: "",
    status: "",
    date_debut: "",
    date_fin: "",
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/reservation/allReservations");
        const data = await response.json();
        setReservations(data);
        console.log("Fetched reservations:", data);
      } catch (err) {
        console.error("Erreur fetching reservations:", err.message);
      }
    };

    fetchReservations();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredReservations = reservations.filter((reservation) =>
    Object.keys(filter).every((key) => {
      if (!filter[key]) return true; // Ignore empty filters
      if (key === "utilisateur_nom") {
        const fullName = `${reservation.utilisateur?.firstName || ""} ${reservation.utilisateur?.lastName || ""}`;
        return fullName.toLowerCase().includes(filter[key].toLowerCase());
      }
      if (key === "vehicule_marque") {
        return reservation.vehicule?.marque
          ?.toString()
          .toLowerCase()
          .includes(filter[key].toLowerCase());
      }
      return reservation[key]?.toString().toLowerCase().includes(filter[key].toLowerCase());
    })
  );

  return (
    <Container fluid style={{ backgroundColor: "white", color: "black", minHeight: "100vh" }}>
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
                  <h2>Filtrer les Réservations</h2>
                </div>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="filterUtilisateurNom">
                        <Form.Label>Nom Utilisateur</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filtrer par Nom Utilisateur"
                          name="utilisateur_nom"
                          value={filter.utilisateur_nom}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="filterVehiculeMarque">
                        <Form.Label>Marque Véhicule</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filtrer par Marque Véhicule"
                          name="vehicule_marque"
                          value={filter.vehicule_marque}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="filterStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filtrer par Status"
                          name="status"
                          value={filter.status}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="filterDateDebut">
                        <Form.Label>Date Début</Form.Label>
                        <Form.Control
                          type="date"
                          name="date_debut"
                          value={filter.date_debut}
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="filterDateFin">
                        <Form.Label>Date Fin</Form.Label>
                        <Form.Control
                          type="date"
                          name="date_fin"
                          value={filter.date_fin}
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
                <h1 className="text-center">Réservations</h1>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nom Utilisateur</th>
                      <th>Marque Véhicule</th>
                      <th>Status</th>
                      <th>Date Début</th>
                      <th>Date Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{`${reservation.utilisateur?.firstName || ""} ${reservation.utilisateur?.lastName || ""}`}</td>
                        <td>{reservation.vehicule?.marque || "Non spécifiée"}</td>
                        <td>{reservation.status}</td>
                        <td>{reservation.dateDebut || "Non spécifiée"}</td>
                        <td>{reservation.dateFin || "Non spécifiée"}</td>
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

export default GestionReservation;