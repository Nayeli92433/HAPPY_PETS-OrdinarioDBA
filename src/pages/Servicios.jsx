import React, { useEffect, useState } from "react";
import  ServiciosService  from "../services/ServiciosService"; // Importa la función
import "../styles/Servicios.css";  
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const cargarServicios = async () => {
      const data = await ServiciosService.obtenerServicios();
      setServices(data);
    };
    cargarServicios();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="services-container">
        <h1 className="services-title">Nuestros Servicios</h1>
        <div className="services-list">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <img src={`http://localhost:8080/${service.imagen}`} alt={service.nombre} />

              <h3>{service.nombre}</h3>
              <p>{service.descripcion}</p>
              <p className="price">${service.precio}</p>
              <button className="btn">Contratar</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
