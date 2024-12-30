import React, { useState } from 'react';
import { Link } from 'react-scroll';
import logo from '../../images/car-logo.png';
import '../../styles/nav.css';
import { AuthButtons } from '../shared/NavButtons';

function Navbar() {
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  return (
    <header>
      <nav className={nav ? "nav active" : "nav"}>
        <Link to='hero' className='logo' smooth={true} duration={1700}>
          <img src={logo} alt="" />
        </Link>
        <input type="checkbox" id='menu-btn' className='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='nav-icon'></span>
        </label>
        <ul className='menu'>
          <li><Link to='hero' smooth={true} duration={1700}>HOME</Link></li>
          <li><Link to='about' smooth={true} duration={1700}>ABOUT</Link></li>
          <li><Link to='vehicules' smooth={true} duration={1700}>MARQUES</Link></li>
          <li><Link to='review' smooth={true} duration={1700}>CLIENTS</Link></li>
          <li><Link to='#' smooth={true} duration={1700}>CONTACT</Link></li>
        </ul>
        <AuthButtons />
      </nav>
    </header>
  );
}

export default Navbar;

