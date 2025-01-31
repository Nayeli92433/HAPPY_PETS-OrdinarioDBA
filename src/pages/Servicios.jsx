import React from 'react';

const Servicios = () => {
  const servicios = [
    { id: 1, nombre: 'Consulta veterinaria', descripcion: 'Revisiones médicas y tratamientos.' },
    { id: 2, nombre: 'Guardería', descripcion: 'Cuidado diario para tus mascotas.' },
    { id: 3, nombre: 'Peluquería', descripcion: 'Baño, corte y arreglo personalizado.' },
  ];

  return (
    <div>
      <h1>Nuestros Servicios</h1>
      <ul>
        {servicios.map((servicio) => (
          <li key={servicio.id}>
            <h2>{servicio.nombre}</h2>
            <p>{servicio.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Servicios;