import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UpdateModal = ({ show, handleClose, handleUpdate }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add fields to modify the data */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
