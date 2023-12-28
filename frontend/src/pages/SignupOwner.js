import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/SignUp.css'; // Import file CSS terpisah

const SignUpOwner = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_hp: '',
    alamat: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/kost/signup/owner', formData);

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
    <div className="signup-owner-container"> 
      <div className="signup-owner-image">
        <img src="../assets/signupowner.png" alt="SignUp Pencari Kost" style={{ width: '80%' }} />
      </div>
      <div className="signup-owner-form">
        <h1>Create Account</h1>
        <h5>Owner Kost!</h5>
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

        <div style={{  marginBottom: '10px', display: 'flex' }}>
          <input
            type="tel"
            name="no_hp"
            placeholder='No Telp'
            value={formData.no_hp}
            onChange={handleChange}
            style={{
              border: 'none',
              borderBottom: '1px solid gray',
              width:'90%',
            }}
          />
        </div>

        <div style={{  marginBottom: '10px', display: 'flex' }}>
          <input
            type={'text'}
            name="alamat"
            placeholder='Alamat'
            value={formData.alamat}
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
          <a href='/login/pemilik'>Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpOwner;
