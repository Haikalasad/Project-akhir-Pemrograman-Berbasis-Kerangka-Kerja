// ChooseRole.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/ChooseRole.css'; // Import the CSS file

const ChooseRole = () => {
  return (
    <div className="choose-role-container">
      <div className="choose-role-box">
        <h2 className="choose-role-heading">Pilih peran Anda:</h2>
        <Link to="/login/pencari" className="choose-role-link">
        Pencari Kost
        </Link>
        <Link to="/login/pemilik" className="choose-role-link">
        Pemilik Kost
        </Link>
      </div>
    </div>
  );
};

export default ChooseRole;
