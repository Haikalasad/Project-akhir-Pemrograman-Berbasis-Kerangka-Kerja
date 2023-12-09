// Benefits.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHome, faStar } from '@fortawesome/free-solid-svg-icons';
import '../styling/Benefit.css';

const Benefits = () => {
  return (
    <div className="benefits-container">
      <div className="benefit-row">
        <div className="benefit">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
          <h3>Lokasi Ideal</h3>
          <p>Hunian kami memberikan akses mudah ke pusat kota dan fasilitas penting. Nikmati kepraktisan hidup di lokasi yang strategis.</p>
        </div>
        <div className="benefit">
          <FontAwesomeIcon icon={faHome} size="2x" />
          <h3>Modern dan Nyaman</h3>
          <p>Setiap kost dilengkapi dengan fasilitas modern, memastikan gaya hidup Anda dikelilingi kenyamanan dan kemudahan.</p>
        </div>
        <div className="benefit">
          <FontAwesomeIcon icon={faStar} size="2x" />
          <h3>Standar Kualitas Tinggi</h3>
          <p>Menawarkan kualitas tinggi dalam segala hal, dari fasilitas hingga pelayanan, sehingga Anda bisa merasakan kenyamanan maksimal</p>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
