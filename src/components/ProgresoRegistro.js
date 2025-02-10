import React from "react";

const ProgresoRegistro = ({ pasoActual }) => {
  return (
    <div className="breadcrumb-container">
      <div className={`breadcrumb-item ${pasoActual > 1 ? "completed" : ""} ${pasoActual === 1 ? "active" : ""}`}>
        1. Registrar Dueño
      </div>
      <div className={`breadcrumb-item ${pasoActual > 2 ? "completed" : ""} ${pasoActual === 2 ? "active" : ""}`}>
        2. Registrar Mascota
      </div>
    </div>
  );
};

export default ProgresoRegistro;