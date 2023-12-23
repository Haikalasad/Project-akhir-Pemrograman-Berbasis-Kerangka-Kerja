import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import '../styling/explore_hero_section.css';
import { Link } from 'react-router-dom';
import ExploreSearch from "../components/Explore_search";

const ExploreHeroSection = () => {
  const [allKosts, setAllKosts] = useState([]);
  const [filteredKosts, setFilteredKosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch popular Kosts data
    fetch('http://localhost:3001/api/kost/all')
      .then(response => response.json())
      .then(data => setAllKosts(data.data)) // Limit to 4 items
      .catch(error => console.error('Error fetching popular kosts:', error));
  }, []);

  const handleSearch = (query) => {
    // Filter Kosts based on search query
    const filtered = allKosts.filter(
      (kost) =>
        kost.nama.toLowerCase().includes(query.toLowerCase()) ||
        kost.alamat.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredKosts(filtered);
  };

  // Update filtered Kosts when searchQuery changes
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, allKosts]);

  return (
    <div className="explore-container">
      <div className="Hero-section">
        <div className="text">
          <h1>Eksplor</h1>
          <p>Temukan kost yang cocok dengan kantongmu! </p>
        </div>
      </div>
      <ExploreSearch onSearch={handleSearch} />
      <div className="search-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="search-icon" /> 
      </div>

      <div className="kost-section">
        <div className="kost-cards">
          {filteredKosts.map(kost => (
            <div className="kost-card" key={kost.id}>
              <img src={kost.foto} alt={kost.nama} />
              <h3>{kost.nama}</h3>
              <p>Harga: {kost.harga}</p>
              <p>Kategori: {kost.kategori}</p>
              <p>Jenis: {kost.jenis}</p>
              <p>Alamat: {kost.alamat}</p>
              {/* Link to the detail page with the Kost ID */}
              <Link to={`/detail/${kost.id}`}>Lihat Detail</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreHeroSection;