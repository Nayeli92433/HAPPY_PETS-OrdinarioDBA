import React, { useState, useEffect } from 'react';
import CitasService from '../services/CitaServer';
import { Navbar } from '../components/NavAdmin';
import { Footer } from '../components/Footer';

const ListarCitas = () => {
  const [citas, setCitas] = useState([]);  // Iniciar el estado como un array vacío
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const citasObtenidas = await CitasService.getAll();  // Obtener las citas desde el servicio
        // Verifica que las citas obtenidas sean un array
        if (Array.isArray(citasObtenidas)) {
          setCitas(citasObtenidas);  // Asignar las citas al estado
        } else {
          setMensajeError('Los datos de las citas no están en el formato correcto.');
        }
      } catch (error) {

        console.error('Error al obtener citas:', error);  // Para ver más detalles en la consola
      }
    };
    cargarCitas();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Lista de Citas</h1>

        {/* Mostrar error si ocurre uno */}
        {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre del Dueño</th>
              <th>Mascota</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Veterinario</th>
              <th>Servicio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay citas registradas.</td>
              </tr>
            ) : (
              citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.duenio ? `${cita.duenio.nombre} ${cita.duenio.apellido}` : 'No disponible'}</td>
                  <td>{cita.mascota ? cita.mascota.nombre : 'No disponible'}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.veterinario ? `${cita.veterinario.nombre} ${cita.veterinario.apellidos}` : 'No disponible'}</td>
                  <td>{cita.servicioVeterinaria ? cita.servicioVeterinaria.nombre : 'No disponible'}</td>
                  <td>{cita.estado}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ListarCitas;
