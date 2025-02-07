import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Galeria from './pages/Galeria';
import Admin from './pages/Admin';
import Citas from './pages/CrearCita'
import Registro from './pages/RegistrarDueño'
import LoginAdmin from './pages/LoginAdmin'
import ServiciosAdmin from './pages/ServiciosAdmin';
import VeterinariosAdmin from './pages/Veterinario';
import MascotasAdmin from './pages/Mascotas';

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
        <Route path="/login" element={<LoginAdmin/>} />
        <Route path="/adminServicios" element={<ServiciosAdmin/>} />
        <Route path="/veterinarios" element={<VeterinariosAdmin/>} />
        <Route path="/mascotas" element={<MascotasAdmin/>} />




      </Routes>
    </Router>
  );
};

export default App;