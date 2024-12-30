import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function ProfilAdmin() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'ADMIN',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/utilisateur/${id}`);
        const data = await response.json();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: 'ADMIN',
        });
      } catch (err) {
        console.error('Erreur fetching user data:', err.message);
      }
    };

    fetchUser();
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

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`http://localhost:8082/api/utilisateur/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Information mise à jour avec succès.');
        console.log(await response.text());
        navigate('/admin');
      } else {
        alert('Erreur : Impossible de mettre à jour les informations.');
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.message);
      alert('Erreur de réseau ou serveur.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, red, black)', // Dégradé rouge-noir
        padding: '20px',
      }}
    >
      <Container
        style={{
          maxWidth: '800px',
          backgroundColor: '#000', // Fond noir pour tout le container
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          color: '#fff', // Texte en blanc par défaut
        }}
      >
        {/* En-tête */}
        <Row>
          <Col xs={12} className="text-center p-4" style={{ borderBottom: '1px solid #555' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#ff4d4d', // Couleur rouge vif
                marginBottom: '5px',
              }}
            >
              {formData.firstName}  {formData.lastName}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#ddd', // Texte gris clair
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              Admin Profile
            </p>
          </Col>
        </Row>

        {/* Contenu principal */}
        <Row className="p-4">
          {/* Informations utilisateur */}
          <Col md={4}>
            <Card
              className="shadow-sm"
              style={{
                borderRadius: '8px',
                backgroundColor: '#333', // Gris foncé pour contraster avec le noir
                color: '#fff',
                padding: '20px',
              }}
            >
              <h5 style={{ color: '#fff' }}>Informations</h5>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Téléphone:</strong> {formData.phone}</p>
              <p><strong>Rôle:</strong> {formData.role}</p>
            </Card>
          </Col>

          {/* Formulaire de modification */}
          <Col md={8}>
            <Form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: '#000', // Fond noir
                color: '#fff', // Texte en blanc
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#333', // Fond du champ en gris foncé
                    color: '#fff',
                    border: '1px solid #555',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #555',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #555',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #555',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #555',
                  }}
                />
              </Form.Group>

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: '#ff4d4d',
                    borderRadius: '6px',
                    border: 'none',
                  }}
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilAdmin;
