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

  const validarFormulario = async (formData) => {
    // Validar que todos los campos estén completos
    const { nombre, apellido, telefono, email, direccion } = formData;
    if (!nombre || !apellido || !telefono || !email || !direccion) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
        confirmButtonColor: "#d33",
      });
      return false;
    }
  
    // Validación de formato de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingresa un correo electrónico válido.",
        confirmButtonColor: "#d33",
      });
      return false;
    }
  
    // Verificar si el dueño ya existe
    try {
      const response = await duenioService.checkIfDuenioExists(email); // Verificar existencia de dueño por email
      if (response.exists) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El dueño con este correo electrónico ya existe.",
          confirmButtonColor: "#d33",
        });
        return false;
      }
    } catch (error) {
      console.error("Error al verificar dueño:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo verificar si el dueño ya existe. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
      return false;
    }
  
    return true; // Si todo está bien, devuelve true
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validarFormulario(formData); // Llamamos a la validación
    if (!isValid) {
      return; // Si la validación falla, no enviamos el formulario
    }

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
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Apellido</label>
              <input type="text" className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Teléfono</label>
              <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
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
