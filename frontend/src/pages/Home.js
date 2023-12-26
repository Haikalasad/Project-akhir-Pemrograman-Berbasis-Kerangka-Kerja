// Home.js
import React from 'react';
import NavbarComponent from '../components/Navbar';
import HeroSection from '../components/Hero-section';
import Benefits from '../components/Benefits';
import PopularSection from '../components/popularSection';
// import RegistOwnerSection from '../components/RegistOwnerSection'; // Add this import
import Footer from '../components/footer';

const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <HeroSection />
      <Benefits />
      <PopularSection />
      {/* <RegistOwnerSection /> Include the new section */}
      <Footer />
    </div>
  );
};

export default Home;
