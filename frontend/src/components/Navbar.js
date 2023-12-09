import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate
import '../styling/NavbarComponent.css';

function NavbarComponent() {
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  const navigateTo = (path) => {
    navigate(path); // Ganti history.push dengan navigate
  };

  return (
    <div className="navbar">
    <div className="container">

      <div className="title">
        <h3>Kostku</h3>
      </div>
      <div className="menu">
        <ul>
          <li onClick={() => navigateTo('/')}>Home</li>
          <li onClick={() => navigateTo('/explore')}>Explore</li>
          <li onClick={() => navigateTo('/about')}>About</li>
          <li onClick={() => navigateTo('/contact')}>My Order</li>
        </ul>
      </div>
      <div className="login">
        <span onClick={() => navigateTo('/login')}>Login</span>
      </div>
    </div>
    </div>
  );
}

export default NavbarComponent;
