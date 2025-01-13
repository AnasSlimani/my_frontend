import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaUserTag } from 'react-icons/fa';

function FormUpdateUser({ userId, initialData, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password:''
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/utilisateur/${userId}`);
        const data = await response.json();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          password: data.password
        });
      } catch (err) {
        console.error('Erreur fetching user data:', err.message);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
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
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8082/api/utilisateur/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmitSuccess();
      } else {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Network error occurred. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label><FaUser /> First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label><FaUser /> Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label><FaEnvelope /> Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label><FaPhone /> Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="role">
        <Form.Label><FaUserTag /> Role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          isInvalid={!!errors.role}
        />
        <Form.Control.Feedback type="invalid">
          {errors.role}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          Update User
        </Button>
      </div>
    </Form>
  );
}

export default FormUpdateUser;

