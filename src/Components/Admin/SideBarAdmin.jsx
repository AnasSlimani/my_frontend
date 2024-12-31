import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaCar, 
  FaUsers, 
  FaUserShield,
  FaCalendarCheck,
  FaSignOutAlt
} from 'react-icons/fa';
import './SideBar.css';
import profilimg from '../../images/anasprofile.jpg'

function SideBarAdmin({openSidebarToggle, OpenSidebar}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    const adminId = decodedToken.id;
    if (adminId) {
      navigate(`/admin/clients/ProfilAdmin/${adminId}`);
    }
  };

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/reservations', icon: FaCalendarCheck, label: 'Reservations' },
    { path: '/admin/vehicules', icon: FaCar, label: 'Vehicules' },
    { path: '/admin/clients', icon: FaUsers, label: 'Clients' },
  ];

  return (
    <aside className={`sidebar ${openSidebarToggle ? "sidebar-responsive" : ""}`}>
      {/* Profile Section */}
      <div className="sidebar-header">
        <div className="profile-info">
          <img src={profilimg} alt="Admin" className="profile-image"/> 
          <div className="profile-details">
            <h3>Welcome Ihab</h3>
            <span>Administrator</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" />
            <span>{item.label}</span>
          </Link>
        ))}

        <button 
          onClick={handleProfileClick}
          className={`nav-item ${location.pathname.includes('/ProfilAdmin') ? 'active' : ''}`}
        >
          <FaUserShield className="nav-icon" />
          <span>Profile</span>
        </button>
      </nav>

      {/* Logout Section */}
      <div className="sidebar-footer">
        <Link to="/" className="nav-item logout">
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default SideBarAdmin;

