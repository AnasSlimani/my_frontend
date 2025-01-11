import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../images/car-logo.png';
import './profileNavbar.css';

const ProfileNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [nav, setNav] = React.useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header>
      <nav className={nav ? 'nav active' : 'nav'}>
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <input type="checkbox" id="menu-btn" className="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          <li>
            <Link to="/">HOME</Link>
          </li>
        </ul>
        <div className="buttonss">
          <button onClick={handleBack} className="panier-btn">
            Back <i className="fas fa-arrow-left"></i>
          </button>
          <button onClick={handleLogout} className="sign-up-btn">
            Logout <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default ProfileNavbar;

