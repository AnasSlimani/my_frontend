import React from 'react'
import BookingNav from './BookingNav'
import FormBooking from './FormBooking'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Boooking = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
        <BookingNav />   
        <FormBooking />
    </>
  )
}

export default Boooking