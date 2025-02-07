import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";  // Importando Bootstrap
import logoImg from "../assets/animals.jpg";       // Ruta de la imagen
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");  // Para manejar el mensaje de error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usuario y contraseña predefinidos
    const predefinedUsername = "admin";
    const predefinedPassword = "admin123";

    // Comparar los valores
    if (formData.username === predefinedUsername && formData.password === predefinedPassword) {
      console.log("¡Bienvenido Admin!");
      setError(""); // Limpiar el error en caso de éxito
      // Aquí podrías redirigir a otra página o hacer cualquier acción que quieras después de login
      navigate("/admin");
    } else {
      setError("Credenciales incorrectas, intenta nuevamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-20" style={{ backgroundColor: "white" ,width:'400px'}}>
      <div className="card p-4" style={{width: "400%" }}>
        <div className="text-center mb-4">
          <img src={logoImg} alt="Logo" style={{ width: "100px", height: "100px" }} />
        </div>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        
        {/* Mensaje de error si las credenciales son incorrectas */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
