import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaStar, FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import SideBarAdmin from "./SideBarAdmin";
import './profilAdmin.css';

function ProfilAdmin() {
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const decodedToken = jwtDecode(token);
        const adminId = decodedToken.id;

        const response = await fetch(`http://localhost:8082/api/utilisateur/${adminId}`);
        const data = await response.json();
        setAdminData(data);
      } catch (err) {
        console.error("Error fetching admin data:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwtDecode(token);
      const adminId = decodedToken.id;

      const response = await fetch(`http://localhost:8082/api/utilisateur/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData)
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwtDecode(token);
      const adminId = decodedToken.id;

      const response = await fetch(`http://localhost:8082/api/utilisateur/password/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      if (response.ok) {
        alert('Password updated successfully!');
        // Reset password fields after successful update
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update password. Please check your current password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        <Col md={2}>
          <SideBarAdmin />
        </Col>
        <Col md={10} className="dashboard-main">
          <div className="profile-container">
            <Row>
              {/* Left Column - Profile Card */}
              <Col md={4}>
                <div className="profile-card">
                  <div className="profile-image">
                    <img src="/placeholder.svg" alt="Profile" />
                  </div>
                  <h2 className="profile-name">{adminData.firstName} {adminData.lastName}</h2>
                  <div className="profile-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{adminData.address || 'No address provided'}</span>
                  </div>
                  <div className="profile-rating">
                    <FaStar className="star-icon" />
                    <span>5.0</span>
                    <span className="rating-count">(Administrator)</span>
                  </div>
                  <button className="close-account-btn">Close Account</button>
                </div>
              </Col>

              {/* Right Column - Profile Form */}
              <Col md={8}>
                <div className="profile-form-container">
                  <section className="form-section">
                    <h3>Profile</h3>
                    <p className="section-subtitle">User Information</p>
                    
                    <form onSubmit={handleSave}>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={adminData.firstName}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={adminData.email}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={adminData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <button type="submit" className="save-btn">Save Now</button>
                    </form>
                  </section>

                  <section className="form-section">
                    <h3>Password</h3>
                    <p className="section-subtitle">Update your password</p>
                    
                    <form onSubmit={handlePasswordUpdate}>
                      <div className="form-group password-group">
                        <label>Current Password</label>
                        <div className="password-input">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="form-group password-group">
                        <label>New Password</label>
                        <div className="password-input">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="form-group password-group">
                        <label>Confirm New Password</label>
                        <div className="password-input">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <button type="submit" className="save-btn">Update Password</button>
                    </form>
                  </section>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilAdmin;

