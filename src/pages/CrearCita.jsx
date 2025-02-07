import React, { useState, useEffect } from 'react';
import '../styles/Citas.css';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import icono from '../assets/love.png';
import API_BASE_URL from '../config/config';

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    petName: '',
    ownerName: '',
    address: '',
    phone: '',
    selectedServices: [],
    selectedVeterinarian: ''
  });

  const [services, setServices] = useState([]); // Estado para almacenar los servicios
  const [modalVisible, setModalVisible] = useState(true);
  const [ownerNameInput, setOwnerNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para obtener los servicios desde el backend
  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/servicios`);
      if (!response.ok) {
        throw new Error('Error al obtener los servicios');
      }
      const data = await response.json();
      setServices(data); // Guardamos los servicios en el estado
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Llamar a la función cuando el componente se monte
  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (e) => {
    const { value } = e.target;
    const newServices = formData.selectedServices.includes(value)
      ? formData.selectedServices.filter(service => service !== value)
      : [...formData.selectedServices, value];

    setFormData({ ...formData, selectedServices: newServices });
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
                value={ownerNameInput}
                onChange={(e) => setOwnerNameInput(e.target.value)}
                placeholder="Nombre completo"
              />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
                        <label htmlFor="petName" className="form-label">Nombre de la mascota</label>
                        <input
                          type="text"
                          className="form-control"
                          id="petName"
                          name="petName"
                          value={formData.petName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="ownerName" className="form-label">Nombre del dueño</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ownerName"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
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
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Servicios</label>
                        <div className="service-checkboxes">
                          {services.length === 0 ? (
                            <p className="text-danger">No hay servicios disponibles</p>
                          ) : (
                            services.map(service => (
                              <div key={service.id_servicio} className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`service-${service.id_servicio}`}
                                  value={service.nombre}
                                  onChange={handleServiceChange}
                                  checked={formData.selectedServices.includes(service.nombre)}
                                />
                                <label htmlFor={`service-${service.id_servicio}`} className="form-check-label">
                                  {service.nombre} - ${service.precio}
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
