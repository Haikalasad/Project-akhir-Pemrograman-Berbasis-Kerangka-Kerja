import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        navigate('/');
      } else {
        console.error('Signup failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontWeight: '500',
        background: 'linear-gradient(#0561EB, #ffffff, #FFD700)',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
          background: 'white',
          borderRadius: '8px',
          padding: '30px',
        }}
      >
        <h1>Create Account</h1>
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '50px',
          }}
        ></div>
                <div style={{ marginBottom: '35px', display: 'flex', alignItems: 'center' }}>
            <input 
                type={'text'}
                name="nama"
                placeholder='Username'
                value={formData.nama}
                onChange={handleChange}
                style={{
                  border: 'none',
                  borderBottom: '1px solid gray',
                }}
              />
              </div>
           <div style={{ marginBottom: '35px', display: 'flex', alignItems: 'center' }}>
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
                }}
              />
              </div>
        <div style={{ marginBottom: '35px', display: 'flex', alignItems: 'center' }}>
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
                }}
              />
          </div>
           
          <button
            type="submit"
            style={{
              backgroundColor: '#4169E1',
              color: '#f1c40f',
              borderRadius: '6px',
              border: 'none',
              width: '40%',
            }}
            onClick={handleSubmit}
          >
            
            Signup
          </button>
        
      </div>
    </div>
  );
};

export default SignUp;
