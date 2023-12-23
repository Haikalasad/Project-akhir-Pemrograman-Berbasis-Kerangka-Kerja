// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import DetailPage from './pages/DetailPage';
import Eksplor from './pages/eksplor';
import { UserProvider } from './UserContext';
import Myorder from './pages/MyOrder';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
<UserProvider/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Login />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/explore" element={<Eksplor />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
<UserProvider/>
    </Router>
  );
}

export default App;
