import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaChevronDown } from 'react-icons/fa';
import './userInformation.css';

const UserInformation = ({ userData, onUpdateProfile, onUpdatePassword }) => {
  const [formData, setFormData] = useState({
    ...userData,
    password: ''
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("jwtToken");
      formData.password = passwords.currentPassword;
      
      const response = await fetch("http://localhost:8082/api/utilisateur/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      if (response.status !== 200) {
        alert('Current password is incorrect');
        return;
      }

      formData.password = passwords.newPassword;
      onUpdatePassword(formData);
      
      setPasswords({
        currentPassword: '',
        newPassword: ''
      });
      
      setShowPasswordSection(false);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  return (
    <div className="user-information">
      <div className="info-header">
        <h2 className="section-title">User Profile</h2>
        <p className="section-subtitle">Manage your account settings and preferences</p>
      </div>
      
      <form onSubmit={handleProfileSubmit} className="info-form">
        <div className="form-group">
          <label>
            <FaUser className="input-icon" />
            Full Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
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
            value={formData.email}
            onChange={handleInputChange}
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
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="update-btn">
            Update Profile
          </button>
          <button 
            type="button" 
            className="password-toggle-btn"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
          >
            <FaLock />
            Change Password
            <FaChevronDown className={`arrow-icon ${showPasswordSection ? 'rotated' : ''}`} />
          </button>
        </div>
      </form>

      <div className={`password-section ${showPasswordSection ? 'visible' : ''}`}>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="password-grid">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="update-password-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInformation;

