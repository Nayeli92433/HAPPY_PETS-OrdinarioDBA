import API_BASE_URL from '../config/config';
import axiosInstance from "../api/axiosConfig";

const API_URL = '/servicios';


const obtenerServicios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/servicios`);
    if (!response.ok) {
      throw new Error('Error al obtener los servicios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }

  
};
const create = async (servicio) => {
  try {
      console.log("Datos a enviar",servicio)
      const response = await axiosInstance.post(API_URL,servicio);
      return response.data;    
  } catch (error) {
      console.error("error al registrar el dueño", error.response ? error.response.data : error.message)
      throw error.response.data;
  }
  
}

const update = async (id,servicio) => {
  try {
      const response = await axiosInstance.put(`${API_URL}/${id}`,servicio)
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
 
}

const deleteservicio = async (id) => {
  console.log("id del servicio",id);
  try {
  await axiosInstance.delete(`${API_URL}/${id}`)
      
  } catch (error) {
      throw error.response.data
  }
}

export default {
    obtenerServicios,
    create,
    update,
    deleteservicio
}
