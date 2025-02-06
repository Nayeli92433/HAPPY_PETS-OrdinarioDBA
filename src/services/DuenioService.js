import axiosInstance from "../api/axiosConfig";

const API_URL = '/duenios';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
     
} 

const create = async (duenio) => {
    try {
        console.log("Datos a enviar",duenio)
        const response = await axiosInstance.post(API_URL,duenio);
        return response.data;    
    } catch (error) {
        console.error("error al registrar el dueño", error.response ? error.response.data : error.message)
        throw error.response.data;
    }
    
}

const update = async (id,duenio) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`,duenio)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
   
}

const deleteduenio = async (id) => {
    try {
    await axiosInstance.delete(`${API_URL}/${id}`)
        
    } catch (error) {
        throw error.response.data
    }
}

export default {
    getAll,
    create,
    update,
    deleteduenio
}