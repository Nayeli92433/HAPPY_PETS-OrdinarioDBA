import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { CustomTable } from '../components/Tabla';
import apiMascotas from '../services/MascotasService';
import apiDuenios from '../services/DuenioService';
import { Navbar } from '../components/NavAdmin';

export default function MascotasAdmin() {
  // Estado inicial: el campo 'duenio' es un objeto con propiedad 'id'
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    peso: '',
    sexo: '',
    duenio: { id: '' }
  });
  const [mascotas, setMascotas] = useState([]);
  const [duenos, setDuenos] = useState([]); // Lista de dueños para el combo
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarMascotas();
    cargarDuenos(); // Cargar los dueños al iniciar
  }, []);

  const cargarMascotas = async () => {
    try {
      const data = await apiMascotas.getAll();
      setMascotas(data);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  const cargarDuenos = async () => {
    try {
      const response = await apiDuenios.getAll(); // Obtener la lista de dueños
      setDuenos(response);
    } catch (error) {
      console.error("Error al cargar dueños:", error);
    }
  };

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'duenio') {
      // Actualiza el objeto anidado 'duenio' con el id seleccionado
      setFormData({ ...formData, duenio: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar", formData); // Verificar en consola el JSON a enviar

    try {
      if (editando) {
        const response = await apiMascotas.update(idEditando, formData);
        Swal.fire('Actualizado', 'Mascota actualizada correctamente', 'success');
      } else {
        const response = await apiMascotas.create(formData);
        Swal.fire('Guardado', 'Mascota registrada correctamente', 'success');
      }
      // Limpiar el formulario y recargar la lista de mascotas
      setFormData({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        peso: '',
        sexo: '',
        duenio: { id: '' }
      });
      setEditando(false);
      cargarMascotas();
    } catch (error) {
      console.error("Error al guardar la mascota:", error);
      Swal.fire('Error', 'Hubo un problema al guardar la mascota', 'error');
    }
  };

  // Maneja la edición: carga los datos de la mascota seleccionada
  const handleEdit = (item) => {
    console.log("Editando mascota con dueño id:", item.duenio.id);
    setFormData({
      nombre: item.nombre,
      especie: item.especie,
      raza: item.raza,
      edad: item.edad,
      peso: item.peso,
      sexo: item.sexo,
      duenio: { id: item.duenio.id }
    });
    setEditando(true);
    setIdEditando(item.id);
  };

  // Maneja el borrado de una mascota
  const handleDelete = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        await apiMascotas.deletemascota(id);
        Swal.fire('Eliminado', 'Mascota eliminada correctamente', 'success');
        cargarMascotas();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar la mascota', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Especie', accessor: 'especie' },
    { header: 'Raza', accessor: 'raza' },
    { header: 'Sexo', accessor: 'sexo' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: "pink" }}>
      <Navbar />
      <div className="container mt-5 flex-grow-1" style={{marginBottom:"80px" }}>
        <CustomTable data={mascotas} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: "20px" }}>
              <h2 className="text-center mb-4">{editando ? 'Actualizar Mascota' : 'Registro de Mascota'}</h2>
              <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
                <div className="row">
                  {/* Columna Izquierda */}
                  <div className="col-md-6 pe-3">
                    <div className="mb-3">
                      <label className="form-label text-white">Nombre de la Mascota</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Especie</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="especie"
                        value={formData.especie}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Raza</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="raza"
                        value={formData.raza}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </div>
  
                  {/* Columna Derecha */}
                  <div className="col-md-6 ps-3">
                    <div className="mb-3">
                      <label className="form-label text-white">Edad (años)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Peso (kg)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Sexo</label>
                      <select
                        className="form-control form-control-lg"
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                        required
                      >
                        <option value="">Seleccione sexo</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Dueño</label>
                  <select
                    className="form-control form-control-lg"
                    name="duenio"
                    value={formData.duenio.id}
                    onChange={handleChange}
                    style={{ borderRadius: "10px" }}
                    required
                  >
                    <option value="">Seleccione un dueño</option>
                    {duenos.map((duenio) => (
                      <option key={duenio.id} value={duenio.id}>
                        {duenio.nombre} {duenio.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-primary'} w-100`}>
                  {editando ? 'Actualizar Mascota' : 'Registrar Mascota'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}
