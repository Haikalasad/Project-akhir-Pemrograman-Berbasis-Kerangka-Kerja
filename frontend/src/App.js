// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/LoginPencariKost';
import DetailPage from './pages/DetailPage';
import Eksplor from './pages/eksplor';
import { UserProvider } from './UserContext';
import Myorder from './pages/MyOrder';
import SignUp from './pages/SignUp';
import ChooseRole from './pages/ChooseRole';
import Dashboard from './pages/DashboardOwner';
import LoginOwner from './pages/LoginPemilikKost';
import Pesanan from './pages/pesanan';
import SignUpOwner from './pages/SignupOwner';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<ChooseRole />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login/pencari" element={<Login />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/explore" element={<Eksplor />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login/pemilik" element={<LoginOwner/>} />
          <Route path="/pesanan" element={<Pesanan/>} />
          <Route path="/signup/owner" element={<SignUpOwner />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
