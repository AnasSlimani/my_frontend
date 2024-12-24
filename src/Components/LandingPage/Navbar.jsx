import React, { useState } from 'react';
import logo from '../../images/car-logo.png';
import { Link } from 'react-scroll';
import '../../styles/nav.css'
import { useNavigate } from 'react-router-dom';


function Navbar() {

    const navigate = new useNavigate();

    const [nav, setnav] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setnav(true);
        }
        else {
            setnav(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    const SignUpClick = ()=>{
        navigate('/login')
    }

    return (
        <header>
            <nav className={nav ? "nav active" : "nav"} >
                <Link to='hero' className='logo' smooth={true} duration={1700} >
                    <img src={logo} alt="" />
                </Link>
                <input type="checkbox" id='menu-btn' className='menu-btn' />
                <label className='menu-icon' for='menu-btn'> <span className='nav-icon'></span></label>
                <ul className='menu'>
                    <li><Link to='hero' smooth={true} duration={1700} >HOME</Link></li>
                    <li><Link to='about' smooth={true} duration={1700} >ABOUT</Link></li>
                    <li><Link to='vehicules' smooth={true} duration={1700} >MARQUES</Link></li>
                    <li><Link to='review' smooth={true} duration={1700} >CLIENTS</Link></li>
                    <li><Link to='#' smooth={true} duration={1700} >CONTACT</Link></li>
                </ul>
                <button onClick={SignUpClick} className="sign-up-btn" >Sign Up <i className="fas fa-user-circle"></i></button>
                


            </nav>
        </header>
    )
}
export default Navbar;  