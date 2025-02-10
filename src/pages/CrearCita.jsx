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
import { Navigate, useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mascota: { id: '' },
    servicioVeterinaria: { id: '' },
    veterinario: { id: '' },
    fecha: '',
    hora: '',
    estado: 'Pendiente',
    duenio: { id: '', nombre: '', apellido: '', telefono: '', email: '', direccion: '' } 
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

  const handleCancel = () => {
    // Al hacer clic en "Cancelar", redirigimos al usuario al home
    navigate('/');
  };

  const verificarDuenoExistente = async () => {
    try {
      const duenios = await DueñosService.getAll();
      const duenioExistente = duenios.find(duenio => `${duenio.nombre} ${duenio.apellido}` === nombreDuenoInput);

      console.log(duenioExistente);
      if (duenioExistente) {

        // Establecer nombre completo (nombre + apellido)
        const nombreCompleto = `${duenioExistente.nombre} ${duenioExistente.apellido}`;

        // Establecer los datos completos del dueño en el estado
        setFormData({ ...formData, nombreDueno: nombreCompleto, duenio: duenioExistente });

        // Obtener las mascotas del dueño mediante el nuevo servicio
        const mascotasDelDuenio = await MascotasService.getByDuenoId(duenioExistente.id);
        setMascotas(mascotasDelDuenio); // Actualizamos el estado con las mascotas del dueño
        // Verificar si el dueño tiene mascotas
        if (mascotasDelDuenio.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Upps no tienes mascotas registradas',
            text: 'Registra a tus mascotas antes de crear una cita.',
          });
          return; // Detener el proceso si no hay mascotas
        }

        setModalVisible(false);
        // Establecer el nombre del dueño en el formData
        setFormData(prevState => ({
          ...prevState,
          duenio: duenioExistente 
        }));
      } else {
        Swal.fire({ icon: 'error', title: 'Upps no estas registrado', text: 'Regístrate antes de agendar una cita.' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al verificar al dueño.' });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Verificación de campos vacíos
    if (!formData.mascota || !formData.fecha || !formData.hora || !formData.veterinario || !formData.servicioVeterinaria) {
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

    const fechaSeleccionada = new Date(formData.fecha);
    if (isNaN(fechaSeleccionada)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha seleccionada no es válida.',
      });
      return;
    }

    const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'


    // Buscar los objetos completos correspondientes a los IDs seleccionados
    const mascota = mascotas.find(mascota => Number(mascota.id) === Number(formData.mascota.id));
    const veterinarioSeleccionado = veterinarios.find(veterinario => Number(veterinario.id) === Number(formData.veterinario.id));
    const servicioSeleccionado = servicios.find(servicio => Number(servicio.id) === Number(formData.servicioVeterinaria.id));

    // Crear el objeto para enviar la cita al backend con los objetos completos
    const citaData = {
      mascota: mascota,  // Enviar el objeto completo de la mascota
      servicioVeterinaria: servicioSeleccionado,  // Enviar el objeto completo del servicio
      veterinario: veterinarioSeleccionado,  // Enviar el objeto completo del veterinario
      fecha: fechaFormateada,  // Fecha de la cita
      hora: formData.hora,  // Hora de la cita
      estado: "Pendiente", 
      duenio: formData.duenio,
    };

    console.log("Datos a enviar:", citaData); // Verificar qué datos se están enviando

    try {
      // Enviar la cita al backend (usando el servicio correspondiente para crear la cita)
      const response = await CitasService.create(citaData);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Cita creada con éxito',
          text: `La cita ha sido creada.`,
        });

        // ✅ Reiniciar el formulario y mostrar el modal inicial
        setFormData({
          mascota: { id: '' },
          servicioVeterinaria: { id: '' },
          veterinario: { id: '' },
          fecha: '',
          hora: '',
          estado: 'Pendiente'
        });

        setNombreDuenoInput('');  // ✅ Vaciar el input del nombre del dueño
        setMascotas([]);  // ✅ Vaciar la lista de mascotas
        navigate('/'); 
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
            <div className="modal-contentB bg-light p-5 rounded text-center shadow">
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
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary me-2" onClick={verificarDuenoExistente}>Aceptar</button>
                {/* Botón de Cancelar con color rojo y al lado del botón Aceptar */}
                <button className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
              </div>
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
                        <select
                          className="form-control"
                          name="mascota"

                          onChange={handleChange}
                          required>

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
                          <select name="servicioVeterinaria" className="form-control mb-3" onChange={handleChange} required>
                            <option value="">Selecciona un servicio</option>
                            {servicios.map(service => <option key={service.id} value={service.id}>{service.nombre}</option>)}
                          </select>
                        </div>

                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="veterinarioSeleccionado" className="form-label">Selecciona un veterinario</label>
                        <select name="veterinario" className="form-control mb-3" onChange={handleChange} required>
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