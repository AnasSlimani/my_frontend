import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../images/car-logo.png';
import './profileNavbar.css';

const ProfileNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className="profile-navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/" className="nav-link">HOME</Link>
      </div>
      <div className="nav-right">
        <button onClick={handleBack} className="nav-button back-btn">
          BACK
        </button>
        <button onClick={handleLogout} className="nav-button logout-btn">
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default ProfileNavbar;

