import React, { useState } from "react";
import "./styles.scss";
import { Button, Heading, Modal, TextInput } from "@carbon/react";
import { Information, TrashCan } from "@carbon/icons-react";
import Swal from "sweetalert2";
import Notifications from "@/components/notification/index";
import App from "@/app/api/api";
function NextAppCard({ docImage, test, name, date, email, time, id }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTest, setEditedTest] = useState(test);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);

    Swal.fire({
      title: "Deleting your Appointment!",
      text: "Please wait as we delete your appointment...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: async () => {
        App.delete("/bookings/delete-appointment/", {
          data: {
           
            id: id
          },
          withCredentials: true,
        })
          .then((response) => {
            setDeleteModalOpen(false);
            Swal.close();
            Swal.fire({
              title: "Deleting Appointments",
              text: "Your appointment has been deleted successfully!",
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
              subtitle: "Appointment Deleted successfully!",
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          })
          .catch((error) => {
            setDeleteModalOpen(false);
            Swal.close();
            Swal.fire({
              title: "Editting Appointments",
              text: "There ws an errro deleting the appointment.!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });

            setNotificationProps({
              kind: "error",
              caption: "",
              title: "Failed",
              subtitle: "An error occured while deleting appointment!",
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          });
      },
    });
  };
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };
  const handleEditClick = () => {
    setEditModalOpen(true);
  };
  const handleEditSave = () => {
    setEditModalOpen(false);
    Swal.fire({
      title: "Editting your Appointment!",
      text: "Please wait as we edit your appointment...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: async () => {
        App.put(
          "/bookings/edit_appointment/",
          {
            doctor_name: editedName,
            date: editedDate,
            problem_description: editedTest,
            id: id
          },
          {
            withCredentials: true,
          }
        )
          .then((response) => {
            Swal.close();
            Swal.fire({
              title: "Editting Appointments",
              text: "Your appointment has been editted successfully!",
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
              subtitle: `Success: ${response.data.message}`,
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          })
          .catch((error) => {
            setEditModalOpen(false);
            Swal.fire({
              title: "Editting Appointments",
              text: "There was an error editting your appointment!!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });
            setNotificationProps({
              kind: "error",
              caption: "",
              title: "Unknown error!",
              subtitle: "An error occured during modification:",
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          });
      },
    });
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="appointment">
        {showNotification && (
          <Notifications
            kind={notificationProps.kind}
            caption={notificationProps.caption}
            title={notificationProps.title}
            subtitle={notificationProps.subtitle}
            timeout={notificationProps.timeout}
          />
        )}
        <div className="appointment-image">
          <img className="img-app" src={docImage} alt="appointment" />
        </div>
        <div className="test-description">
          <Heading className="test">{test}</Heading>
          <Heading className="name">Dr. {name}</Heading>
          <p>ADV: {date}</p>
        </div>
        <div className="edit-icons">
          <TrashCan
            className="edit-icon"
            style={{ color: "red" }}
            onClick={handleDeleteClick}
          />
          <Information className="edit-icon" onClick={handleEditClick} />
        </div>
        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          modalHeading="Delete Appointment"
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelDelete}
          onRequestSubmit={handleConfirmDelete}
          danger
        >
          <p>Are you sure you want to delete this appointment?</p>
        </Modal>
        {/* Edit Appointment Modal */}
        <Modal
          open={isEditModalOpen}
          modalHeading="Edit Appointment"
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleEditCancel}
          onRequestSubmit={handleEditSave}
        >
          <TextInput
          id="appointment-id"
          value={id}
          hidden
          />
          <TextInput
            id="edit-name"
            labelText="Doctor's Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextInput
            id="edit-date"
            labelText="Appointment Date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <TextInput
            id="edit-test"
            labelText="Problem Description"
            value={editedTest}
            onChange={(e) => setEditedTest(e.target.value)}
          />
        </Modal>
      </div>
    </>
  );
}

export default NextAppCard;
