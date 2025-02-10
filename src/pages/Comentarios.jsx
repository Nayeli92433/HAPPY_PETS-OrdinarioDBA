import React, { useEffect, useState } from "react";
import ComentariosService from "../services/ComentariosService";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiciosService from "../services/ServiciosService";
import DuenioService from "../services/DuenioService";
import Swal from "sweetalert2";


const ComentariosPage = () => {
  const [comentarios, setComentarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [duenios, setDuenios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    id: "",
    mensaje: "",
    fecha: "",
    calificacion: "",
    idServicio: "",
    id_duenio: "",
  });

  useEffect(() => {
    async function cargarComentarios() {
      try {
        const data = await ComentariosService.obtenerTodos();
        setComentarios(data);
      } catch (error) {
        console.error("Error cargando comentarios:", error);
      }
    }
    cargarComentarios();
  }, []);

  useEffect(() => {
    async function cargarServicios() {
      try {
        // Reemplaza esto con la llamada a tu API real
        const data = await ServiciosService.getAll(); 
        setServicios(data);
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    }

    async function cargarDuenios() {
      try {
        // Reemplaza esto con la llamada a tu API real
        const data = await DuenioService.getAll(); 
        setDuenios(data);
      } catch (error) {
        console.error("Error cargando dueños:", error);
      }
    }

    cargarServicios();
    cargarDuenios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoComentario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarCampos = () => {
    const { mensaje, fecha, calificacion, idServicio, id_duenio } = nuevoComentario;
    if (!mensaje || !fecha || !calificacion || !idServicio || !id_duenio) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return false;
    }
    if (isNaN(calificacion) || Number(calificacion) < 1 || Number(calificacion) > 5) {
      Swal.fire("Error", "La calificación debe ser un número entre 1 y 5", "error");
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    const comentarioData = {
      id: nuevoComentario.id,
      fecha: nuevoComentario.fecha,
      mensaje: nuevoComentario.mensaje,
      calificacion: parseInt(nuevoComentario.calificacion),
      idServicio: nuevoComentario.idServicio,
      id_duenio: nuevoComentario.id_duenio,
    };

    try {
      let respuesta;
      if (nuevoComentario.id) {
        respuesta = await ComentariosService.guardar(comentarioData);
      } else {
        respuesta = await ComentariosService.guardar({
          id_duenio: comentarioData.id_duenio,
          comentarios: [comentarioData],
        });
      }

      setComentarios((prevComentarios) => {
        if (nuevoComentario.id) {
          return prevComentarios.map((comentario) =>
            comentario.id === nuevoComentario.id ? respuesta : comentario
          );
        } else {
          return [...prevComentarios, respuesta];
        }
      });

      setNuevoComentario({ mensaje: "", fecha: "", calificacion: "", idServicio: "", id_duenio: "", id: "" });
      Swal.fire("Éxito", "Comentario guardado correctamente", "success");

    } catch (error) {
      console.error("Error al guardar comentario:", error);
    }
  };

  const handleBorrar = async (comentarioId) => {
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (resultado.isConfirmed) {
      try {
        await ComentariosService.eliminarPorId(comentarioId);
        setComentarios(comentarios.filter((comentario) => comentario.id !== comentarioId));
        Swal.fire("Eliminado", "Comentario eliminado correctamente", "success");
      } catch (error) {
        console.error("Error eliminando comentario:", error);
        Swal.fire("Error", "No se pudo eliminar el comentario", "error");
      }
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="my-4 text-center">Lista de Comentarios</h1>

        <h3 className="my-4">{nuevoComentario.id ? "Actualizar Comentario" : "Agregar un nuevo comentario"}</h3>
        <div className="row">
          <div className="col-md-12">
            <div className="p-4" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="mensaje">Comentario</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="form-control"
                    rows="1"
                    value={nuevoComentario.mensaje}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      className="form-control"
                      value={nuevoComentario.fecha}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="calificacion">Calificación</label>
                    <select
                      id="calificacion"
                      name="calificacion"
                      className="form-control"
                      value={nuevoComentario.calificacion}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione una calificación</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="idServicio">Servicio</label>
                    <select
                      id="idServicio"
                      name="idServicio"
                      className="form-control"
                      value={nuevoComentario.idServicio}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione un servicio</option>
                      {servicios.map((servicio) => (
                        <option key={servicio.id} value={servicio.nombre}>
                          {servicio.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="id_duenio">Dueño</label>
                    <select
                      id="id_duenio"
                      name="id_duenio"
                      className="form-control"
                      value={nuevoComentario.id_duenio}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione un dueño</option>
                      {duenios.map((duenio) => (
                        <option key={duenio.id} value={duenio.nombre}>
                          {duenio.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  {nuevoComentario.id ? "Actualizar Comentario" : "Guardar Comentario"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <h2 className="my-4">Comentarios existentes</h2>
        <div className="row">
          {comentarios.map((comentario, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Dueño: {comentario.id_duenio}</h5>
                  {comentario.comentarios && comentario.comentarios.length > 0 ? (
                    comentario.comentarios.map((c, subIndex) => (
                      <div key={subIndex}>
                        <p className="card-text"><strong>Comentario:</strong> {c.mensaje}</p>
                        <p className="card-text"><strong>Calificación:</strong> {c.calificacion}</p>
                        <p className="card-text"><strong>Servicio:</strong> {c.idServicio}</p>
                        <div>
                          <button className="btn btn-danger btn-sm ml-2" onClick={() => handleBorrar(comentario.id)}>Borrar</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="card-text">No hay comentarios para este dueño.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComentariosPage;
