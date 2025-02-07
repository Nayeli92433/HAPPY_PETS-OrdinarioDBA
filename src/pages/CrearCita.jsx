import React, { useState, useEffect } from 'react';
import '../styles/Citas.css';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import ServiciosService from "../services/ServiciosService";
import VeterinariosService from '../services/VeterinarioService';
import MascotasService from '../services/MascotasService';
import DueñosService from '../services/DuenioService';
import CitasService from '../services/CitaServer';
import icono from '../assets/love.png';
import Swal from "sweetalert2";

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    mascota: { id: '' },
    servicioVeterinaria: { id: '' },
    veterinario: { id: '' },
    fecha: '',
    hora: '',
    estado: 'Pendiente'
  });

  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [nombreDuenoInput, setNombreDuenoInput] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const cargarServicios = async () => setServicios(await ServiciosService.getAll());
    const cargarVeterinarios = async () => setVeterinarios(await VeterinariosService.getAll());
    cargarServicios();
    cargarVeterinarios();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['mascota', 'servicioVeterinaria', 'veterinario'].includes(name)) {
      setFormData({ ...formData, [name]: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNombreDuenoInputChange = (e) => {
    const value = e.target.value;
    // Verificar que no contenga números y que solo contenga letras con acentos y espacios
    if (/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede contener números o caracteres no permitidos.',
      });
    } else {
      setNombreDuenoInput(value);
    }
  };


  const verificarDuenoExistente = async () => {
    try {
      const duenios = await DueñosService.getAll();
      const duenioExistente = duenios.find(duenio => `${duenio.nombre} ${duenio.apellido}` === nombreDuenoInput);
      if (duenioExistente) {
        setMascotas(await MascotasService.getByDuenoId(duenioExistente.id));
        setModalVisible(false);
        // Establecer el nombre del dueño en el formData
        setFormData({
          ...formData,
          nombreDueno: `${duenioExistente.nombre} ${duenioExistente.apellido}`
        });
      } else {
        Swal.fire({ icon: 'error', title: 'No registrado', text: 'Regístrate antes de agendar una cita.' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al verificar al dueño.' });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mascota.id || !formData.fecha || !formData.hora || !formData.veterinario.id) {
      return Swal.fire({ icon: 'error', title: 'Error', text: 'Completa todos los campos.' });
    }

    const duenioSeleccionado = await DueñosService.getAll().then(duenos => 
      duenos.find(duenio => `${duenio.nombre} ${duenio.apellido}` === nombreDuenoInput)
    );
  
    if (duenioSeleccionado) {
      // Establecer el dueño completo en formData
      const formDataConDuenio = {
        ...formData,
        duenio: duenioSeleccionado
      };

    try {
      await CitasService.create(formDataConDuenio);
      Swal.fire({ icon: 'success', title: 'Cita creada', text: 'Tu cita ha sido registrada.' });
      setFormData({ mascota: { id: '' }, servicioVeterinaria: { id: '' }, veterinario: { id: '' }, fecha: '', hora: '', estado: 'Pendiente' });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al crear la cita.' });
    }
  } else {
    Swal.fire({ icon: 'error', title: 'Dueño no encontrado', text: 'El dueño no está registrado.' });
  }
  };
  const generarHoras = () => {
    const horas = [];
    let hora = 9;  // Comienza a las 9:00 AM
    while (hora <= 20) {  // Llega hasta las 8:00 PM
      const horaFormateada = `${hora.toString().padStart(2, '0')}:00`;  // Formato de 09:00, 10:00, ..., 20:00
      horas.push(horaFormateada);
      hora++;
    }
    return horas;
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
                onChange={handleNombreDuenoInputChange}
                placeholder="Nombre completo"
              />
              {mensajeError && <p className="text-danger">{mensajeError}</p>}
              <button className="btn btn-primary" onClick={verificarDuenoExistente}>Aceptar</button>
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
                          value={formData.nombreDueno || ''}  // Mostrar el nombre del dueño aquí
                          onChange={handleChange}
                          readOnly
                          required
                        />

                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="mascotaSeleccionada" className="form-label">Selecciona una mascota</label>
                        <select name="mascota" className="form-control mb-3" value={formData.mascota.id} onChange={handleChange} required>
                          <option value="">Selecciona una mascota</option>
                          {mascotas.map(pet => <option key={pet.id} value={pet.id}>{pet.nombre}</option>)}
                        </select>

                      </div>
                      {/* Fecha de la cita */}
                      <div className="form-group mb-3">
                        <label htmlFor="fechaCita" className="form-label">Fecha de la cita</label>
                        <input type="date" name="fecha" className="form-control mb-3" value={formData.fecha} onChange={handleChange} required />
                      </div>

                    </div>

                    <div className="col-md-6">

                      {/* Hora de la cita */}
                      <div className="form-group mb-3">
                        <label htmlFor="horaCita" className="form-label">Hora de la cita</label>
                        <select name="hora" className="form-control mb-3" value={formData.hora} onChange={handleChange} required>
                          <option value="">Selecciona una hora</option>
                          {Array.from({ length: 12 }, (_, i) => i + 9).map(hora => (
                            <option key={hora} value={`${hora}:00`}>{hora}:00</option>
                          ))}
                        </select>
                      </div>

                      <div >
                        <div className="form-group mb-3">
                          <label htmlFor="servicioSeleccionado" className="form-label">Selecciona un servicio</label>
                          <select name="servicioVeterinaria" className="form-control mb-3" value={formData.servicioVeterinaria.id} onChange={handleChange} required>
                            <option value="">Selecciona un servicio</option>
                            {servicios.map(service => <option key={service.id} value={service.id}>{service.nombre}</option>)}
                          </select>


                        </div>

                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="veterinarioSeleccionado" className="form-label">Selecciona un veterinario</label>
                        <select name="veterinario" className="form-control mb-3" value={formData.veterinario.id} onChange={handleChange} required>
                          <option value="">Selecciona un veterinario</option>
                          {veterinarios.map(vet => <option key={vet.id} value={vet.id}>{vet.nombre}</option>)}
                        </select>
                      </div>

                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Crear cita</button>
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