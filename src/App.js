import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/pagelanding/LandingPage'
import UserDash from './pages/userDashbord/UserDash';
import NavBar from './Components/LandingPage/Navbar';
import AdminDash from './pages/adminDashboard/AdminDash';
import SignUp from './pages/signup/SignUp'
import CarDetail from './pages/CarDetails/CarDetail';
import GestionClient from './Components/Admin/GestionClient';
import FormAddUser from './Components/Admin/FormAddUser';
import UpdateUser from './Components/Admin/UpdateUser';

function App(){
  
  
  const [isOnline,setStatus] = useState(false);

  
  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<UserDash />} />
        <Route path='/admin' element={<AdminDash />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/CarDetail/:id" element={<CarDetail />} />
        <Route path="/admin/clients" element={<GestionClient />} />
        <Route path="/admin/clients/FormAddUser" element={<FormAddUser />} />
        <Route path="/admin/clients/UpdateUser/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
    </>
  );
}

export default App

