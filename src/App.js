import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import TorreDePisa from './pages/Destinos/TorreDePisa';
import TajMahal from './pages/Destinos/TajMahal';
import CataratasVictoria from './pages/Destinos/CataratasVictoria';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra la Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Rutas específicas para cada destino */}
        <Route path="/torre-de-pisa" element={<TorreDePisa />} />
        <Route path="/taj-mahal" element={<TajMahal />} />
        <Route path="/cataratas-victoria" element={<CataratasVictoria />} />
      </Routes>
    </Router>
  );
}

export default App;

