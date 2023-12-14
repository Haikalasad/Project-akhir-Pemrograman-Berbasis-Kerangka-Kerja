import React, { createContext, useContext, useState } from 'react';

// Buat konteks untuk pengguna
const UserContext = createContext();

// Fungsi penyedia konteks yang akan digunakan di komponen induk
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const loginUser = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Fungsi hook untuk menggunakan konteks pengguna di komponen anak
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
