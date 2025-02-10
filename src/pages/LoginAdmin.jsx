import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";  
import logoImg from "../assets/animals.jpg";       
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const predefinedUsername = "admin";
    const predefinedPassword = "admin123";

    if (formData.username === predefinedUsername && formData.password === predefinedPassword) {
      setError(""); 
      navigate("/admin");
    } else {
      setError("Credenciales incorrectas, intenta nuevamente.");
    }
  };

  return (
    
      <div 
        className=" p-4  text-center" 
        style={{   borderRadius: "10px", backgroundColor: "white"  }}
      >
        <div className="mb-3">
          <img src={logoImg} alt="Logo" style={{ width: "80px", height: "80px" }} />
        </div>
        <h4 className="mb-3">Iniciar Sesión</h4>

        {error && <div className="alert alert-danger text-center p-1">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2 text-start">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-sm"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm w-75 mx-auto">
            Ingresar
          </button>
        </form>
      </div>
  
  );
};

export default LoginAdmin;
