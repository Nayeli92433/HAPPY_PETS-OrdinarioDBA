import API_BASE_URL from '../config/config';
import axiosInstance from "../api/axiosConfig";
const API_URL = '/citas';

const create = async (datosCita) => {
  try {
    // Realizar la solicitud POST
    const response = await axiosInstance.post(API_URL, datosCita);
    
    // Retornar la respuesta completa (incluyendo status)
    return response; // Aquí devolvemos toda la respuesta
  } catch (error) {
    // Manejo de errores: Mostrar detalles del error
    console.error('Error al crear la cita:', error.response ? error.response.data : error.message);
    
    // Lanzar el error para ser manejado por el componente que hace la llamada
    throw error;
  }
};

export default { create };
