import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/SignUp.css';  // Import file CSS terpisah

const SignUp = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/kost/signup', formData);

      if (response.status === 200) {
        console.log('Signup successful:', response.data);
        navigate('/login/pemilik');
      } else {
        console.error('Signup failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">  {/* Gunakan kelas CSS dari file SignUp.css */}
      <div className="signup-image">
        <img src="../assets/signup.png" alt="SignUp Pencari Kost" style={{ width: '80%' }} />
      </div>
      <div className="signup-form">
        <h1>Create Account</h1>
        {/* ... Bagian form ... */}
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <div className="login-link">
          <span>Sudah Punya Akun? </span>
          <a href='/'>Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
