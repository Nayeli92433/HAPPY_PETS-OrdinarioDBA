import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ show, handleClose, children }) => {
  return (
    <BootstrapModal show={show} onHide={handleClose} centered>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
