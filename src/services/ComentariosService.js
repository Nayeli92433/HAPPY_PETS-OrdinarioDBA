import axios from "axios";

// URL completa del backend
const API_URL = "http://localhost:8080/comentarios";  // Aquí hemos puesto la URL completa

const ComentariosService = {
  // Obtener todos los comentarios
  obtenerTodos: async () => {
    console.log("Iniciando la obtención de todos los comentarios...");
    try {
      const response = await axios.get(API_URL);
      console.log("Comentarios obtenidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo comentarios:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
      throw error;
    }
  },

  // Obtener un comentario por ID
  obtenerPorId: async (id) => {
    console.log(`Iniciando la obtención del comentario con ID ${id}...`);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(`Comentario con ID ${id} obtenido:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo el comentario con ID ${id}:`, error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
      throw error;
    }
  },

  // Crear o actualizar un comentario
  guardar: async (comentario) => {
    console.log("Iniciando la operación de guardar o actualizar el comentario:", comentario);
    try {
      const response = await axios.post(API_URL, comentario);
      console.log("Comentario guardado o actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error guardando el comentario:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
      throw error;
    }
  },

  // Eliminar un comentario por ID
  eliminarPorId: async (id) => {
    console.log(`Iniciando la eliminación del comentario con ID ${id}...`);
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log(`Comentario con ID ${id} eliminado.`);
    } catch (error) {
      console.error(`Error eliminando el comentario con ID ${id}:`, error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
      throw error;
    }
  }
};

export default ComentariosService;
