import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { CustomTable } from '../components/Tabla';
import apiServicios from '../services/ServiciosService';
import NavAdmin, { Navbar } from '../components/NavAdmin';

export default function ServiciosAdmin() {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '' });
  const [servicios, setServicios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const data = await apiServicios.getAll();
    setServicios(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarCampos = () => {
    const { nombre, descripcion, precio } = formData;
    if (!nombre || !descripcion || !precio) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return false;
    }
     if (!/^[a-zA-Z\s]+$/.test(nombre)) {
          Swal.fire('Error', 'El nombre solo puede contener letras', 'error');
          return false;
        }
    if (isNaN(precio) || Number(precio) <= 0) {
      Swal.fire('Error', 'El precio debe ser un número válido mayor que 0', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;
    
    try {
      if (editando) {
        await apiServicios.update(idEditando, formData);
        Swal.fire('Actualizado', 'Servicio actualizado correctamente', 'success');
      } else {
        await apiServicios.create(formData);
        Swal.fire('Guardado', 'Servicio registrado correctamente', 'success');
      }
      setFormData({ nombre: '', descripcion: '', precio: '' });
      setEditando(false);
      cargarServicios();
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar el servicio', 'error');
    }
  };

  const handleEdit = (item) => {
    setFormData({ nombre: item.nombre, descripcion: item.descripcion, precio: item.precio });
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
        await apiServicios.deleteservicio(id);
        Swal.fire('Eliminado', 'Servicio eliminado correctamente', 'success');
        cargarServicios();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar el servicio', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Precio', accessor: 'precio' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: "pink" }}>
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <CustomTable data={servicios} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="card shadow p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: "20px" }}>
              <h2 className="text-center mb-4">{editando ? 'Actualizar Servicio' : 'Registro de Servicio'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white">Nombre del Servicio</label>
                  <input
                    
                    className="form-control form-control-lg"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={{ borderRadius: "10px" }}
                    
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Descripción</label>
                  <textarea
                    className="form-control form-control-lg"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    style={{ borderRadius: "10px" }}
                    
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Precio ($)</label>
                  <input
                   
                    className="form-control form-control-lg"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    style={{ borderRadius: "10px" }}
                    
                  />
                </div>
                <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-primary'} w-100`}>
                  {editando ? 'Actualizar Servicio' : 'Registrar Servicio'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
