import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [mascotas, setMascotas] = useState([]);

  // Simulación de datos de mascotas (luego se reemplazará con una API)
  useEffect(() => {
    const datosIniciales = [
      { id: 1, nombre: 'Firulais', especie: 'Perro', edad: 3 },
      { id: 2, nombre: 'Michi', especie: 'Gato', edad: 2 },
    ];
    setMascotas(datosIniciales);
  }, []);

  return (
    <div>
      <h1>Área de Administración</h1>
      <h2>Mascotas Registradas</h2>
      <ul>
        {mascotas.map((mascota) => (
          <li key={mascota.id}>
            {mascota.nombre} - {mascota.especie} ({mascota.edad} años)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;