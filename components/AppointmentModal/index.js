import React, { useState } from "react";
import { Button, Checkbox, Modal, Tag, TextArea } from "@carbon/react";
import ReactDOM from "react-dom";
import "./styles.scss";

const AppointmentModal = ({ onClose, appointmentDetails }) => {
  const [openFirstModal, setOpenFirstModal] = useState(true); // First modal open state
  const [openProblemModal, setOpenProblemModal] = useState(false); // Problem description modal state
  const [openPaymentModal, setOpenPaymentModal] = useState(false); // Payment modal state
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false); // Confirmation modal state

  const [selectedPeriod, setSelectedPeriod] = useState("Morning"); // Default to Morning
  const [selectedTime, setSelectedTime] = useState(""); // Selected time slot
  const [selectedConsultationType, setSelectedConsultationType] = useState(""); // Selected consultation type
  const timeSlots = generateTimeSlots(selectedPeriod);

  function generateTimeSlots(period) {
    let slots = [];
    if (period === "Morning") {
      slots = generateMorningSlots();
    } else if (period === "Afternoon") {
      slots = generateAfternoonSlots();
    } else if (period === "Evening") {
      slots = generateEveningSlots();
    }
    return slots;
  }

  function generateMorningSlots() {
    let slots = [];
    for (let i = 9; i <= 12; i++) {
      slots.push(`${i < 10 ? "0" + i : i}:00 am`);
    }
    return slots;
  }

  function generateAfternoonSlots() {
    let slots = [];
    for (let i = 1; i <= 5; i++) {
      slots.push(`${i}:00 pm`);
    }
    return slots;
  }

  function generateEveningSlots() {
    let slots = [];
    for (let i = 5; i <= 8; i++) {
      slots.push(`${i}:00 pm`);
    }
    return slots;
  }

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  const handleNextButtonClick = () => {
    setOpenFirstModal(false); // Close the first modal
    setOpenProblemModal(true); // Open the problem description modal
  };

  const handleBackToBookingClick = () => {
    setOpenFirstModal(true); // Open the first modal again
    setOpenProblemModal(false); // Close the problem description modal
  };

  const handleProblemSubmit = () => {
    setOpenProblemModal(false); // Close the problem description modal
    setOpenPaymentModal(true); // Open the payment modal
  };

  const handleBackToProblemClick = () => {
    setOpenProblemModal(true); // Open the problem description modal
    setOpenPaymentModal(false); // Close the payment modal
  };

  const handlePaymentSubmit = () => {
    // Simulate payment processing (replace with actual PayPal integration)
    console.log("Payment processed successfully");
    setOpenPaymentModal(false); // Close the payment modal
    setOpenConfirmationModal(true); // Open the confirmation modal
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationModal(false); // Close the confirmation modal
    onClose(); // Close the entire appointment modal
  };

  return (
    <>
      {/* First Modal - Booking Details */}
      <Modal
        open={openFirstModal}
        modalHeading={`Booking for ${appointmentDetails.doctorName}`}
        modalLabel={appointmentDetails.speciality}
        primaryButtonText="Next"
        secondaryButtonText="Cancel"
        onRequestClose={onClose}
        primaryButtonDisabled={!selectedPeriod || !selectedTime || !selectedConsultationType}
        onRequestSubmit={handleNextButtonClick}
      >
        <p style={{ marginBottom: "1rem" }}>
          You are booking an appointment with Dr.{" "}
          {appointmentDetails.doctorName} on {appointmentDetails.date}.
        </p>
        <section className="booking">
          <section className="appointment-hours">
            <Tag
              className={`period-tag ${
                selectedPeriod === "Morning" ? "selected" : ""
              }`}
              type="outline"
              onClick={() => handlePeriodClick("Morning")}
            >
              {"Morning"}
            </Tag>
            <Tag
              className={`period-tag ${
                selectedPeriod === "Afternoon" ? "selected" : ""
              }`}
              type="outline"
              onClick={() => handlePeriodClick("Afternoon")}
            >
              {"Afternoon"}
            </Tag>
            <Tag
              className={`period-tag ${
                selectedPeriod === "Evening" ? "selected" : ""
              }`}
              type="outline"
              onClick={() => handlePeriodClick("Evening")}
            >
              {"Evening"}
            </Tag>
          </section>
          <section className="available-time">
            {timeSlots.map((time, index) => (
              <Tag
                key={index}
                className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                type="cool-gray"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Tag>
            ))}
          </section>
          <section className="meeting-type">
            <Checkbox
              labelText={`Video Consultation`}
              id="video"
              checked={selectedConsultationType === "video"}
              onChange={() => setSelectedConsultationType("video")}
            />
            <Checkbox
              labelText={`In person Consultation`}
              id="inPerson"
              checked={selectedConsultationType === "inPerson"}
              onChange={() => setSelectedConsultationType("inPerson")}
            />
          </section>
        </section>
      </Modal>

      {/* Second Modal - Problem Description */}
      <Modal
        open={openProblemModal}
        modalHeading="Describe Your Problem"
        primaryButtonText="Submit"
        secondaryButtonText="Previous"
        onRequestClose={() => setOpenProblemModal(false)}
        onRequestSubmit={handleProblemSubmit}
      >
        <TextArea
          id="problemDescription"
          labelText="Describe your problem:"
          placeholder="Enter your problem description here"
        />
      </Modal>

      {/* Third Modal - Payment via PayPal (placeholder) */}
      <Modal
        open={openPaymentModal}
        modalHeading="Pay with PayPal"
        primaryButtonText="Pay Now"
        secondaryButtonText="Previous"
        onRequestClose={() => setOpenPaymentModal(false)}
        onRequestSubmit={handlePaymentSubmit}
      >
        <p>Placeholder for PayPal integration.</p>
      </Modal>

      {/* Fourth Modal - Confirmation */}
      <Modal
        open={openConfirmationModal}
        modalHeading="Appointment Booked Successfully"
        secondaryButtonText="Go to dashboard"
        primaryButtonText="View Calender"
        onRequestClose={handleConfirmationClose}
      >
        <div className="success-booking">
          <img src="../../doctor.jpg" alt="doc"/>
        </div>
        <p>
          Your appointment with Dr. {appointmentDetails.doctorName} on{" "}
          {appointmentDetails.date} at {selectedTime} has been successfully booked.
        </p>
      </Modal>
    </>
  );
};

export default AppointmentModal;
