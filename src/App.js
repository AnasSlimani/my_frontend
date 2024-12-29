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
import ErrorPage from './pages/ErrorPage';
import GestionVehicules from './Components/Admin/GestionVehicules';
import FormAddVehicle from './Components/Admin/FormAddVehicle';
import UpdateVehicule from './Components/Admin/UpdateVehicule';


import ForgetPasswd from './pages/forgetPasswordLogin/ForgetPasswd';

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
        <Route path="/admin/vehicules" element={<GestionVehicules />} />
        <Route path="/admin/vehicules/FormAddVehicle" element={<FormAddVehicle />} />
        <Route path="/admin/clients/FormAddUser" element={<FormAddUser />} />
        <Route path="/admin/clients/UpdateUser/:id" element={<UpdateUser />} />
        <Route path="/admin/vehicules/UpdateVehicule/:id" element={<UpdateVehicule />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswd />} />
      </Routes>
    </Router>
    </>
  );
}

export default App

