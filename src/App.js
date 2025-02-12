import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
import ComentariosPage from './pages/Comentarios';
import VerCitas from './pages/VerCitas'

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
        <Route path="/comentarios" element={<ComentariosPage/>} />
        <Route path="/citasVer" element={<VerCitas/>} />

      </Routes>
    </Router>
  );
};

export default App;