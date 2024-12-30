import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AuthButtons = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleSignUp = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isAuthenticated) {
    return (
      <>
        <button className="profile-btn" onClick={handleProfile}>
          Profile <i className="fas fa-user"></i>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout <i className="fas fa-sign-out-alt"></i>
        </button>
      </>
    );
  }

  return (
    <button onClick={handleSignUp} className="sign-up-btn">
      Sign Up <i className="fas fa-user-circle"></i>
    </button>
  );
};

export const CartButton = ({ onTogglePanier }) => (
  <button className="panier-btn" onClick={onTogglePanier}>
    Panier <i className="fas fa-shopping-cart"></i>
  </button>
);

export const BackButton = ({ onClick }) => (
  <button className="panier-btn" onClick={onClick}>
    Back <i className="fa-solid fa-backward"></i>
  </button>
);

