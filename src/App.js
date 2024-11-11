import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import TorreDePisa from './pages/Destinos/TorreDePisa';
import TajMahal from './pages/Destinos/TajMahal';
import CataratasVictoria from './pages/Destinos/CataratasVictoria';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra la Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Ruta para el login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas específicas para cada destino */}
        <Route path="/torre-de-pisa" element={<TorreDePisa />} />
        <Route path="/taj-mahal" element={<TajMahal />} />
        <Route path="/cataratas-victoria" element={<CataratasVictoria />} />
      </Routes>
    </Router>
  );
}

export default App;

