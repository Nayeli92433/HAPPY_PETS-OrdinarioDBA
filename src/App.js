import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Galeria from './pages/Galeria';
import Admin from './pages/Admin';
import Citas from './pages/CrearCita'
import Registro from './pages/RegistrarDueño'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/registro" element={<Registro/>} />

      </Routes>
    </Router>
  );
};

export default App;