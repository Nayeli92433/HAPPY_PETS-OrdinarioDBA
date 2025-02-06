import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Importamos useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import perfilImg from "../assets/persona.avif";
import NavBar, { Navbar } from "../components/Navbar";
import duenioService from "../services/DuenioService";
import Swal from "sweetalert2";

const DuenioForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const navigate = useNavigate();  // ✅ Definimos el hook de navegación

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await duenioService.create(formData);

      // ✅ Mostrar alerta de éxito y redirigir a la vista principal
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El dueño ha sido registrado correctamente.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/");  // ✅ Redirigir a la vista principal
      });

      setFormData({ nombre: "", apellido: "", telefono: "", email: "", direccion: "" });

    } catch (error) {
      console.error("Error al registrar dueño:", error);

      // ❌ Mostrar alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar al dueño. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "pink" }}>
        <div className="card p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", width: "400px" }}>
          <img
            src={perfilImg}
            alt="Perfil"
            className="mx-auto d-block mb-3 rounded-circle"
            style={{ width: "120px", height: "120px" }}
          />
          <h3 className="text-white text-center">Registrar Dueño</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-white">Nombre</label>
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Apellido</label>
              <input type="text" className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Teléfono</label>
              <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Dirección</label>
              <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DuenioForm;
