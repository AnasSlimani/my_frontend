import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/pagelanding/LandingPage';
import UserDash from './pages/userDashbord/UserDash';
import NavBar from './Components/LandingPage/Navbar';
import AdminDash from './pages/adminDashboard/AdminDash';
import SignUp from './pages/signup/SignUp';
import CarDetail from './pages/CarDetails/CarDetail';
import GestionClient from './Components/Admin/GestionClient';
import FormAddUser from './Components/Admin/FormAddUser';
import UpdateUser from './Components/Admin/UpdateUser';

import { AuthProvider } from './context/AuthContext';

import Booking from './pages/booking/Booking';
import ErrorPage from './pages/ErrorPage';
import GestionVehicules from './Components/Admin/GestionVehicules';
import FormAddVehicle from './Components/Admin/FormAddVehicle';
import UpdateVehicule from './Components/Admin/UpdateVehicule';
import ProfilAdmin from './Components/Admin/ProfilAdmin';
import ForgetPasswd from './pages/forgetPasswordLogin/ForgetPasswd';
import GestionReservation from './Components/Admin/GestionReservation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<UserDash />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/CarDetail/:id" element={<CarDetail />} />
          <Route path="/admin/clients" element={<GestionClient />} />
          <Route path="/admin/reservations" element={<GestionReservation />} />
          <Route path="/admin/clients/ProfilAdmin/:id" element={<ProfilAdmin />} />
          <Route path="/admin/vehicules" element={<GestionVehicules />} />
          <Route path="/admin/vehicules/FormAddVehicle" element={<FormAddVehicle />} />
          <Route path="/admin/clients/FormAddUser" element={<FormAddUser />} />
          <Route path="/admin/clients/UpdateUser/:id" element={<UpdateUser />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/forgetpassword" element={<ForgetPasswd />} />
          <Route path="/admin/vehicules/UpdateVehicule/:id" element={<UpdateVehicule />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
