import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { CustomTable } from '../components/Tabla';
import apiVeterinarios from '../services/VeterinarioService';  // Asegúrate de tener un servicio para veterinarios
import { Navbar } from '../components/NavAdmin'; // Asegúrate de importar tu plantilla NavAdmin

export default function VeterinariosAdmin() {
  const [formData, setFormData] = useState({ nombre: '', apellidos: '', telefono: '', email: '', especialidad: '' });
  const [veterinarios, setVeterinarios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarVeterinarios();
  }, []);

  const cargarVeterinarios = async () => {
    const data = await apiVeterinarios.getAll();  // Asegúrate de tener la función correspondiente en tu servicio
    setVeterinarios(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await apiVeterinarios.update(idEditando, formData);  // Asegúrate de tener la función correspondiente en tu servicio
        Swal.fire('Actualizado', 'Veterinario actualizado correctamente', 'success');
      } else {
        await apiVeterinarios.create(formData);  // Asegúrate de tener la función correspondiente en tu servicio
        Swal.fire('Guardado', 'Veterinario registrado correctamente', 'success');
      }
      setFormData({ nombre: '', apellidos: '', telefono: '', email: '', especialidad: '' });
      setEditando(false);
      cargarVeterinarios();
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar el veterinario', 'error');
    }
  };

  const handleEdit = (item) => {
    setFormData({ nombre: item.nombre, apellidos: item.apellidos, telefono: item.telefono, email: item.email, especialidad: item.especialidad });
    setEditando(true);
    setIdEditando(item.id);
  };

  const handleDelete = async (id) => {
    console.log("aqui entra en el metodo de eliminar", id);
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
        await apiVeterinarios.deleteveterinario(id);  // Asegúrate de tener la función correspondiente en tu servicio
        Swal.fire('Eliminado', 'Veterinario eliminado correctamente', 'success');
        cargarVeterinarios();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar el veterinario', 'error',error);
      }
    }
  };

  const columns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Apellidos', accessor: 'apellidos' },
    { header: 'Teléfono', accessor: 'telefono' },
    { header: 'Email', accessor: 'email' },
    { header: 'Especialidad', accessor: 'especialidad' }
  ];

  return (
    <div style={{ background: '#fef9f9', minHeight: '100vh' }}>
      <Navbar/>
      <div className="container mt-5">
        <CustomTable data={veterinarios} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">{editando ? 'Actualizar Veterinario' : 'Registro de Veterinario'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellidos</label>
                  <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Especialidad</label>
                  <input type="text" className="form-control" name="especialidad" value={formData.especialidad} onChange={handleChange} />
                </div>
                <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-primary'} w-100`}>
                  {editando ? 'Actualizar Veterinario' : 'Registrar Veterinario'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
