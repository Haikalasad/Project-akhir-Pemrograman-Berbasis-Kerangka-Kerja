// HeroSection.js
import React from 'react';
import '../styling/HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="left-section">
        <h1>Selamat datang di Kostku</h1>
        <p>Temukan pengalaman kost yang nyaman dan sesuai dengan kebutuhan Anda. Jelajahi pilihan kost terbaik di lokasi-lokasi strategis.</p>
        <button>Info lebih lanjut</button>
      </div>
      <div className="right-section">
        <img src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Right Section" />
      </div>
    </div>
  );
}

export default HeroSection;
