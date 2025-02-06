export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Happy Pets</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/crear-cita">Crear Cita</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ver-citas">Ver Citas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/registrar-mascota">Registrar Mascota</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/registrar-dueño">Registrar Dueño</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/comentarios">Comentarios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/historial-medico">Historial Médico</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
