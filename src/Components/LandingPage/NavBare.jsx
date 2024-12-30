import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/car-logo.png';
import '../UserDash/nave.css';
import { useAuth } from '../../context/AuthContext';

function NavBare({ onTogglePanier }) {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <header>
      <nav className={nav ? 'nav active' : 'nav'}>
        <Link to='/' className='logo' smooth={true} duration={1700}>
          <img src={logo} alt='' />
        </Link>
        <input type='checkbox' id='menu-btn' className='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='nav-icon'></span>
        </label>
        <ul className='menu'>
          <li>
            <Link to='/' smooth={true} duration={1700}>
              HOME
            </Link>
          </li>
        </ul>

        <div className='buttonss'>
          {isAuthenticated && (
            <>
              <button className='panier-btn' onClick={onTogglePanier}>
                Panier <i className='fas fa-shopping-cart'></i>
              </button>
              <button className='profile-btn' onClick={handleProfile}>
                Profile <i className='fas fa-user'></i>
              </button>
            </>
          )}
          <button onClick={handleAuth} className={isAuthenticated ? 'logout-btn' : 'sign-up-btn'}>
            {isAuthenticated ? 'Logout' : 'Sign Up'} <i className={`fas fa-${isAuthenticated ? 'sign-out-alt' : 'user-circle'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBare;

