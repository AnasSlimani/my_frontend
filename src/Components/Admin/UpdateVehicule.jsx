import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateVehicule() {
  const { id } = useParams(); // Récupère l'ID du véhicule depuis l'URL
  const [formData, setFormData] = useState({
    annee: '',
    marque: '',
    modele: '',
    nbrReservateurs: '',
    prix: '',
    quantite: '',
    status: '',
    vehiculeType: '',
    fuel: '',
    description: '',
    features: '',
    maxCount: '',
    vitesse: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicule = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/${id}`);
        const data = await response.json();
        setFormData({
          annee: data.annee,
          marque: data.marque,
          modele: data.modele,
          nbrReservateurs: data.nbrReservateurs,
          prix: data.prix,
          quantite: data.quantite,
          status: data.status,
          vehiculeType: data.vehiculeType,
          fuel: data.fuel,
          description: data.description,
          features: data.features,
          maxCount: data.maxCount,
          vitesse: data.vitesse,
        });
      } catch (err) {
        console.error('Erreur fetching vehicule data:', err.message);
      }
    };

    fetchVehicule();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("jwtToken")
        console.log(token);
        
      const response = await fetch(`http://localhost:8082/api/vehicules/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Véhicule mis à jour avec succès.');
        navigate('/admin/vehicules'); // Redirige vers la page de gestion des véhicules après la mise à jour
      } else {
        alert('Erreur : Impossible de mettre à jour le véhicule.');
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.message);
      alert('Erreur de réseau ou serveur.');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Container
        className="p-4 shadow"
        style={{
          maxWidth: '800px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h2 className="text-center mb-4">Update Vehicule</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="annee">
                <Form.Label>Année</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter année"
                  name="annee"
                  value={formData.annee}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="marque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter marque"
                  name="marque"
                  value={formData.marque}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="modele">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter modèle"
                  name="modele"
                  value={formData.modele}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nbr_reservateurs">
                <Form.Label>Nombre de Réservateurs</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nombre de réservateurs"
                  name="nbrReservateurs"
                  value={formData.nbrReservateurs}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="prix">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter prix"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="quantite">
                <Form.Label>Quantité</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter quantité"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="vehicle_type">
                <Form.Label>Type de Véhicule</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter type de véhicule"
                  name="vehiculeType"
                  value={formData.vehiculeType}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="fuel">
                <Form.Label>Carburant</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter carburant"
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="features">
                <Form.Label>Caractéristiques</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter caractéristiques"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="max_count">
                <Form.Label>Nombre Max</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nombre max"
                  name="maxCount"
                  value={formData.maxCount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="vitesse">
                <Form.Label>Vitesse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vitesse"
                  name="vitesse"
                  value={formData.vitesse}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateVehicule;
