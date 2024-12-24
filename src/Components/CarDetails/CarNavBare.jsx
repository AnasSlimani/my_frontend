import React, { useState } from 'react';
import logo from '../../images/car-logo.png';
import { Link } from 'react-router-dom';
import './CarNavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBare({ onTogglePanier }) {
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  const SignUpClick = () => {
    navigate('/login');
  };
  const onBACK = () =>{
    navigate('/signup')
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
          {/* Bouton Panier avec logique */}
          <button className='panier-btn' onClick={onBACK}>
            Back <i class="fa-solid fa-backward"></i>
          </button>
          <button className='panier-btn' onClick={onTogglePanier}>
            Panier <i className='fas fa-shopping-cart'></i>
          </button>
        <button onClick={SignUpClick} className='sign-up-btn'>
            Sign Up <i className='fas fa-user-circle'></i>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBare;
