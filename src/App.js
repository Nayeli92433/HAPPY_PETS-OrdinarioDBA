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

      </Routes>
    </Router>
  );
};

export default App;