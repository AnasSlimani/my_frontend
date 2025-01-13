import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function FormAddVehicle({ onSubmitSuccess }) {
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
    imagepath: null,
    detailpic: null,
    logoPath: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, files } = e.target;
  
    if (files && files[0]) {
      const fileName = files[0].name;
      const filePath = `/images/${fileName}`;
  
      console.log(`${name} file path:`, filePath);
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: filePath,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (typeof formData[key] === 'string' && !formData[key].trim()) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
      }
      if (key === 'detailpic' && !formData[key]) {
        newErrors[key] = 'Detail picture is required';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    console.log("image path : " + formData.imagepath);
    console.log("detail pic : " + formData.detailpic);
    console.log("logo path  : " + formData.logoPath);

    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8082/api/vehicules/addVehicule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Véhicule ajouté avec succès');
        onSubmitSuccess();
      } else if (response.status === 401) {
        console.error('Erreur 401 : Non autorisé. Vérifiez le token JWT.');
      } else {
        console.error('Erreur lors de lajout du véhicule');
      }
    } catch (error) {
      console.error('Erreur de réseau ou backend :', error);
    }
  };

  return (
    <Container className="p-4">
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
                isInvalid={!!errors.annee}
              />
              <Form.Control.Feedback type="invalid">{errors.annee}</Form.Control.Feedback>
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
                isInvalid={!!errors.marque}
              />
              <Form.Control.Feedback type="invalid">{errors.marque}</Form.Control.Feedback>
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
                isInvalid={!!errors.modele}
              />
              <Form.Control.Feedback type="invalid">{errors.modele}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="nbr_reservateurs">
              <Form.Label>Nombre Réservateurs</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nombre réservateurs"
                name="nbrReservateurs"
                value={formData.nbrReservateurs}
                onChange={handleChange}
                isInvalid={!!errors.nbrReservateurs}
              />
              <Form.Control.Feedback type="invalid">{errors.nbrReservateurs}</Form.Control.Feedback>
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
                isInvalid={!!errors.prix}
              />
              <Form.Control.Feedback type="invalid">{errors.prix}</Form.Control.Feedback>
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
                isInvalid={!!errors.quantite}
              />
              <Form.Control.Feedback type="invalid">{errors.quantite}</Form.Control.Feedback>
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
                isInvalid={!!errors.status}
              />
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="vehicle_type">
              <Form.Label>Type de véhicule</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type de véhicule"
                name="vehiculeType"
                value={formData.vehiculeType}
                onChange={handleChange}
                isInvalid={!!errors.vehiculeType}
              />
              <Form.Control.Feedback type="invalid">{errors.vehiculeType}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="fuel">
              <Form.Label>Fuel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter fuel"
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                isInvalid={!!errors.fuel}
              />
              <Form.Control.Feedback type="invalid">{errors.fuel}</Form.Control.Feedback>
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
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="features">
              <Form.Label>Features</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                isInvalid={!!errors.features}
              />
              <Form.Control.Feedback type="invalid">{errors.features}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="max_count">
              <Form.Label>Max Count</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter max count"
                name="maxCount"
                value={formData.maxCount}
                onChange={handleChange}
                isInvalid={!!errors.maxCount}
              />
              <Form.Control.Feedback type="invalid">{errors.maxCount}</Form.Control.Feedback>
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
                isInvalid={!!errors.vitesse}
              />
              <Form.Control.Feedback type="invalid">{errors.vitesse}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="imagepath">
              <Form.Label>Image Path</Form.Label>
              <Form.Control
                type="file"
                name="imagepath"
                onChange={handleChange}
                isInvalid={!!errors.imagepath}
              />
              <Form.Control.Feedback type="invalid">{errors.imagepath}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="detailpic">
              <Form.Label>Detail Picture</Form.Label>
              <Form.Control
                type="file"
                name="detailpic"
                onChange={handleChange}
                isInvalid={!!errors.detailpic}
              />
              <Form.Control.Feedback type="invalid">{errors.detailpic}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="logoPath">
              <Form.Label>Logo Path</Form.Label>
              <Form.Control
                type="file"
                name="logoPath"
                onChange={handleChange}
                isInvalid={!!errors.logoPath}
              />
              <Form.Control.Feedback type="invalid">{errors.logoPath}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormAddVehicle;

