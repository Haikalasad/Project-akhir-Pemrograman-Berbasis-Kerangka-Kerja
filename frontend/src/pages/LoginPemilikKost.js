import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function LoginOwner() {
    const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const navigateTo = (path) => {
    navigate(path);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/kost/login/owner', {
        email,
        password,
      });

      console.log(response);

      if (response.data.status) {
        console.log('Login berhasil:', response.data);

        // Call the login function from useUser with the received user ID
        login(response.data.user.id);

        // Navigate to the desired page (e.g., '/home')
        navigate('/dashboard');
      } else {
        console.error('Login gagal:', response.data.message || 'Terjadi kesalahan');
        // Handle kesalahan login di sini
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      // Handle kesalahan umum di sini
    }
  };
  
  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleSendCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/kost/send-code', {
        email: resetEmail,
      });

      if (response.data.status) {
        alert(`Kode dikirim ke: ${resetEmail}`);
      } else {
        console.error('Gagal mengirim kode:', response.data.message);
        // Handle kesalahan pengiriman kode di sini
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      // Handle kesalahan umum di sini
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
        <h1>Login</h1>

        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '15px' }} size='15px' />
          <label htmlFor='email'></label>
          <input
            type={'text'}
            id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: 'none',
              borderBottom: '1px solid gray',
            }}
          />
        </div>
        <div style={{ marginBottom: '35px', display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faLock} style={{ marginRight: '15px' }} size='15px' />
          <label htmlFor='password'></label>
          <input
            type={'password'}
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: 'none',
              borderBottom: '1px solid gray',
            }}
          />
        </div>
        {forgotPassword ? (
          <>
            <div style={{ marginBottom: '30px' }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '15px' }} size='15px' />
              <label htmlFor='resetEmail'></label>
              <input
                type={'email'}
                id='resetEmail'
                placeholder='Email'
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: '1px solid gray',
                }}
              />
              <button
                style={{
                  backgroundColor: 'white',
                  color: '#f1c40f',
                  marginLeft: '30px',
                  marginBottom: '20px',
                  border: 'none',
                }}
                onClick={handleSendCode}
              >
                Kirim Kode via Email
              </button>
            </div>
            <button style={{ marginBottom: '10px', border: 'none' }} onClick={() => setForgotPassword(false)}>
              Kembali ke Login
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '20px', border: 'none' }}>
              <button style={{ border: 'none' }} onClick={handleForgotPassword}>
                Lupa Password
              </button>
            </div>
            <button
              style={{
                backgroundColor: '#4169E1',
                color: '#f1c40f',
                marginBottom: '30px',
                borderRadius: '6px',
                border: 'none',
                width: '40%',
              }}
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </>
        )}
        <div>
          <span>Belum punya akun? </span>
          <a href='/signup'>Daftar</a>
        </div>
      </div>
    </div>
  );
}

export default LoginOwner;
