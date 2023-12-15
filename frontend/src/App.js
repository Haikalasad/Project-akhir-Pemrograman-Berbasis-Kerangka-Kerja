// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DetailPage from './pages/DetailPage';
import Eksplor from './pages/eksplor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/explore" element={<Eksplor />} />

      </Routes>
    </Router>
  );
}

export default App;
