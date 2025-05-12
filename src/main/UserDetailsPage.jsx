// UserDetailsPage.js
import React, { useEffect, useState } from 'react';
import './styles/UserDetailsPage.css';
import { useNavigate } from 'react-router-dom';

const UserDetailsPage = ({ userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const toggleModal = () => setShowModal(!showModal);

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0].toUpperCase())
      .join('')
      .slice(0, 2);
  };

  useEffect(() => {
    const getLocation = async () => {
      if (!location) {
        try {
          const current_location = await getUserCoordinates();
          setLocation(current_location);
        } catch (err) {
          console.warn(err);
        }
      }
    };
    getLocation();
  }, [location]);

  const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser.');
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject('Failed to get location: ' + error.message);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const logUserOut = ()=>{
    const logout = window.confirm("Are you sure you want to log out?");
    if(logout){
      sessionStorage.removeItem('bitepilot_user');
      setShowModal(false);
      navigate("/login");
    }

  }

  return (
    <div className="user-details-component-wrapper">
      <div className="user-floating-icon" onClick={toggleModal} title="View Profile">
        {getInitials(userData?.name)}
      </div>

      {showModal && (
        <div className="user-profile-modal-overlay" onClick={toggleModal}>
          <div className="user-profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="user-profile-title">User Profile</h2>
            <ul className="user-profile-info-list">
              <li><strong>Name:</strong> {userData?.name}</li>
              <li><strong>Phone:</strong> {userData?.phone}</li>
              <li><strong>UID:</strong> {userData?.uid}</li>
              <li><strong>Joined:</strong> {new Date(userData?.createdAt).toLocaleString()}</li>
              <li>
                <strong>Location:</strong> {location
                  ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
                  : <span className="user-location-loading">Fetching location...</span>}
              </li>
            </ul>
            <div className='user-profile-action-btn'>
                <button className="user-profile-close-btn" onClick={toggleModal}>Close</button>
                <button className="user-profile-logout-btn" onClick={logUserOut}>Log out</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
