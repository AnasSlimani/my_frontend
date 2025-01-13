import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLock,
  FaUserShield,
  FaEdit
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import SideBarAdmin from "./SideBarAdmin";
import './profilAdmin.css';
import profil from '../../images/compagnyLOGO.jpeg'

function ProfilAdmin() {
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password:'',
    role:''
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
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const adminId = decodedToken.id;

    
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      adminData.password = passwords.currentPassword ;
      console.log(adminData);
      
      const response = await fetch("http://localhost:8082/api/utilisateur/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(adminData)
    });
      if(response.status != 200){
        alert('Current password is incorrect');
      }else {
         adminData.password = passwords.newPassword ;
        const response = await fetch(`http://localhost:8082/api/utilisateur/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData)
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
            <h1 className="page-title">
              <FaUserShield className="page-title-icon" />
              Admin Profile
            </h1>
            <Row>
              {/* Left Column - Profile Card */}
              <Col md={4}>
                <div className="profile-card">
                  <div className="profile-image-container">
                    <div className="profile-image">
                      <img src={profil} alt="Profile" />
                    </div>
                    <button className="edit-profile-image">
                      <FaEdit />
                    </button>
                  </div>
                  <h2 className="profile-name">{adminData.firstName} {adminData.lastName}</h2>
                  <div className="profile-info">
                    <div className="profile-location">
                      <FaMapMarkerAlt className="info-icon" />
                      <span>{adminData.address || 'AL FIRDAOUSS KHOURIBGA'}</span>
                    </div>
                    <div className="profile-rating">
                      <FaStar className="info-icon" />
                      <span>9.0</span>
                      <span className="rating-count">(Administrator)</span>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Right Column - Profile Form */}
              <Col md={8}>
                <div className="profile-form-container">
                  <section className="form-section">
                    <h3>
                      <FaUser className="section-icon" />
                      Profile Information
                    </h3>
                    <p className="section-subtitle">Manage your personal information</p>
                    
                    <form onSubmit={handleSave}>
                      <div className="form-group">
                        <label>
                          <FaUser className="input-icon" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={adminData.firstName}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaEnvelope className="input-icon" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={adminData.email}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaPhone className="input-icon" />
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={adminData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <button type="submit" className="save-btn">
                        <FaEdit className="btn-icon" />
                        Update Profile
                      </button>
                    </form>
                  </section>

                  <section className="form-section">
                    <h3>
                      <FaLock className="section-icon" />
                      Change Password
                    </h3>
                    <p className="section-subtitle">Ensure your account is using a strong password</p>
                    
                    <form onSubmit={handlePasswordUpdate}>
                      <div className="form-group password-group">
                        <label>
                          <FaLock className="input-icon" />
                          Current Password
                        </label>
                        <div className="password-input">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                            placeholder="Enter your current password"
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
                        <label>
                          <FaLock className="input-icon" />
                          New Password
                        </label>
                        <div className="password-input">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                            placeholder="Enter your new password"
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
                        <label>
                          <FaLock className="input-icon" />
                          Confirm New Password
                        </label>
                        <div className="password-input">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                            placeholder="Confirm your new password"
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

                      <button type="submit" className="save-btn">
                        <FaLock className="btn-icon" />
                        Update Password
                      </button>
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

