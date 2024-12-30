import React, { useEffect, useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function GestionVehicules() {
  const [vehicules, setVehicules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/vehicules/allVehicules");
        const data = await response.json();
        console.log("Données reçues de l'API:", data);
        setVehicules(data);
      } catch (err) {
        console.error("Erreur fetching vehicles:", err.message);
      }
    };

    fetchVehicules();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/deleteVehicule/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setVehicules((prevVehicules) =>
            prevVehicules.filter((vehicule) => vehicule.id !== id)
          );
          alert("Véhicule supprimé avec succès.");
        } else {
          alert("Erreur : Impossible de supprimer le véhicule.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression :", err.message);
        alert("Erreur de réseau ou serveur.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/vehicules/UpdateVehicule/${id}`);
  };

  return (
    <Container fluid style={{ backgroundColor: "white", color: "black", minHeight: "100vh" }}>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark vh-100 p-0">
          <SideBarAdmin />
        </Col>

        {/* Main Content */}
        <Col md={10}>
          <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Gestion des Véhicules</h2>
              <Link to="/admin/vehicules/FormAddVehicle">
                <Button variant="success">AddVeh</Button>
              </Link>
            </div>

            <Row>
              {vehicules.map((vehicule) => (
                <Col md={4} className="mb-4" key={vehicule.id} style={{ maxWidth: "300px" }}>
                  <Card className="shadow-sm h-100 bg-light">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8082${vehicule.imagepath}`}
                      alt={`${vehicule.marque} ${vehicule.modele}`}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{vehicule.marque}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{vehicule.modele}</Card.Subtitle>
                      <Card.Text>
                        <strong>Prix:</strong> {vehicule.prix} DH <br />
                        <strong>Année:</strong> {vehicule.annee} <br />
                        <strong>Quantité:</strong> {vehicule.quantite} <br />
                        <strong>Nombre de Réservateurs:</strong> {vehicule.nbrReservateurs} <br />
                        <strong>Type de Véhicule:</strong> {vehicule.vehiculeType} <br />
                        <strong>Nombre Max:</strong> {vehicule.maxCount }
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button className="mt-2" variant="outline-success" onClick={() => handleUpdate(vehicule.id)}>
                          Update
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleDelete(vehicule.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionVehicules;
