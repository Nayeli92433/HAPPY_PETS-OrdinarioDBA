import React, { useEffect, useState } from "react";
import ComentariosService from "../services/ComentariosService";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const ComentariosPage = () => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    id: "", // ID para saber si estamos editando un comentario existente
    mensaje: "",
    fecha: "",
    calificacion: "",
    idServicio: "",
    idDueno: "", // Asegúrate de incluir el idDueno
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoComentario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comentarioData = {
      id: nuevoComentario.id,
      fecha: nuevoComentario.fecha,
      mensaje: nuevoComentario.mensaje,
      calificacion: parseInt(nuevoComentario.calificacion),
      idServicio: nuevoComentario.idServicio,
      idDueno: nuevoComentario.idDueno, // Incluyendo el idDueno en el envío
    };

    try {
      let respuesta;
      if (nuevoComentario.id) {
        // Si el ID está presente, se actualiza el comentario
        respuesta = await ComentariosService.guardar(comentarioData);
      } else {
        // Si el ID no está presente, se guarda un nuevo comentario
        respuesta = await ComentariosService.guardar({
          comentarios: [comentarioData],
        });
      }

      setComentarios((prevComentarios) => {
        if (nuevoComentario.id) {
          // Actualizar comentario
          return prevComentarios.map((comentario) =>
            comentario.id === nuevoComentario.id ? respuesta : comentario
          );
        } else {
          // Agregar nuevo comentario
          return [...prevComentarios, respuesta];
        }
      });

      setNuevoComentario({ mensaje: "", fecha: "", calificacion: "", idServicio: "", idDueno: "", id: "" });
    } catch (error) {
      console.error("Error al guardar comentario:", error);
    }
  };


  const handleBorrar = async (comentarioId) => {
    console.log("id del comentario", comentarioId);
    try {
      await ComentariosService.eliminarPorId(comentarioId);
      setComentarios(comentarios.filter((comentario) => comentario.id !== comentarioId));
    } catch (error) {
      console.error("Error eliminando comentario:", error);
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
                    required
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
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="calificacion">Calificación</label>
                    <input
                      type="number"
                      id="calificacion"
                      name="calificacion"
                      className="form-control"
                      min="1"
                      max="5"
                      value={nuevoComentario.calificacion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="idServicio">ID Servicio</label>
                    <input
                      type="text"
                      id="idServicio"
                      name="idServicio"
                      className="form-control"
                      value={nuevoComentario.idServicio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="idDueno">ID Dueño</label>
                    <input
                      type="text"
                      id="idDueno"
                      name="idDueno"
                      className="form-control"
                      value={nuevoComentario.idDueno}  // El valor se maneja desde el estado
                      onChange={handleChange}  // Asegura que el valor se actualice en el estado
                      required
                    />
                  </div>
                </div>
                <br/>
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
                  <h5 className="card-title">Dueño: {comentario.idDueno}</h5>
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
