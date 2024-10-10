import React, { useState } from "react";
import "./styles.scss";
import { Button, Heading, Modal } from "@carbon/react";
import { Calendar } from "@carbon/icons-react";
import AppointmentModal from "../AppointmentModal";

function AppointmentDoctors({
  doctor,
  selectedAppointment,
  setSelectedAppointment,
  description,
}) {
  const [makeBooking, setMakeBooking] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const getCurrentWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayIndex = date.getDay();
      if (dayIndex > 0 && dayIndex < 6) {
        week.push({
          day: days[dayIndex - 1],
          date: date.getDate(),
          fullDate: date.toDateString(),
        });
      }
    }
    return week;
  };

  const week = getCurrentWeek();

  const handleDateClick = (date) => {
    if (
      selectedAppointment &&
      selectedAppointment.doctorId === doctor.id &&
      selectedAppointment.date === date
    ) {
      setSelectedAppointment(null);
    } else {
      setSelectedAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        speciality: doctor.speciality,
        date,
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleBookingClick = () => {
    if (!selectedAppointment || selectedAppointment.doctorId !== doctor.id) {
      alert(
        "Please select a date for the appointment before making a booking."
      );
      return;
    }
    setMakeBooking(true);
  };
  const handleModalClose = () => {
    setViewModal(false);
  };

  return (
    <div className="app-doctors">
      <div className="doc-image">
        <img className="img" src={doctor.image} alt="doc" />
      </div>
      <div className="bottom-section">
        <div className="doc-info">
          <Heading className="doc-name">Dr. {doctor.name}</Heading>
          <section className="doc-rates">
            <Heading className="doc-speciality">{doctor.speciality}</Heading>
            <div className="rating">{renderStars(doctor.rating)}</div>
          </section>
        </div>
        <section className="appointment-dates">
          {week.map((day, index) => (
            <div
              key={index}
              className={`date ${
                selectedAppointment &&
                selectedAppointment.doctorId === doctor.id &&
                selectedAppointment.date === day.fullDate
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleDateClick(day.fullDate)}
            >
              <div className="day">{day.day}</div>
              <div className="actual-date">{day.date}</div>
            </div>
          ))}
        </section>
      </div>
      <div className="footer-section">
        <Heading
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setViewModal(true)}
          >
          View
        </Heading>
        <Button
          kind="primary"
          size="sm"
          renderIcon={Calendar}
          onClick={handleBookingClick}
        >
          Make Booking
        </Button>
      </div>
      {makeBooking && (
        <AppointmentModal
          onClose={() => setMakeBooking(false)}
          appointmentDetails={selectedAppointment}
          doctorImage={doctor.image}
        />
      )}
      <Modal
        open={viewModal}
        modalHeading="About the doctor"
        modalLabel="Medlink - Doctors"
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        onRequestClose={handleModalClose}
        onRequestSubmit={handleModalClose}      
        >
        <p>Dr. {description}</p>
      </Modal>
    </div>
  );
}

export default AppointmentDoctors;
