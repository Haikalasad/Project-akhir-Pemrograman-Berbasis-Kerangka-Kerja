import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styling/NavbarComponent.css';

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar">

      <div className="container">
        <div className="title">
          <h3>Kostku</h3>
        </div>
        <div className="menu">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''} onClick={() => navigateTo('/')}>
              Home
            </li>
            <li className={location.pathname === '/explore' ? 'active' : ''} onClick={() => navigateTo('/explore')}>
              Explore
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''} onClick={() => navigateTo('/about')}>
              About
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''} onClick={() => navigateTo('/contact')}>
              My Order
            </li>
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
