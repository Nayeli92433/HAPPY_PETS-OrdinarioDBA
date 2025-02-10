import React, { useState, useEffect } from 'react';
import CitasService from '../services/CitaServer';
import { Navbar } from '../components/NavAdmin';
import { Footer } from '../components/Footer';
import { FaCalendarAlt, FaUser, FaPaw, FaClock, FaStethoscope, FaTag, FaHeart } from 'react-icons/fa';

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

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await CitasService.updateEstado(id, nuevoEstado);
      setCitas(prevCitas =>
        prevCitas.map(cita =>
          cita.id === id ? { ...cita, estado: nuevoEstado } : cita
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado de la cita:', error);
    }
  };

  // Función para determinar el color de la fila según el estado
  const obtenerColorEstado = (estado) => {
    switch(estado) {
      case 'Pendiente': return '#efa94a';
      case 'Realizada': return '#8fdf8f';
      case 'Cancelada': return '#ff9d9d';
      default: return '#cccccc';
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#fff5f5' }}>
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <h1 className="text-center mb-4" style={{ color: '#ff85a2', fontWeight: '700' }}>
           Citas Programadas
        </h1>

        {mensajeError && (
          <div className="alert alert-danger rounded-pill text-center shadow-sm" 
               style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#ffd6d6', border: 'none' }}>
            {mensajeError}
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {citas.length === 0 ? (
            <div className="col-12 text-center">
              <div className="p-4 rounded-3" style={{ backgroundColor: '#ffe6e6' }}>
                <FaCalendarAlt size="3em" className="mb-3" style={{ color: '#ff85a2' }} />
                <h4 className="mb-0" style={{ color: '#ff85a2' }}>No hay citas registradas</h4>
              </div>
            </div>
          ) : (
            citas.map((cita) => (
              <div key={cita.id} className="col">
                <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden" 
                     style={{ backgroundColor: '#fffafafa' }}>
                  <div className="card-header py-3 d-flex justify-content-between align-items-center" 
                       style={{ backgroundColor: obtenerColorEstado(cita.estado), color: 'white' }}>
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" />
                      <span className="fw-bold">{cita.fecha}</span>
                    </div>
                    <span className="badge rounded-pill" 
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                      {cita.estado}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item border-0 py-2 d-flex align-items-center">
                        <FaUser className="me-3" style={{ color: '#ff85a2', minWidth: '20px' }} />
                        <div>
                          <small className="text-muted">Dueño</small>
                          <div>{cita.duenio ? `${cita.duenio.nombre} ${cita.duenio.apellido}` : 'No disponible'}</div>
                        </div>
                      </div>
                      <div className="list-group-item border-0 py-2 d-flex align-items-center">
                        <FaPaw className="me-3" style={{ color: '#ff85a2', minWidth: '20px' }} />
                        <div>
                          <small className="text-muted">Mascota</small>
                          <div>{cita.mascota ? cita.mascota.nombre : 'No disponible'}</div>
                        </div>
                      </div>
                      <div className="list-group-item border-0 py-2 d-flex align-items-center">
                        <FaClock className="me-3" style={{ color: '#ff85a2', minWidth: '20px' }} />
                        <div>
                          <small className="text-muted">Hora</small>
                          <div>{cita.hora}</div>
                        </div>
                      </div>
                      <div className="list-group-item border-0 py-2 d-flex align-items-center">
                        <FaStethoscope className="me-3" style={{ color: '#ff85a2', minWidth: '20px' }} />
                        <div>
                          <small className="text-muted">Veterinario</small>
                          <div>{cita.veterinario ? `${cita.veterinario.nombre} ${cita.veterinario.apellidos}` : 'No disponible'}</div>
                        </div>
                      </div>
                      <div className="list-group-item border-0 py-2 d-flex align-items-center">
                        <FaTag className="me-3" style={{ color: '#ff85a2', minWidth: '20px' }} />
                        <div>
                          <small className="text-muted">Servicio</small>
                          <div>{cita.servicioVeterinaria ? cita.servicioVeterinaria.nombre : 'No disponible'}</div>
                        </div>
                      </div>
                      <div className="list-group-item border-0 py-2">
                        <select
                          className="form-select rounded-pill border-0 shadow-sm"
                          style={{ backgroundColor: '#ffe6e6' }}
                          value={cita.estado}
                          onChange={(e) => actualizarEstado(cita.id, e.target.value)}
                        >
                          <option value="Pendiente">⏳ Pendiente</option>
                          <option value="Realizada">✅ Realizada</option>
                          <option value="Cancelada">❌ Cancelada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListarCitas;