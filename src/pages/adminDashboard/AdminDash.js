import { useEffect, useState } from 'react'
import '../../Components/Admin/Admin.css';

import HeaderAdmin from '../../Components/Admin/HeaderAdmin'
import SideBarAdmin from '../../Components/Admin/SideBarAdmin'
import HomeAdmin from '../../Components/Admin/HomeAdmin'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function AdminDash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if (role != "ADMIN"){
        navigate("/error");
    }
  },[]);

  return (
    <div className='grid-container'>
      <HeaderAdmin OpenSidebar={OpenSidebar}/>
      <SideBarAdmin openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <HomeAdmin />
    </div>
  )
}

export default AdminDash;


