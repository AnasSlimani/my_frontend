import React from 'react'
import Header from '../../Components/UserDash/Header'
import FilterSection from '../../Components/UserDash/FilterSection'
import UserDashboard from '../../Components/UserDash/UserDashboard'
import NavBare from '../../Components/LandingPage/NavBare'
import { useAuth } from '../../context/AuthContext';

const UserDash = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
        <UserDashboard isAuthenticated={isAuthenticated} />
    </>
  )
}

export default UserDash