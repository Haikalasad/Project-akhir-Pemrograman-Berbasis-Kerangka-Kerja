// PopularSection.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styling/PopularSection.css';

const PopularSection = () => {
  const [popularKosts, setPopularKosts] = useState([]);

  useEffect(() => {
    // Fetch popular Kosts data
    fetch('http://localhost:3001/api/kost/popularKost')
      .then(response => response.json())
      .then(data => setPopularKosts(data.data.slice(0, 4))) // Limit to 4 items
      .catch(error => console.error('Error fetching popular kosts:', error));
  }, []);
  

  return (
    <div className="popular-section">
      <div className="popular-header">
        <h1>Popular Kost</h1>
        <Link to="/see-more">See More</Link>
      </div>
      <div className="popular-cards">
        {popularKosts.map(kost => (
          <div className="popular-card" key={kost.id}>
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
  );
};

export default PopularSection;
