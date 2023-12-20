import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExploreSearch = ({ allKosts, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Ensure allKosts is an array before attempting to filter
    if (Array.isArray(allKosts)) {
      // Filter Kosts based on search query
      const filtered = allKosts.filter(
        (kost) =>
          kost.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          kost.alamat.toLowerCase().includes(searchQuery.toLowerCase())
      );
      onSearch(filtered);
    }
  }, [searchQuery, allKosts, onSearch]);

  return (
    <div className="search-section">
      <Link to="/explore_main_section.js"></Link>
    </div>
  );
};

export default ExploreSearch;