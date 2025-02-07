import React, { useState, useEffect } from 'react';
import veterinarioService from '../services/VeterinarioService'; 
import duenioService from '../services/DuenioService'; 
import servicioService from '../services/ServiciosService'; 
import mascotaService from '../services/MascotasService';  
import '../components/NavAdmin'
import { Navbar } from '../components/NavAdmin';

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
    <div style={{ backgroundColor: '#fef9f9', padding: '20px', minHeight: '100vh' }}>
      <Navbar></Navbar>
      <h1 className="text-center font-bold" style={{ color: '#FF9F9F',}}>Área de Administración</h1>

      {/* Mostrar error si hay */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mt-4 ">
        {/* Tabla de Dueños */}
        <div className="col-md-4 ">
          <h2 className="text-center">Dueños</h2>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Mascotas</th> 
              </tr>
            </thead>
            <tbody>
              {dueños.map((duenio) => (
                <tr key={duenio.id}>
                  <td>{duenio.nombre}</td>
                  <td>{duenio.apellido}</td>
                  <td>{duenio.telefono}</td>
                  <td>
                    {obtenerMascotasDeDueño(duenio.id).length > 0
                      ? obtenerMascotasDeDueño(duenio.id).map((mascota, index) => (
                          <div key={index}>{mascota.nombre}</div>  // Muestra el nombre de la mascota
                        ))
                      : 'No tiene mascotas'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabla de Servicios */}
        <div className="col-md-4">
          <h2 className="text-center">Servicios</h2>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th scope="col">Nombre del Servicio</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabla de Veterinarios */}
        <div className="col-md-4">
          <h2 className="text-center">Veterinarios</h2>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {veterinarios.map((veterinario) => (
                <tr key={veterinario.id}>
                  <td>{veterinario.nombre}</td>
                  <td>{veterinario.especialidad}</td>
                  <td>{veterinario.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
