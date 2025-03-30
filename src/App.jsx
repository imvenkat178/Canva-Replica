import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OWASP from './pages/OWASP';
import WCAG from './pages/WCAG';
import Code from './pages/Code';
import Results from './pages/Results';
import './App.css';

function App() {
  const [scanResults, setScanResults] = useState([]);
  const location = useLocation();

  // Show sidebar only on the Results page
  const showSidebar = location.pathname === '/results';

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home setScanResults={setScanResults} />} />
            <Route path="/owasp" element={<OWASP />} />
            <Route path="/wcag" element={<WCAG />} />
            <Route path="/code" element={<Code />} />
            <Route path="/results" element={<Results scanResults={scanResults} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}