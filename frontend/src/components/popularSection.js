// PopularSection.js
import React, { useEffect, useState } from 'react';
import '../styling/PopularSection.css';

const PopularSection = () => {
  const [popularKosts, setPopularKosts] = useState([]);

  useEffect(() => {
    // Panggil endpoint untuk mendapatkan data populair
    fetch('http://localhost:3001/api/kost/popularKost')
      .then(response => response.json())
      .then(data => setPopularKosts(data.data))
      .catch(error => console.error('Error fetching popular kosts:', error));
  }, []);

  return (
    <div className="popular-section">
      <h2>Popular Kost</h2>
      <div className="popular-cards">
        {popularKosts.map(kost => (
          <div className="popular-card" key={kost.id}>
            <img src={kost.foto} alt={kost.nama} />
            <h3>{kost.nama}</h3>
            <p>Harga: {kost.harga}</p>
            <p>Kategori: {kost.kategori}</p>
            <p>Jenis: {kost.jenis}</p>
            <p>Alamat: {kost.alamat}</p>
            <button>Lihat Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSection;
