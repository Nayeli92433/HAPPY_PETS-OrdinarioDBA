
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
              <a className="nav-link active" href="/admin">Home Admin</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/citasVer">Citas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/veterinarios">Veterinarios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/adminServicios">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/mascotas">Mascotas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
