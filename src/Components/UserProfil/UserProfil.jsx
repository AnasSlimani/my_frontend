import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProfileNavbar from './ProfileNavbar';
import UserInformation from './UserInformation';
import UserReservations from './UserReservations';
import './userProfil.css';

const UserProfil = () => {
  const [userData, setUserData] = useState({});
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch user data
        const userResponse = await fetch(`http://localhost:8082/api/utilisateur/${userId}`);
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch reservations
        const reservationsResponse = await fetch(
          `http://localhost:8082/api/reservation/allreservations/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const reservationsData = await reservationsResponse.json();
        setReservations(reservationsData);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (formData) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(`http://localhost:8082/api/utilisateur/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        setUserData(formData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleUpdatePassword = async (formData) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(`http://localhost:8082/api/utilisateur/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Password updated successfully!');
        setUserData(formData);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };


  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <ProfileNavbar />
      <div className="profile-content">
        <div className="profile-grid">
          <UserInformation 
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
            onUpdatePassword={handleUpdatePassword}
          />
          <UserReservations reservations={reservations} />
        </div>
      </div>
    </div>
  );
};

export default UserProfil;

