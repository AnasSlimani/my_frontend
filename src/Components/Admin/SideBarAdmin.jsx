import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill,BsBoxArrowRight, BsFillGearFill}
 from 'react-icons/bs'

 import { FaCar, FaUsers, FaUserShield,FaCalendarCheck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

function SideBarAdmin({openSidebarToggle, OpenSidebar}) {

    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur
  
  const handleLogout = () => {
    // Logique de déconnexion ici si nécessaire
    // Par exemple, suppression des tokens d'authentification
    console.log("Logout effectué !");
    
    // Redirection vers la page landing
    navigate('/');
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
        <div className='sidebar-brand text-black'>
           Welcome Ihab
        </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                
                <Link to="/admin" >
                <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaCalendarCheck className='icon '/> Reservations
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaCar className='icon'/> Vehicules
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                {/* <a href="">
                    <FaUsers className='icon'/> Clients 
                </a> */}
                <Link to="/admin/clients" >
                <FaUsers className='icon'/> Clients 
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaUserShield className='icon'/> Admins
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            <li className='sidebar-list-item logout'>
          <a href="#" onClick={handleLogout}>
            <BsBoxArrowRight className='icon' /> Logout
          </a>
        </li>
        </ul>
    </aside>
  )
}

export default SideBarAdmin;