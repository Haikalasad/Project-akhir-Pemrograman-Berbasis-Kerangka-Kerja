import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styling/ExploreSearch.css'

const ExploreSearch = ({ allKosts, onFilterAndSort }) => {
  const [selectedGender, setSelectedGender] = useState('all');
  const [sortOption, setSortOption] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Create a copy of the original data to avoid modifying it directly
    let filtered = [...allKosts];

    // Filter by gender
    filtered = filtered.filter(
      (kost) =>
        selectedGender === 'all' || kost.jenis.toLowerCase() === selectedGender
    );

    // Filter by search query
    filtered = filtered.filter(
      (kost) =>
        kost.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kost.alamat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered data
    if (sortOption === 'lowest') {
      filtered.sort((a, b) => a.harga - b.harga);
    } else if (sortOption === 'highest') {
      filtered.sort((a, b) => b.harga - a.harga);
    } else if (sortOption === 'proximity') {
      filtered.sort((a, b) => a.jarak - b.jarak);
    } else if (sortOption === 'popularity') {
      filtered.sort((a, b) => b.suka - a.suka);
    }  

    // Call the prop function to update the parent component with the results
    onFilterAndSort(filtered);
  }, [selectedGender, sortOption, searchQuery, allKosts, onFilterAndSort]);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="search-section">
    <div className='form-search'>

      <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
    />
    <FaSearch className="search-icon" />

    </div>
    <select value={selectedGender} onChange={handleGenderChange}>
      <option value="all">Jenis kost</option>
      <option value="laki-laki">Laki-Laki</option>
      <option value="perempuan">Perempuan</option>
      <option value="campuran">Campuran</option>
    </select>

    <select value={sortOption} onChange={handleSortChange}>
      <option value="none">Urutkan</option>
      <option value="lowest">Harga terendah</option>
      <option value="highest">Harga tertinggi</option>
      <option value="proximity">Terdekat</option>
      <option value="popularity">Populer</option>
    </select>

  
    <Link to="/explore_main_section.js"></Link>
  </div>
  );
};

export default ExploreSearch;

