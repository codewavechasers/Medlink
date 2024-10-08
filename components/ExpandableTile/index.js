import React, { useState, useRef } from "react";
import "./styles.scss";
import {
  Button,
  Heading,
  Modal,
  TextInput,
  Tooltip,
} from "@carbon/react";
import Notifications from "@/components/notification/index";

import {
  ChevronLeft,
  ChevronRight,
  NotificationNew,
  ShoppingBag,
} from "@carbon/icons-react";
import Swal from "sweetalert2";
import App from "@/app/api/api";
const MyExpandableTile = ({
  id,
  dbid,
  heading,
  firstUseIcon,
  secondUseIcon,
  thirdUseIcon,
  spoons,
  afterBefore,
  AmPm,
  daysLeft,
  description,
  expanded,
  onToggleExpand,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const MyModal = ({ heading, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const button = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refillData, setRefillData] = useState({
      medication: heading,
      reason: "",
      quantity: "",
      id: dbid,
    });
    
    
    const handleChange = (e) => {
      const { id, value } = e.target;
      setRefillData(prevState => ({
        ...prevState,
        [id]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsOpen(false);
      setIsSubmitting(true);
      Swal.fire({
        title: `Requesting a refill for ${refillData.medication} from Medlink`,
        text: "Please wait...",
        imageUrl: "/logov2.svg",
        imageWidth: 70,
        imageHeight: 70,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          App.post("/api/medication/refill/", 
            refillData,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
          })
            .then((response) => {
              if (response.status != 200) {
                setNotificationProps({
                  kind: "error",
                  caption: "",
                  title: "An error occured!",
                  subtitle:`Networks response failed`,
                  timeout: 3000,
                });
                setShowNotification(true);
  
                // Redirect after notification
                setTimeout(() => {
                  setShowNotification(false);
                }, 3000);
                throw new Error("Network response was not ok");
              }
              return response.data;
            })
            .then((data) => {
              Swal.close();
              setNotificationProps({
                kind: "success",
                caption: "",
                title: "Success",
                subtitle: data.message || "Your request was successful!",
                timeout: 3000,
              });
              setShowNotification(true);

              // Redirect after notification
              setTimeout(() => {
                setShowNotification(false);
              }, 3000);

              localStorage.removeItem("RefillData");
            })
            .catch((error) => {
              Swal.close();

              setNotificationProps({
                kind: "error",
                caption: "",
                title: "An error occured!",
                subtitle:`Requesting medication refill failed. Please try again. ${error}`,
                timeout: 3000,
              });
              setShowNotification(true);

              // Redirect after notification
              setTimeout(() => {
                setShowNotification(false);
              }, 3000);

            })
            .finally(() => {
              setIsSubmitting(false);
            });
        },
      });
    };
    
    return (
      <>
        <Button ref={button} kind="secondary" onClick={() => setIsOpen(true)}>
          Refill
        </Button>
        <Modal
          open={isOpen}
          modalHeading={heading}
          modalLabel="Medication Hub"
          primaryButtonText="Request"
          secondaryButtonText="Cancel"
          onRequestSubmit={handleSubmit}
          onRequestClose={() => setIsOpen(false)}
        >
          <p style={{ marginBottom: "1rem" }}>
            Please confirm the details of your medication refill request.
          </p>
          <div className="flex-modal">
            <div className="refill-form">
              <TextInput
                disabled
                id="medication"
                labelText="Medication Name"
                value={refillData.medication}
                style={{ marginBottom: "1rem" }}
              />
              <TextInput
                onChange={handleChange}
                value={refillData.reason}
                id="reason"
                labelText="Reason"
                placeholder="e.g., Running out of medication"
                style={{ marginBottom: "1rem" }}
              />
              <TextInput
                onChange={handleChange}
                value={refillData.quantity}
                id="quantity"
                labelText="Medication Quantity"
                placeholder="e.g., 20 (30 mg)"
                style={{ marginBottom: "1rem" }}
              />
              <p className="refill-text">{description}</p>
            </div>
          </div>
        </Modal>
      </>
    );
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
      )}      <div className={`my-tile ${expanded ? "change-tile" : ""}`}>
        <div
          className={`left-top-content ${
            expanded ? "change-left-content" : ""
          }`}
        >
          <Heading className="head-title">{heading}</Heading>
          <div className="uses">
            <p>About</p>
            {firstUseIcon}
            {secondUseIcon}
            {thirdUseIcon}
            {expanded ? (
              <ChevronLeft
                style={{
                  background: "var(--text-color)",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  padding: "3px",
                  borderRadius: "3px",
                  color: "var(--secondary-color-2)",
                }}
                size={32}
                onClick={() => onToggleExpand(id)}
              />
            ) : (
              <ChevronRight
                style={{
                  background: "var(--text-color)",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  padding: "3px",
                  borderRadius: "3px",
                  color: "var(--secondary-color-2)",
                }}
                size={32}
                onClick={() => onToggleExpand(id)}
              />
            )}
          </div>
          <div className="spoon-per-day">{spoons} spoons Per Day</div>
          <div className="after-before-meal">{afterBefore} Meal</div>
          <div className="Am-or-Pm">{AmPm}</div>
          <div className="days-left">{daysLeft} days left</div>
        </div>
        <div
          className={`right-bottom-content ${
            expanded ? "change-right-content" : ""
          }`}
        >
          <div className="icons-right">
            <div>
              <Tooltip label="Label one" enterDelayMs={0} leaveDelayMs={300}>
                <ShoppingBag
                  style={{
                    background: "var(--text-color-2)",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "3px",
                    color: "var(--secondary-color-2)",
                  }}
                  size={32}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip label="Label one" enterDelayMs={0} leaveDelayMs={300}>
                <NotificationNew
                  style={{
                    background: "var(--text-color-2)",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "3px",
                    color: "var(--secondary-color-2)",
                  }}
                  size={32}
                />
              </Tooltip>
            </div>
          </div>
          <div className="med-description">
            <Heading className="head-title">Description</Heading>
            {description}
          </div>
          <div className="refillButton">
            <MyModal heading={heading} id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyExpandableTile;
