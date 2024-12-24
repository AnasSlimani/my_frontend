import { useState } from 'react'
import '../../Components/Admin/Admin.css';

import HeaderAdmin from '../../Components/Admin/HeaderAdmin'
import SideBarAdmin from '../../Components/Admin/SideBarAdmin'
import HomeAdmin from '../../Components/Admin/HomeAdmin'

function AdminDash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <HeaderAdmin OpenSidebar={OpenSidebar}/>
      <SideBarAdmin openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <HomeAdmin />
    </div>
  )
}

export default AdminDash;


