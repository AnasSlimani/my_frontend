
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill,BsBoxArrowRight, BsFillGearFill}
 from 'react-icons/bs'

 import { FaCar, FaUsers, FaUserShield,FaCalendarCheck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

function SideBarAdmin({openSidebarToggle, OpenSidebar}) {

    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

    const [Fname, setFname] = useState();
    const [Lname, setLname] = useState();
    const [adminId, setadminId] = useState();

    useEffect(() => {
      const decodedToken = jwtDecode(localStorage.getItem("jwtToken")) ; // Suppose que l'ID de l'admin est stocké dans localStorage
    
    

    setadminId(decodedToken.id);
    setFname(decodedToken.FirstName);
    setLname(decodedToken.LastName);
    }, [])




  
  const handleLogout = () => {
    // Logique de déconnexion ici si nécessaire
    // Par exemple, suppression des tokens d'authentification
    console.log("Logout effectué !");
    
    // Redirection vers la page landing
    navigate('/');
  };

  const handleProfileClick = () => {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken")) ; // Suppose que l'ID de l'admin est stocké dans localStorage
    const adminId = decodedToken.id;

    if (adminId) {
      navigate(`/admin/clients/ProfilAdmin/${adminId}`);
    } else {
      console.error("Admin ID non trouvé !");
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""} style={{
      position: 'fixed',
      width: '250px',
      height: '100vh', // Prendre toute la hauteur de la page
    //   overflowY: 'auto' // Permettre le défilement si le contenu est trop grand
    }}>
        <div className='sidebar-title' >
        <div className='sidebar-brand text-black'>
           Welcome {Fname} 
        </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list' >
            <li className='sidebar-list-item' >
                <Link to="/admin" >
                <BsGrid1X2Fill className='icon' style={{ marginRight: '10px' }}/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item' >

                <Link to="/admin/reservations" >
                <FaCalendarCheck className='icon' style={{ marginRight: '10px' }}/> Reservations 
                </Link>



            </li>
            <li className='sidebar-list-item' >
                <Link to="/admin/vehicules" >
                <FaCar className='icon' style={{ marginRight: '10px' }}/> Vehicules
                </Link>
            </li>
            <li className='sidebar-list-item' >
                <Link to="/admin/clients" >
                <FaUsers className='icon' style={{ marginRight: '10px' }}/> Clients 
                </Link>
            </li>
            <li className='sidebar-list-item' onClick={handleProfileClick} style={{  color: "blue" }} >
                
                <FaUserShield className='icon' style={{ marginRight: '10px' }}/> Profil
                
            </li>
            
            <li className='sidebar-list-item logout'  >
                <Link to="/" >
                <BsBoxArrowRight className='icon' style={{ marginRight: '10px' }}/> Logout
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default SideBarAdmin;
