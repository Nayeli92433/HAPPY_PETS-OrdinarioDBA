import axiosInstance from "../api/axiosConfig";

const API_URL = '/veterinarios';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
     
} 

const create = async (veterinario) => {
    try {
        console.log("Datos a enviar",veterinario)
        const response = await axiosInstance.post(API_URL,veterinario);
        return response.data;    
    } catch (error) {
        console.error("error al registrar el dueño", error.response ? error.response.data : error.message)
        throw error.response.data;
    }
    
}

const update = async (id,veterinario) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`,veterinario)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
   
}

const deleteveterinario = async (id) => {
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
    deleteveterinario
}