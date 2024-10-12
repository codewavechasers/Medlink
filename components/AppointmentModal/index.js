import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal, Tag, TextArea } from "@carbon/react";
import Swal from "sweetalert2";
import "./styles.scss";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";

const AppointmentModal = ({ onClose, appointmentDetails, doctorImage }) => {
  const [openFirstModal, setOpenFirstModal] = useState(true);
  const [openProblemModal, setOpenProblemModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [problemDescription, setProblemDescription] = useState(""); // Track the problem description
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const [selectedPeriod, setSelectedPeriod] = useState("Morning");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState("");
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

  const convertTo24HourFormat = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "pm" && hours !== 12) {
      hours += 12;
    } else if (period === "am" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNextButtonClick = async () => {
    setOpenFirstModal(false);
    setOpenProblemModal(true);
  };

  const handleProblemSubmit = async () => {
    setOpenProblemModal(false);
    setOpenPaymentModal(true);
  };
 

  const handleFinalModalClose = async () => {
    setOpenConfirmationModal(false);
    const formattedTime = convertTo24HourFormat(selectedTime);
    const formattedDate = new Date(appointmentDetails.date)
      .toISOString()
      .split("T")[0];

    const appointmentData = {
      doctorName: appointmentDetails.doctorName,
      speciality: appointmentDetails.speciality,
      date: formattedDate,
      time: formattedTime,
      period: selectedPeriod,
      consultationType: selectedConsultationType,
      problemDescription: problemDescription,
      doctor_image: doctorImage || "",
    };
    Swal.fire({
      title: "Booking Appointment",
      text: "Please wait as we book you an appointment...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: async () => {
        try {
          const response = await App.post(
            "/bookings/book-appointment/",
            appointmentData,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = response.data;

          if (result.status === "success") {
            Swal.close();
            Swal.fire({
              title: "Appointments Booking",
              text: "Your appointment has been booked successfully!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });

            setNotificationProps({
              kind: "success",
              caption: "",
              title: "Success",
              subtitle: `Success: ${result.message}`,
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          } else {
            setNotificationProps({
              kind: "error",
              caption: "",
              title: "Booking failed",
              subtitle: `Error: ${result.message}`,
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          }
        } catch (error) {
          setNotificationProps({
            kind: "error",
            caption: "",
            title: "Uknown error!",
            subtitle: `An error occurred. Please try again later. Error`,
            timeout: 3000,
          });
          setShowNotification(true);

          // Redirect after notification
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        }
      },
    });
    Swal.close();
  };

  return (
    <>
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}{" "}
      <Modal
        open={openFirstModal}
        modalHeading={`Booking for ${appointmentDetails.doctorName}`}
        modalLabel={appointmentDetails.speciality}
        primaryButtonText="Next"
        secondaryButtonText="Cancel"
        onRequestClose={onClose}
        primaryButtonDisabled={
          !selectedPeriod || !selectedTime || !selectedConsultationType
        }
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
                className={`time-slot ${
                  selectedTime === time ? "selected" : ""
                }`}
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
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />
      </Modal>
      <Modal
        open={openPaymentModal}
        modalHeading="Pay with PayPal"
        primaryButtonText="Pay Now"
        secondaryButtonText="Previous"
        onRequestClose={() => setOpenPaymentModal(false)}
        onRequestSubmit={() => {
          setOpenPaymentModal(false);
          setOpenConfirmationModal(true);
        }}
      >
        <p>Placeholder for PayPal integration.</p>
      </Modal>
      <Modal
        open={openConfirmationModal}
        modalHeading={`Confirm Booking of appointment with ${appointmentDetails.doctorName}`}
        secondaryButtonText="Return"
        primaryButtonText="Confirm"
        onRequestClose={() => setOpenConfirmationModal(false)}
        onRequestSubmit={handleFinalModalClose}
      >
        <div className="success-booking">
          <img src={doctorImage} alt="doc" />
        </div>
        <p>
          Your appointment with Dr. {appointmentDetails.doctorName} on{" "}
          {appointmentDetails.date} at {selectedTime} will now be booked. Click
          confirm!
        </p>
      </Modal>
    </>
  );
};

export default AppointmentModal;
