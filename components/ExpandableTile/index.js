import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import {
  Button,
  Heading,
  Modal,
  TextInput,
  Select,
  SelectItem,
  Tooltip,
} from "@carbon/react";
import {
  ChevronLeft,
  ChevronRight,
  NotificationNew,
  ShoppingBag,
} from "@carbon/icons-react";

const MyExpandableTile = ({
  id,
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
  const MyModal = () => {
    const ModalStateManager = ({
      renderLauncher: LauncherContent,
      children: ModalContent,
    }) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          {!ModalContent || typeof document === "undefined"
            ? null
            : ReactDOM.createPortal(
                <ModalContent open={open} setOpen={setOpen} />,
                document.body
              )}
          {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
        </>
      );
    };
    const button = useRef();
    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Button ref={button} kind="secondary" onClick={() => setOpen(true)}>
            Refill
          </Button>
        )}
      >
        {({ open, setOpen }) => (
          <Modal
            launcherButtonRef={button}
            modalHeading="Refill your Medication"
            modalLabel="Medication Hub"
            primaryButtonText="Add to cart"
            secondaryButtonText="Cancel"
            open={open}
            // size="lg"
            height="auto"
            onRequestClose={() => setOpen(false)}
          >
            <p
              style={{
                marginBottom: "1rem",
              }}
            >
              Please confirm the details of your medication refill before adding
              it to your cart. Ensure that the dosage and frequency are accurate
              to avoid any medication errors. Once confirmed, click 'Add to
              Cart' to proceed with your refill.
            </p>
            <div className="flex-modal">
              <div className="refill-form">
                <TextInput
                  data-modal-primary-focus
                  id="medication-name"
                  labelText="Medication Name"
                  placeholder="e.g Spirulina"
                  style={{
                    marginBottom: "1rem",
                  }}
                />
                <Select
                  style={{
                    marginBottom: "1rem",
                  }}
                  id="medication-type"
                  defaultValue="Capsules"
                  labelText="Medication Type"
                >
                  <SelectItem value="us-south" text="Capsules" />
                  <SelectItem value="us-east" text="Liquid" />
                </Select>
                <TextInput
                  // data-modal-primary-focus
                  id="medication-Quantity"
                  labelText="Medication Quantity"
                  placeholder="e.g 20 (30 mg)"
                  style={{
                    marginBottom: "1rem",
                  }}
                />
                <Select
                  id="pharmacy"
                  defaultValue="Pharmacy"
                  labelText="Pharmacy"
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  <SelectItem value="us-south" text="Pharmacy 1" />
                  <SelectItem value="us-east" text="Pharmacy 2" />
                </Select>
                <TextInput
                  // data-modal-primary-focus
                  disabled
                  id="medication-price"
                  labelText="Medication Price"
                  placeholder="0.0"
                  style={{
                    marginBottom: "1rem",
                  }}
                />
              </div>
              <div className="refill-image">
                <img
                  style={{ width: "100%", height: "auto" }}
                  src="../../refill-image.svg"
                  alt="refill image"
                />
                <p className="refill-text">
                  Spirulina is a biomass of cyanobacteria (blue-green algae)
                  that can be consumed by humans and animals.{" "}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </ModalStateManager>
    );
  };
  return (
    <div className={`my-tile ${expanded ? "change-tile" : ""}`}>
      <div
        className={`left-top-content ${expanded ? "change-left-content" : ""}`}
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
          <MyModal />
        </div>
      </div>
    </div>
  );
};

export default MyExpandableTile;
