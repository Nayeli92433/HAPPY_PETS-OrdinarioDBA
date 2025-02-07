import API_BASE_URL from '../config/config';

const getAll = async () => {
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

export default {
  getAll,
}
