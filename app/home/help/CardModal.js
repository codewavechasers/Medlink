import React, { useRef } from "react";
import { Button, Modal } from "@carbon/react";
import ReactDOM from "react-dom";

const CardModal = ({ open, onClose, title, videoUrl }) => {
  const button = useRef();

  return (
    open ? ReactDOM.createPortal(
      <Modal
        launcherButtonRef={button}
        modalHeading={title}
        secondaryButtonText="Close"
        primaryButtonText="Thanks"
        open={open}
        onRequestSubmit={onClose}
        onRequestClose={onClose}
      >
        <div>
          <video autoPlay loop src={videoUrl} controls muted/>
        </div>
      </Modal>,
      document.body
    ) : null
  );
};

export default CardModal;
