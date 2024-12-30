import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function FormAddUser() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/api/utilisateur/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Utilisateur ajouté avec succès');
        navigate('/admin/clients');
      } else {
        console.error('Erreur lors de l’ajout de l’utilisateur');
      }
    } catch (error) {
      console.error('Erreur de réseau ou backend :', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #e0e0e0, #bdbdbd)',
        padding: '20px',
      }}
    >
      <Container
        className="p-4 shadow"
        style={{
          maxWidth: '600px',
          backgroundColor: '#f7f7f7',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#5c5c5c' }}>
          Add User
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label style={{ fontWeight: '600' }}>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label style={{ fontWeight: '600' }}>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label style={{ fontWeight: '600' }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label style={{ fontWeight: '600' }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label style={{ fontWeight: '600' }}>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label style={{ fontWeight: '600' }}>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
            />
            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="dark"
              type="submit"
              style={{
                fontWeight: '600',
                backgroundColor: '#424242',
                borderColor: '#424242',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default FormAddUser;
