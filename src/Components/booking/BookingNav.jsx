import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/car-logo.png';
import './bookingNav.css';
import { AuthButtons, BackButton } from '../shared/NavButtons';
import { useAuth } from '../../context/AuthContext';

function BookingNav() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const { isAuthenticated } = useAuth();

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  const handleBack = () => {
    navigate('/signup');
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

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
          <BackButton onClick={handleBack} />
          <AuthButtons />
        </div>
      </nav>
    </header>
  );
}

export default BookingNav;

