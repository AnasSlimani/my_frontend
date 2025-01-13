import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import './FormAddVehicule.css';

function FormUpdateVehicle({ vehiculeId, onSubmitSuccess, initialData }) {
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
  const [previews, setPreviews] = useState({
    imagepath: null,
    detailpic: null,
    logoPath: null,
  });

  // Set initial data when component mounts or when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));

      // Set initial image previews
      setPreviews({
        imagepath: initialData.imagepath ? `http://localhost:8082${initialData.imagepath}` : null,
        detailpic: initialData.detailpic ? `http://localhost:8082${initialData.detailpic}` : null,
        logoPath: initialData.logoPath ? `http://localhost:8082${initialData.logoPath}` : null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const fileName = file.name;
      const filePath = `/images/${fileName}`;

      setFormData((prevData) => ({
        ...prevData,
        [name]: filePath,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevPreviews) => ({
          ...prevPreviews,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (typeof formData[key] === 'string' && !formData[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} est requis`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8082/api/vehicules/${vehiculeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmitSuccess();
      } else if (response.status === 401) {
        console.error('Erreur 401 : Non autorisé');
      } else {
        console.error('Erreur lors de la mise à jour du véhicule');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const renderFormGroup = (id, label, type = "text", accept = null) => (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {type === "file" ? (
        <div>
          <Form.Control
            type={type}
            name={id}
            onChange={handleChange}
            isInvalid={!!errors[id]}
            accept={accept}
            className="custom-file-input"
          />
          {previews[id] && (
            <div className="image-preview-container">
              <Image 
                src={previews[id]} 
                alt={`${label} preview`} 
                className="image-preview" 
              />
            </div>
          )}
        </div>
      ) : (
        <Form.Control
          type={type}
          placeholder={`Entrer ${label.toLowerCase()}`}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          isInvalid={!!errors[id]}
        />
      )}
      <Form.Control.Feedback type="invalid">
        {errors[id]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Container className="form-add-vehicle">
      <Form onSubmit={handleSubmit}>
        <Row className="gx-4">
          <Col md={4}>{renderFormGroup("annee", "Année")}</Col>
          <Col md={4}>{renderFormGroup("marque", "Marque")}</Col>
          <Col md={4}>{renderFormGroup("modele", "Modèle")}</Col>
        </Row>

        <Row className="gx-4">
          <Col md={4}>{renderFormGroup("nbrReservateurs", "Nombre Réservateurs")}</Col>
          <Col md={4}>{renderFormGroup("prix", "Prix")}</Col>
          <Col md={4}>{renderFormGroup("quantite", "Quantité")}</Col>
        </Row>

        <Row className="gx-4">
          <Col md={4}>{renderFormGroup("status", "Status")}</Col>
          <Col md={4}>{renderFormGroup("vehiculeType", "Type de véhicule")}</Col>
          <Col md={4}>{renderFormGroup("fuel", "Fuel")}</Col>
        </Row>

        <Row className="gx-4">
          <Col md={4}>{renderFormGroup("features", "Features")}</Col>
          <Col md={4}>{renderFormGroup("maxCount", "Max Count")}</Col>
          <Col md={4}>{renderFormGroup("vitesse", "Vitesse")}</Col>
        </Row>

        <Row className="gx-4 mb-4">
          <Col md={12}>
            {renderFormGroup("description", "Description")}
          </Col>
        </Row>

        <Row className="gx-4">
          <Col md={4}>{renderFormGroup("imagepath", "Image du Véhicule", "file", "image/*")}</Col>
          <Col md={4}>{renderFormGroup("detailpic", "Photo Détaillée", "file", "image/*")}</Col>
          <Col md={4}>{renderFormGroup("logoPath", "Logo", "file", "image/*")}</Col>
        </Row>

        <div className="d-grid gap-2 mt-4">
          <Button 
            variant="primary" 
            type="submit" 
            size="lg"
            className="py-3"
          >
            Mettre à jour le Véhicule
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormUpdateVehicle;

