// import React from 'react'
// import 
// {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
//   BsListCheck, BsMenuButtonWideFill,BsBoxArrowRight, BsFillGearFill}
//  from 'react-icons/bs'

//  import { FaCar, FaUsers, FaUserShield,FaCalendarCheck } from 'react-icons/fa'
// import { Link, useNavigate } from 'react-router-dom';

// function SideBarAdmin({openSidebarToggle, OpenSidebar}) {

//     const navigate = useNavigate(); // Hook pour rediriger l'utilisateur
  
//   const handleLogout = () => {
//     // Logique de déconnexion ici si nécessaire
//     // Par exemple, suppression des tokens d'authentification
//     console.log("Logout effectué !");
    
//     // Redirection vers la page landing
//     navigate('/');
//   };

//   return (
//     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
//         <div className='sidebar-title'>
//         <div className='sidebar-brand text-black'>
//            Welcome Ihab
//         </div>
//             <span className='icon close_icon' onClick={OpenSidebar}>X</span>
//         </div>

//         <ul className='sidebar-list'>
//             <li className='sidebar-list-item'>
                
//                 <Link to="/admin" >
//                 <BsGrid1X2Fill className='icon'/> Dashboard
//                 </Link>
//             </li>
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <FaCalendarCheck className='icon '/> Reservations
//                 </a>
//             </li>
//             <li className='sidebar-list-item'>
//                 {/* <a href="">
//                     <FaCar className='icon'/> Vehicules
//                 </a> */}
//                 <Link to="/admin/vehicules" >
//                 <FaCar className='icon'/> Vehicules
//                 </Link>
//             </li>
//             {/* <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsFillGrid3X3GapFill className='icon'/> Categories
//                 </a>
//             </li> */}
//             <li className='sidebar-list-item'>
//                 {/* <a href="">
//                     <FaUsers className='icon'/> Clients 
//                 </a> */}
//                 <Link to="/admin/clients" >
//                 <FaUsers className='icon'/> Clients 
//                 </Link>
//             </li>
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <FaUserShield className='icon'/> Admins
//                 </a>
//             </li>
//             {/* <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsMenuButtonWideFill className='icon'/> Reports
//                 </a>
//             </li> */}
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsFillGearFill className='icon'/> Setting
//                 </a>
//             </li>
//             <li className='sidebar-list-item logout'>
//             <Link to="/" >
//             <BsBoxArrowRight className='icon' /> Logout
//                 </Link>
//           {/* <a href="#" onClick={handleLogout}>
//             <BsBoxArrowRight className='icon' /> Logout
//           </a> */}


//         </li>
//         </ul>
//     </aside>
//   )
// }

// export default SideBarAdmin;

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
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""} style={{
      position: 'fixed',
      width: '250px',
      height: '100vh', // Prendre toute la hauteur de la page
    //   overflowY: 'auto' // Permettre le défilement si le contenu est trop grand
    }}>
        <div className='sidebar-title' >
        <div className='sidebar-brand text-black'>
           Welcome Ihab
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
                <a href="" >
                    <FaCalendarCheck className='icon' style={{ marginRight: '10px' }}/> Reservations
                </a>
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
            <li className='sidebar-list-item' >
                <a href="" >
                    <FaUserShield className='icon' style={{ marginRight: '10px' }}/> Admins
                </a>
            </li>
            <li className='sidebar-list-item' >
                <a href="" >
                    <BsFillGearFill className='icon' style={{ marginRight: '10px' }}/> Setting
                </a>
            </li>
            <li className='sidebar-list-item logout' >
                <Link to="/" >
                <BsBoxArrowRight className='icon' style={{ marginRight: '10px' }}/> Logout
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default SideBarAdmin;
