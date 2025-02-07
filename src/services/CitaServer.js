import API_BASE_URL from '../config/config';

const create = async (datosCita) => {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCita),
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear la cita');
    }

    return await respuesta.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default crearCita;
