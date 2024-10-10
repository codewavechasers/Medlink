import React, { useRef, useState, useEffect } from "react";
import { Button, Loading, Modal, InlineNotification } from "@carbon/react";
import App from "@/app/api/api";

const AdviceModal = ({ selectedBodyPart }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchAdvice = async () => {
    if (!selectedBodyPart) {
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      const response = await App.get(`/api/watson/get-advice/${selectedBodyPart.id}`, {
        withCredentials: true,
      });
      setAdvice(response.data.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("Failed to fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (selectedBodyPart) {
      fetchAdvice();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAdvice("");
    setShowAlert(false);
  };

  return (
    <>
      <Button kind="ghost" onClick={handleOpen}>
        Get Advice
      </Button>
      <Modal
        open={open}
        onRequestClose={handleClose}
        modalHeading="Medical Advice"
        primaryButtonText="Close"
        onRequestSubmit={handleClose}
      >
        {showAlert && (
          <InlineNotification
            kind="error"
            title="No item selected"
            subtitle="Please select an item from the list to get advice."
            onClose={() => setShowAlert(false)}
          />
        )}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <Loading withOverlay={false} size="lg" />
          </div>
        ) : (
          <p>{advice || "Select a body part to get advice."}</p>
        )}
      </Modal>
    </>
  );
};

export default AdviceModal;
