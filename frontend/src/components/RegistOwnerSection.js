// RegistOwnerSection.js
import React from 'react';
import '../styling/RegistOwnerSection.css'; // Create this file for styling if needed

const RegistOwnerSection = () => {
  return (
    <div className="regist-owner-section">
      <div className="left-section">
        {/* Your image goes here */}
        <img src="https://images.unsplash.com/photo-1550510537-89d5433de5cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGJ1aWxkaW5nfGVufDB8fDB8fHww" alt="Owner Registration" />
      </div>
      <div className="right-section">
        <h1>Daftarkan Kost Anda</h1>
        <p>
          Jadilah bagian dari komunitas kami! Daftarkan kost Anda sekarang dan temukan
          kesempatan untuk menjangkau lebih banyak penyewa.
        </p>
        <button className="regist-button">Daftar Sekarang</button>
      </div>
    </div>
  );
};

export default RegistOwnerSection;
