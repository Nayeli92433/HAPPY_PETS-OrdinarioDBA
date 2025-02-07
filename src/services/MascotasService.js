import axiosInstance from "../api/axiosConfig";

const API_URL = '/mascotas';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
     
} 


const create = async (mascota) => {
    try {
        console.log("Datos a enviar", mascota)
        const response = await axiosInstance.post(API_URL, mascota);
        return response.data;
    } catch (error) {
        console.error("error al registrar el dueño", error.response ? error.response.data : error.message)
        throw error.response.data;
    }

}

const update = async (id, mascota) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, mascota)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }

}

const deletemascota = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`)

    } catch (error) {
        throw error.response.data
    }
}

// Método para validar el duenioId
const validateDuenioId = async (duenioId) => {
    try {
        const response = await axiosInstance.get(`/duenios/${duenioId}`);
        console.log("response service", response);

        // Verificar que la respuesta tiene la propiedad 'data' y un 'id' válido
        if (response.status === 200 && response.data && response.data.id) {
            console.log("El dueño existe:", response.data);
            return true; // El dueño existe
        }

        // Si no tiene la propiedad 'id' o es una respuesta inesperada
        console.error("Respuesta inesperada, 'data' o 'id' no están presentes");
        return false; // El dueño no existe o la respuesta es incorrecta
    } catch (error) {
        // Muestra detalles más precisos si el error tiene respuesta
        console.error("Error al validar el dueño:", error.response ? error.response.data : error.message);
        return false; // Si ocurre algún error, consideramos que el dueño no existe
    }
};



const getByDuenoId = async (idDueno) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/dueno/${idDueno}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export default {
    getAll,
    create,
    update,
    deletemascota,
    validateDuenioId,
    getByDuenoId,
    deletemascota,
   
}