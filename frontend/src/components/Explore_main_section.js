import React, { useEffect, useState } from 'react';
import '../styling/explore_hero_section.css';
import { Link } from 'react-router-dom';
import ExploreSearch from '../components/Explore_search';

const ExploreHeroSection = () => {
  const [allKosts, setAllKosts] = useState([]);
  const [filteredKosts, setFilteredKosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch popular Kosts data
    fetch('http://localhost:3001/api/kost/all')
      .then((response) => response.json())
      .then((data) => setAllKosts(data.data))
      .catch((error) => console.error('Error fetching popular kosts:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterAndSort = (filteredData) => {
    setFilteredKosts(filteredData);
  };

  // Update filtered Kosts when search query changes
  useEffect(() => {
    let filtered = [...allKosts];

    // Apply search query filter
    filtered = filtered.filter(
      (kost) =>
        kost.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kost.alamat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Set the filtered Kosts
    setFilteredKosts(filtered);
  }, [searchQuery, allKosts]);

  return (
    <div className="explore-container">
      <div className="Hero-section">
        <div className="text">
          <h1>Eksplor</h1>
          <p>Temukan kost yang cocok dengan kantongmu! </p>
        </div>
      </div>
      <ExploreSearch
        allKosts={allKosts}
        onSearch={handleSearch}
        onFilterAndSort={handleFilterAndSort}
      />
      <div className="search-section">
       
       
      </div>
      <div className="kost-section">
        <div className="kost-cards">
          {filteredKosts.map((kost) => (
            <div className="kost-card" key={kost.id}>
              <img src={kost.foto} alt={kost.nama} />
              <h3>{kost.nama}</h3>
              <p>Harga: {kost.harga}</p>
              <p>Kategori: {kost.kategori}</p>
              <p>Jenis: {kost.jenis}</p>
              <p>Alamat: {kost.alamat}</p>

              <Link className = "button" to={`/detail/${kost.id}`}>Lihat Detail</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreHeroSection;
