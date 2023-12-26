import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styling/NavbarComponent.css';

function NavbarOwner() {
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
            <li className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => navigateTo('/dashboard')}>
              Kostmu
            </li>
            <li className={location.pathname === '/pesanan' ? 'active' : ''} onClick={() => navigateTo('/pesanan')}>
            Pesanan
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''} onClick={() => navigateTo('/about')}>
              About
            </li>
          </ul>
        </div>
      
      </div>

    </div>
  );
}

export default NavbarOwner;
