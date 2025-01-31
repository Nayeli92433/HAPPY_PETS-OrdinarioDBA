import React from 'react';

const Galeria = () => {
  const fotos = [
    { id: 1, src: 'foto1.jpg', descripcion: 'Mascotas jugando en la guardería' },
    { id: 2, src: 'foto2.jpg', descripcion: 'Consulta veterinaria' },
    { id: 3, src: 'foto3.jpg', descripcion: 'Peluquería canina' },
  ];

  return (
    <div>
      <h1>Galería</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {fotos.map((foto) => (
          <div key={foto.id} style={{ margin: '10px' }}>
            <img src={foto.src} alt={foto.descripcion} style={{ width: '200px', height: '150px' }} />
            <p>{foto.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;