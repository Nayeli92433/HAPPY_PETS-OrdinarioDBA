import React, { useState, useEffect } from 'react';
import veterinarioService from '../services/VeterinarioService'; 
import duenioService from '../services/DuenioService'; 
import servicioService from '../services/ServiciosService'; 
import mascotaService from '../services/MascotasService';  
import '../components/NavAdmin'
import { Navbar } from '../components/NavAdmin';
import { Footer } from '../components/Footer';
import { FaPaw, FaUserMd, FaBell, FaHeart } from 'react-icons/fa';

const Admin = () => {
  const [dueños, setDueños] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [error, setError] = useState("");  

  // Obtener los datos desde las APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dueñosData, mascotasData, serviciosData, veterinariosData] = await Promise.all([
          duenioService.getAll(),
          mascotaService.getAll(),
          servicioService.getAll(),
          veterinarioService.getAll(),
        ]);

        // Verificar los datos obtenidos
        console.log("Dueños:", dueñosData);
        console.log("Mascotas:", mascotasData);
        console.log("Servicios:", serviciosData);
        console.log("Veterinarios:", veterinariosData);

        setDueños(dueñosData);
        setMascotas(mascotasData);
        setServicios(serviciosData);
        setVeterinarios(veterinariosData);
      } catch (err) {
        setError("Error al obtener los datos.");
        console.error("Error fetching data:", err);
      }
    };
    
    fetchData();
  }, []);  

  const obtenerMascotasDeDueño = (duenioId) => {
    console.log(`Filtrando mascotas para el dueño con ID: ${duenioId}`);
    
    // Filtramos las mascotas que tienen un dueño con el id correspondiente
    const mascotasDelDuenio = mascotas.filter(mascota => mascota.duenio.id === duenioId);
    console.log('Mascotas encontradas para este dueño: ', mascotasDelDuenio);
    
    return mascotasDelDuenio;
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <div style={{ backgroundColor: '#fff5f5', flex: 1, padding: '20px' , marginBottom: '15px'}}>
        <h1 className="text-center mb-4" style={{ color: '#ff85a2', fontWeight: '700', fontSize: '2.5rem' }}>
          <FaPaw className="mr-2" /> Área de Administración <FaPaw className="mr-2" />
        </h1>

        {error && (
          <div className="alert alert-danger rounded-pill text-center shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {error}
          </div>
        )}

        <div className="row mt-4 g-4">
          {/* Tarjeta Dueños */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-3" style={{ backgroundColor: '#fff0f6' }}>
              <div className="card-header py-3" style={{ backgroundColor: '#ff85a2', color: 'white' }}>
                <h2 className="mb-0 d-flex align-items-center">
                  <FaPaw className="me-2" /> Dueños
                </h2>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush rounded-bottom">
                  {dueños.map((duenio) => (
                    <div key={duenio.id} className="list-group-item border-0 py-3" style={{ backgroundColor: '#fffafafa' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-1" style={{ color: '#ff85a2' }}>{duenio.nombre} {duenio.apellido}</h5>
                          <small className="text-muted">Tel: {duenio.telefono}</small>
                        </div>
                        <span className="badge rounded-pill" style={{ backgroundColor: '#ffb3c6' }}>
                          {obtenerMascotasDeDueño(duenio.id).length} mascotas
                        </span>
                      </div>
                      {obtenerMascotasDeDueño(duenio.id).length > 0 && (
                        <div className="mt-2">
                          {obtenerMascotasDeDueño(duenio.id).map((mascota, index) => (
                            <span key={index} className="badge bg-light text-dark me-1 mb-1 rounded-pill">
                              🐾 {mascota.nombre}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Servicios */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-3" style={{ backgroundColor: '#f0faff' }}>
              <div className="card-header py-3" style={{ backgroundColor: '#85d7ff', color: 'white' }}>
                <h2 className="mb-0 d-flex align-items-center">
                  <FaBell className="me-2" /> Servicios
                </h2>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {servicios.map((servicio) => (
                    <div key={servicio.id} className="list-group-item border-0 py-3 d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-0" style={{ color: '#85d7ff' }}>{servicio.nombre}</h5>
                      </div>
                      <span className="badge rounded-pill" style={{ backgroundColor: '#b3e6ff' }}>
                        ${servicio.precio}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Veterinarios */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-3" style={{ backgroundColor: '#f8f0ff' }}>
              <div className="card-header py-3" style={{ backgroundColor: '#b28dff', color: 'white' }}>
                <h2 className="mb-0 d-flex align-items-center">
                  <FaUserMd className="me-2" /> Veterinarios
                </h2>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {veterinarios.map((veterinario) => (
                    <div key={veterinario.id} className="list-group-item border-0 py-3">
                      <h5 className="mb-1" style={{ color: '#b28dff' }}>{veterinario.nombre}</h5>
                      <small className="text-muted d-block">{veterinario.especialidad}</small>
                      <small className="text-muted">📞 {veterinario.telefono}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
