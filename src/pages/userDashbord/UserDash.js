import React, { useEffect, useState } from 'react'
import Header from '../../Components/UserDash/Header'
import FilterSection from '../../Components/UserDash/FilterSection'
import UserDashboard from '../../Components/UserDash/UserDashboard'
import NavBare from '../../Components/LandingPage/NavBare'
import { useAuth } from '../../context/AuthContext';
import {UsersInfos}  from '../../Components/auth/Authentification'
import { useNavigate  } from 'react-router-dom';

const UserDash = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
        <UserDashboard isAuthenticated={isAuthenticated} />
    </>
  )
}

export default UserDash