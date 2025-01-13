import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/pagelanding/LandingPage';
import UserDash from './pages/userDashbord/UserDash';
import AdminDash from './pages/adminDashboard/AdminDash';
import SignUp from './pages/signup/SignUp';
import CarDetail from './pages/CarDetails/CarDetail';
import GestionClient from './Components/Admin/GestionClient';
import FormAddUser from './Components/Admin/FormAddUser';
import UpdateUser from './Components/Admin/UpdateUser';
import Booking from './pages/booking/Booking';
import ErrorPage from './pages/ErrorPage';
import GestionVehicules from './Components/Admin/GestionVehicules';
import FormAddVehicle from './Components/Admin/FormAddVehicle';
import UpdateVehicule from './Components/Admin/UpdateVehicule';
import ProfilAdmin from './Components/Admin/ProfilAdmin';
import GestionReservation from './Components/Admin/GestionReservation';
import ForgetPasswd from './pages/forgetPasswordLogin/ForgetPasswd';
import ProfilUser from './pages/profiluser/ProfilUser';
import { AuthProvider, useAuth } from './context/AuthContext';


const ProtectedUserRoute = ({Component}) => {
  const { user } = useAuth();
  if (user && user.role === 'ADMIN') {
    return <Navigate to="/error" />;
  }

  // if (!user) {
  //   return <Navigate to="/" />;
  // }
  
  return <Component />;
};

const ProtectedAdminRoute = ({Component}) => {
  const { user } = useAuth();
  if  (user && user.role === 'CLIENT'){
    return <Navigate to="/error" />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

const HandelProfilRedirect = () => {
  const { user } = useAuth();
  if (user && user.role === 'CLIENT') {
    return <ProfilUser />;
  }

  // else if(!user) {
  //   return <Navigate to="/error" />;
  // }
  return <Navigate to="/admin/clients/ProfilAdmin/:id" />
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}  />
          <Route path="/cars" element={<ProtectedUserRoute Component={UserDash}/>} />
          <Route path='/admin' element={<ProtectedAdminRoute Component={AdminDash}/>} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/CarDetail/:id" element={<ProtectedUserRoute Component={CarDetail}/>} />
          <Route path="/admin/clients" element={<ProtectedAdminRoute Component={GestionClient}/>} />
          <Route path="/admin/clients/FormAddUser" element={<ProtectedAdminRoute Component={FormAddUser}/>} />
          <Route path="/admin/clients/UpdateUser/:id" element={<ProtectedAdminRoute Component={UpdateUser}/>} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/booking" element={<ProtectedUserRoute Component={Booking}/>} />
          <Route path="/forgetpassword" element={<ForgetPasswd />} />
          <Route path="/admin/clients/ProfilAdmin/:id" element={<ProtectedAdminRoute Component={ProfilAdmin}/>} />
          <Route path="/admin/vehicules" element={<ProtectedAdminRoute Component={GestionVehicules}/>} />
          <Route path="/admin/vehicules/FormAddVehicle" element={<ProtectedAdminRoute Component={FormAddVehicle}/>} />
          <Route path="/admin/vehicules/UpdateVehicule/:id" element={<ProtectedAdminRoute Component={UpdateVehicule}/>} />
          <Route path="/admin/reservations" element={<ProtectedAdminRoute Component={GestionReservation}/>} />
          <Route path="/profile" element={<HandelProfilRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;