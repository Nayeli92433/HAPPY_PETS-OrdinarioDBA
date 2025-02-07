import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { CustomTable } from '../components/Tabla';
import apiMascotas from '../services/MascotasService';
import apiDuenios from '../services/DuenioService'
import { Navbar } from '../components/NavAdmin';

export default function MascotasAdmin() {
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    peso: '',
    sexo: '',
    duenioId: ''
  });
  const [mascotas, setMascotas] = useState([]);
  const [duenos, setDuenos] = useState([]); // Lista de dueños
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [duenioValido, setDuenioValido] = useState(true); // Para controlar la validación del ID del dueño

  useEffect(() => {
    cargarMascotas();
    cargarDuenos(); // Cargar los dueños al iniciar
  }, []);

  const cargarMascotas = async () => {
    const data = await apiMascotas.getAll();
    setMascotas(data);
  };

  const cargarDuenos = async () => {
    try {
      const response = await apiDuenios.getAll(); // Asumimos que tienes una función para obtener los dueños
      setDuenos(response); // Lista de dueños
    } catch (error) {
      console.error("Error al cargar los dueños:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificamos si el ID del dueño es válido
    if (!duenioValido) {
      Swal.fire('Error', 'El ID del dueño no es válido', 'error');
      return; // No se ejecuta el envío si el dueño no es válido
    }

    try {
      // Si estamos editando, actualizamos la mascota, de lo contrario, la creamos
      if (editando) {
        const response = await apiMascotas.update(idEditando, formData);
        Swal.fire('Actualizado', 'Mascota actualizada correctamente', 'success');
      } else {
        const response = await apiMascotas.create(formData);
        Swal.fire('Guardado', 'Mascota registrada correctamente', 'success');
      }

      // Limpiar el formulario después de guardar o actualizar
      setFormData({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        peso: '',
        sexo: '',
        duenioId: ''
      });
      setEditando(false);
      cargarMascotas(); // Recargamos las mascotas para mostrar los cambios
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar la mascota', 'error');
    }
  };
  
  const handleEdit = (item) => {
    setFormData({
      nombre: item.nombre,
      especie: item.especie,
      raza: item.raza,
      edad: item.edad,
      peso: item.peso,
      sexo: item.sexo,
      duenioId: item.duenio.id
    });
    setEditando(true);
    setIdEditando(item.id);
  };

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
    { header: 'Dueño', accessor: 'duenio.nombre' }
  ];

  return (
    <div style={{ background: '#fef9f9', minHeight: '100vh' }}>
      <Navbar />
      <div className="container mt-5">
        <CustomTable data={mascotas} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">{editando ? 'Actualizar Mascota' : 'Registro de Mascota'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre de la Mascota</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Especie</label>
                  <input
                    type="text"
                    className="form-control"
                    name="especie"
                    value={formData.especie}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Raza</label>
                  <input
                    type="text"
                    className="form-control"
                    name="raza"
                    value={formData.raza}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Edad (años)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Peso (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    className="form-control"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    required
                  >
                     <option value="">Seleccione sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Dueño</label>
                  <select
                    className="form-control"
                    name="duenioId"
                    value={formData.duenioId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un dueño</option>
                    {duenos.map((duenio) => (
                      <option key={duenio.id} value={duenio.id}>
                        {duenio.nombre}
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
