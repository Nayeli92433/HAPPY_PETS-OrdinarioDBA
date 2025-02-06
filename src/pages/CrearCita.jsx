import React, { useState } from 'react';
import { services, veterinarians } from '../Utils/Data'; // Importa los datos desde data.js
import '../styles/Citas.css';

const CreateAppointment = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    petName: '',
    ownerName: '',
    address: '',
    phone: '',
    selectedServices: [],
    selectedVeterinarian: ''
  });

  // Maneja el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Maneja el cambio de los servicios seleccionados
  const handleServiceChange = (e) => {
    const { value } = e.target;
    const newServices = formData.selectedServices.includes(value)
      ? formData.selectedServices.filter(service => service !== value)
      : [...formData.selectedServices, value];
    setFormData({
      ...formData,
      selectedServices: newServices
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la cita a la base de datos
    console.log('Datos de la cita:', formData);
  };

  return (
    <div className="appointment-container">
      <h1>Crear una Cita</h1>
      <div className="form-and-image">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="petName">Nombre de la mascota</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName">Nombre del dueño</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Número de teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Servicios</label>
            {services.map(service => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  value={service}
                  onChange={handleServiceChange}
                  checked={formData.selectedServices.includes(service)}
                />
                <label htmlFor={service}>{service}</label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="veterinarian">Veterinario</label>
            <select
              id="veterinarian"
              name="selectedVeterinarian"
              value={formData.selectedVeterinarian}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un veterinario</option>
              {veterinarians.map(veterinarian => (
                <option key={veterinarian} value={veterinarian}>
                  {veterinarian}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-submit">Crear Cita</button>
        </form>

        {/* Imagen */}
        <div className="image-container">
          <img src="/assets/vet-image.jpg" alt="Veterinaria" />
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
