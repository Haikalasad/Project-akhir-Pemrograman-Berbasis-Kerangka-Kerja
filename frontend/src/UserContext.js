// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Mengecek apakah ada user ID yang tersimpan di local storage saat aplikasi dimuat
  const initialUserId = localStorage.getItem('userId') || null;
  const [userId, setUserId] = useState(initialUserId);

  useEffect(() => {
    // Menyimpan user ID ke local storage setiap kali nilai berubah
    localStorage.setItem('userId', userId);
  }, [userId]);

  const login = (id) => {
    setUserId(id);
    // Tambahan logika lain yang diperlukan setelah login
  };

  const logout = () => {
    setUserId(null);
    // Tambahan logika lain yang diperlukan setelah logout
  };

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
