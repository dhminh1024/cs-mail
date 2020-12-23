import React from "react";
import { Modal } from "react-bootstrap";

const MessageModal = ({ showModal, setShowModal, message }) => {
  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{message?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message?.body}</Modal.Body>
      </Modal>
    </div>
  );
};

export default MessageModal;
