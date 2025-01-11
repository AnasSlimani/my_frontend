import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaCar, 
  FaUsers, 
  FaUserShield,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserTie
} from 'react-icons/fa';
import './SideBar.css';
import { useAuth } from '../../context/AuthContext'; // Make sure this path is correct

function SideBarAdmin({openSidebarToggle, OpenSidebar}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // Use the logout function from AuthContext

  const handleProfileClick = () => {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    const adminId = decodedToken.id;
    if (adminId) {
      navigate(`/admin/clients/ProfilAdmin/${adminId}`);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Navigate to the home page
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
          <FaUserTie className="profile-icon" />
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
        <button onClick={handleLogout} className="nav-item logout">
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBarAdmin;

