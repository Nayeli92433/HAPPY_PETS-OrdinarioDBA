import { useState } from 'react';
import admin from '../assets/avatar-de-usuario-con-marca-de-verificacion.png'
import Modal from './Modal';
import LoginAdmin from '../pages/LoginAdmin';
export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShow = () => {
    setShowModal(true);
    setModalContent(<LoginAdmin showModal={true} handleClose={handleClose} />);
  };

  const handleClose = () => setShowModal(false);
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
              <a className="nav-link" href="/servicios">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/registrar-dueño">Nuestro personal</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/comentarios">Comentarios y opiniones</a>
            </li>
            <li className="nav-item ms-5">
            <button
                className="btn btn-link"
                onClick={handleShow}
                style={{ padding: 0 }}
              >
                <img
                  src={admin}
                  alt="Perfil"
                  style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        show={showModal} 
        handleClose={handleClose}>
        {modalContent}
      </Modal>
    </nav>
  );
};
