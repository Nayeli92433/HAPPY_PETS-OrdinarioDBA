import React, { useState, useEffect } from 'react';
import '../styles/Citas.css';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import ServiciosService from "../services/ServiciosService"; 
import icono from '../assets/love.png';
import API_BASE_URL from '../config/config';

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    nombreDueno: '',
    mascotaSeleccionada: '',
    telefono: '',
    serviciosSeleccionados: [],
    veterinarioSeleccionado: ''
  });

  const [servicios, setServicios] = useState([]); // Lista de servicios
  const [veterinarios, setVeterinarios] = useState([]); // Lista de veterinarios
  const [mascotas, setMascotas] = useState([]); // Lista de mascotas del dueño
  const [modalVisible, setModalVisible] = useState(true);
  const [nombreDuenoInput, setNombreDuenoInput] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // Obtener servicios desde el backend
   useEffect(() => {
     const cargarServicios = async () => {
       const data = await ServiciosService.getAll();
       setServicios(data);
     };
     cargarServicios();
   }, []);

  // Obtener veterinarios desde el backend
  const obtenerVeterinarios = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/veterinarios`);
      if (!response.ok) throw new Error('Error al obtener los veterinarios');
      const data = await response.json();
      setVeterinarios(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Obtener mascotas del dueño desde el backend
  const obtenerMascotas = async (nombreDueno) => {
    try {
      const response = await fetch(`${API_BASE_URL}/mascotas?dueno=${nombreDueno}`);
      if (!response.ok) throw new Error('Error al obtener las mascotas');
      const data = await response.json();
      setMascotas(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Llamar a las funciones cuando el componente se monte
  useEffect(() => {
    obtenerVeterinarios();
  }, []);

  // Cuando cambia el dueño, cargar sus mascotas
  useEffect(() => {
    if (formData.nombreDueno) {
      obtenerMascotas(formData.nombreDueno);
    }
  }, [formData.nombreDueno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleServiceChange = (e) => {
    const { value } = e.target;
    const nuevosServicios = formData.serviciosSeleccionados.includes(value)
      ? formData.serviciosSeleccionados.filter(servicio => servicio !== value)
      : [...formData.serviciosSeleccionados, value];

    setFormData({ ...formData, serviciosSeleccionados: nuevosServicios });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de la cita:', formData);
  };

  return (
    <div>
      <Navbar />
      <div className="appointment-page">
      {modalVisible && (
          <div className="modal d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-content bg-light p-5 rounded text-center shadow">
              <img src={icono} alt="No hay servicios" className="iconoModal mb-3" style={{ maxWidth: '100px' }} />
              <h2>Bienvenido</h2>
              <p>Por favor, ingresa tu nombre completo:</p>
              <input
                type="text"
                className="form-control mb-3"
                value={nombreDuenoInput}
                onChange={(e) => setNombreDuenoInput(e.target.value)}
                placeholder="Nombre completo"
              />
              {mensajeError && <p className="text-danger">{mensajeError}</p>}
              <button className="btn btn-primary" onClick={() => setModalVisible(false)}>Aceptar</button>
            </div>
          </div>
        )}

<div className="container mt-5">
          <h1 className="text-center mb-4">Crear una Cita</h1>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-sm p-4" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                <form onSubmit={handleSubmit} className="appointment-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="nombreDueno" className="form-label">Nombre del dueño</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombreDueno"
                          name="nombreDueno"
                          value={formData.nombreDueno}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      
                      <div className="form-group mb-3">
                        <label htmlFor="mascotaSeleccionada" className="form-label">Selecciona una mascota</label>
                        <select
                          className="form-control"
                          id="mascotaSeleccionada"
                          name="mascotaSeleccionada"
                          value={formData.mascotaSeleccionada}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione una mascota</option>
                          {mascotas.length === 0 ? (
                            <option value="" disabled>No hay mascotas registradas</option>
                          ) : (
                            mascotas.map(pet => (
                              <option key={pet.id_mascota} value={pet.id_mascota}>
                                {pet.nombre}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="phone" className="form-label">Número de teléfono</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="selectedVeterinarian" className="form-label">Selecciona un veterinario</label>
                        <select
                          className="form-control"
                          id="selectedVeterinarian"
                          name="selectedVeterinarian"
                          value={formData.selectedVeterinarian}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione un veterinario</option>
                          {veterinarios.map(vet => (
                            <option key={vet.id_veterinario} value={vet.id_veterinario}>
                              {vet.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Servicios</label>
                        <div className="service-checkboxes">
                          {servicios.length === 0 ? (
                            <p className="text-danger">No hay servicios disponibles</p>
                          ) : (
                            servicios.map(servicio => (
                              <div key={servicio.id_servicio} className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  value={servicio.nombre}
                                  onChange={handleServiceChange}
                                  checked={formData.serviciosSeleccionados.includes(servicio.nombre)}
                                />
                                <label className="form-check-label">
                                  {servicio.nombre} 
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">Crear Cita</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAppointment;
