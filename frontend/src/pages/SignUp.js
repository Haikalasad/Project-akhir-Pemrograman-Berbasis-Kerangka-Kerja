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
  console.log(formData);

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
        navigate('/login/pencari');
      } else {
        console.error('Signup failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">  
      <div className="signup-image">
        <img src="../assets/signup.png" alt="SignUp Pencari Kost" style={{ width: '80%' }} />
      </div>
      <div className="signup-form">
        <h1>Create Account</h1>
        <div style={{ marginTop: '30px',  display: 'flex' }}>
          <input
            type={'text'}
            name="nama"
            placeholder='Username'
            value={formData.nama}
            onChange={handleChange}
            style={{
              border: 'none',
              borderBottom: '1px solid gray',
              width:'90%',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex' }}>
          <label htmlFor='email'> </label>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            style={{
              border: 'none',
              borderBottom: '1px solid gray',
              width:'90%',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex'}}>
          <label htmlFor='password'> </label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            style={{
              border: 'none',
              borderBottom: '1px solid gray',
              width:'90%',
            }}
          />
        </div>    
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <div className="login-link">
          <span>Sudah Punya Akun? </span>
          <a href='/login/pencari'>Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
