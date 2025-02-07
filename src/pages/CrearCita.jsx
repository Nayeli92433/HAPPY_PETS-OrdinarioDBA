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
import API_BASE_URL from '../config/config';
import { data } from 'react-router-dom';
import Swal from "sweetalert2";

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    nombreDueno: '',
    mascotaSeleccionada: '',
    serviciosSeleccionados: '',
    veterinarioSeleccionado: '',
    fechaCita: '',  // Establecer valor inicial como cadena vacía
    horaCita: ''
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
  useEffect(() => {
    const cargarVeterinarios = async () => {
      const data = await VeterinariosService.getAll();
      setVeterinarios(data);
    };
    cargarVeterinarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
      // Se actualiza el estado con el ID de la mascota seleccionada
    });
  };

  console.log(formData)

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


  // Verificar si el dueño está registrado
  const verificarDuenoExistente = async () => {
    try {
      const duenios = await DueñosService.getAll();
      const duenioExistente = duenios.find(duenio => `${duenio.nombre} ${duenio.apellido}` === nombreDuenoInput); // Comparar nombre completo

      if (duenioExistente) {

        // Establecer nombre completo (nombre + apellido)
        const nombreCompleto = `${duenioExistente.nombre} ${duenioExistente.apellido}`;

        // Establecer los datos completos del dueño en el estado
        setFormData({ ...formData, nombreDueno: nombreCompleto, duenio: duenioExistente });

        // Obtener las mascotas del dueño mediante el nuevo servicio
        const mascotasDelDuenio = await MascotasService.getByDuenoId(duenioExistente.id);
        setMascotas(mascotasDelDuenio); // Actualizamos el estado con las mascotas del dueño

        setModalVisible(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upps no estas registrado',
          text: 'Por favor, registrate para poder agendar una cita.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al verificar al dueño.',
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación de campos vacíos
    if (!formData.mascotaSeleccionada || !formData.fechaCita || !formData.horaCita || !formData.veterinarioSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Verificar si el dueño o la mascota no están registrados
    if (!mascotas || mascotas.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay mascotas registradas',
        text: 'Por favor, registra una mascota para poder agendar la cita.',
      });
      return;
    }

    const fechaFormateada = new Date(formData.fechaCita).toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'


    const citaData = {
      id_mascota: formData.mascotaSeleccionada,  // Solo el ID de la mascota
      id_servicio: formData.servicioSeleccionado,  // Solo el ID del servicio
      id_veterinario: formData.veterinarioSeleccionado,  // Solo el ID del veterinario
      fecha: fechaFormateada,  // Fecha de la cita
      hora: formData.horaCita,  // Hora de la cita
      estado: "Pendiente"  // Estado de la cita
    };



    console.log("Datos a enviar:", citaData);

    try {
      // Enviar la cita al backend
      const response = await CitasService.create(citaData);

      console.log(response.status);  // Verificar el código de estado

      // Verificar la respuesta del backend
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Cita creada con éxito',
          text: `La cita para ${formData.mascotaSeleccionada.nombre} ha sido creada.`,
        });

        setFormData({
          nombreDueno: '',
          mascotaSeleccionada: '',
          serviciosSeleccionados: '',
          veterinarioSeleccionado: '',
          fechaCita: '',
          horaCita: ''
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la cita.',
        });
      }
    } catch (error) {
      console.error("Error al crear la cita: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la cita.',
      });
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
                          value={formData.nombreDueno}  // Aquí ya muestra el nombre completo
                          onChange={handleChange}
                          readOnly
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
                            <option value="" disabled>No hay mascotas registradas para este dueño</option>
                          ) : (
                            mascotas.map(pet => (
                              <option key={pet.id} value={pet.id}>
                                {pet.nombre}
                              </option>
                            ))
                          )}
                        </select>

                      </div>
                      {/* Fecha de la cita */}
                      <div className="form-group mb-3">
                        <label htmlFor="fechaCita" className="form-label">Fecha de la cita</label>
                        <input
                          type="date"
                          className="form-control"
                          id="fechaCita"
                          name="fechaCita"
                          value={formData.fechaCita}
                          onChange={handleChange}
                          required
                        />
                      </div>

                    </div>

                    <div className="col-md-6">

                      {/* Hora de la cita */}
                      <div className="form-group mb-3">
                        <label htmlFor="horaCita" className="form-label">Hora de la cita</label>
                        <select
                          className="form-control"
                          id="horaCita"
                          name="horaCita"
                          value={formData.horaCita}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione una hora</option>
                          {generarHoras().map((hora, index) => (
                            <option key={index} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div >
                        <div className="form-group mb-3">
                          <label htmlFor="servicioSeleccionado" className="form-label">Selecciona un servicio</label>
                          <select
                            className="form-control"
                            id="servicioSeleccionado"
                            name="servicioSeleccionado"  // El nombre debe coincidir con el nombre en el formData
                            value={formData.servicioSeleccionado}
                            onChange={handleChange}  // Aquí se maneja el cambio
                            required
                          >
                            <option value="">Seleccione un servicio</option>
                            {servicios.map(service => (
                              <option key={service.id} value={service.id}>
                                {service.nombre}
                              </option>
                            ))}
                          </select>

                        </div>

                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="veterinarioSeleccionado" className="form-label">Selecciona un veterinario</label>
                        <select
                          className="form-control"
                          id="veterinarioSeleccionado"
                          name="veterinarioSeleccionado"
                          value={formData.veterinarioSeleccionado}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione un veterinario</option>
                          {veterinarios.map(vet => (
                            <option key={vet.id} value={vet.id}>
                              {vet.nombre}
                            </option>
                          ))}
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