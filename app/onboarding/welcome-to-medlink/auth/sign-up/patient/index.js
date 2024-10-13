"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "../../../../internals/header/index";
import BackBtn from "../../../../../../components/Button/back";
import Image from "next/image";
import Footer from "../../../../../../components/more-inquiry";
import {
  Button,
  Select,
  SelectItem,
  TextInput,
  Form,
  DatePicker,
  DatePickerInput,
  ProgressBar,
  Heading,
  Checkbox,
  Stack,
  PasswordInput,
  Loading,
  Dropdown,
} from "@carbon/react";
import { PatientProgressSteps } from "../progress";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@carbon/icons-react";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";

function PatientRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [patientData, setPatientData] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    city: "",
    phone_number: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    emergency_contact_email: "",
    current_health_conditions: "",
    past_medical_history: "",
    allergies: "",
    current_medications: "",
    primary_care_physician: "",
    family_health_conditions: "",
    lifestyle_habits: "",
    exercise_routine: "",
    dietary_habits: "",
    insurance_provider: "",
    policy_number: "",
    insurance_phone: "",
    consent_to_treat: false,
    privacy_policy: false,
    password: "",
    confirm_password: "",
    enable_2fa: false,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });

  const totalSteps = 7;

  useEffect(() => {
    const savedData = localStorage.getItem("patientData");
    if (savedData) {
      setPatientData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    const updatedData = {
      ...patientData,
      [id]: type === "checkbox" ? checked : value,
    };
    setPatientData(updatedData);
    localStorage.setItem("patientData", JSON.stringify(updatedData));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep > 6) {
      return;
    }
    if (password != confirm_password) {
      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Error",
        subtitle: `Registration failed: Passswords do not match`,
        timeout: 3000,
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
    setIsSubmitting(true);
    Swal.fire({
      title: "Adding you to Medlink",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        App.post("/api/patients/", patientData)
          .then((response) => {
            Swal.close();
            setNotificationProps({
              kind: "success",
              caption: "",
              title: "Registration Success",
              subtitle: "Registration successful! Redirecting to home...",
              timeout: 3000,
            });
            setShowNotification(true);

            setTimeout(() => {
              setShowNotification(false);
              window.location.href = "/home";
            }, 3000);
            localStorage.removeItem("patientData");
          })
          .catch((error) => {
            Swal.close();
            setNotificationProps({
              kind: "error",
              caption: "",
              title: "Registration failed",
              subtitle: `Registration failed. Please try again.`,
              timeout: 3000,
            });
            setShowNotification(true);

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

  const healthConditions = [
    { id: "condition1", text: "Hypertension" },
    { id: "condition2", text: "Diabetes" },
    { id: "condition3", text: "Asthma" },
    { id: "condition4", text: "Arthritis" },
  ];
  const genderOptions = [
    { id: "option1", text: "Female" },
    { id: "option2", text: "Male" },
    { id: "option3", text: "Other" },
  ];
  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <TextInput
              autoComplete="off"
              id="name"
              type="text"
              className="inputfields1"
              labelText="Name"
              onChange={handleChange}
              value={patientData.name}
            />
            <DatePicker
              datePickerType="single"
              onChange={(dates) => {
                const date = dates[0];
                setPatientData({
                  ...patientData,
                  date_of_birth: date.toISOString().split("T")[0],
                });
                localStorage.setItem(
                  "patientData",
                  JSON.stringify({
                    ...patientData,
                    date_of_birth: date.toISOString().split("T")[0],
                  })
                );
              }}
              value={patientData.date_of_birth}
              dateFormat="Y-m-d"
            >
              <DatePickerInput
                id="date_of_birth"
                labelText="Date of Birth"
                placeholder="MM/DD/YYYY"
              />
            </DatePicker>
            <Dropdown
              className="inputfields1"
              id="gender"
              titleText="Gender"
              label="Select your Gender"
              items={genderOptions}
              itemToString={(item) => (item ? item.text : "")}
              selectedItem={genderOptions.find(
                (option) => option.text === patientData.gender
              )}
              onChange={(event) =>
                handleChange({
                  target: {
                    id: "gender",
                    value: event.selectedItem.text,
                  },
                })
              }
            />
            {/* <TextInput
              autoComplete="off"
              id="gender"
              type="text"
              className="inputfields1"
              labelText="Gender"
              onChange={handleChange}
              value={patientData.gender}
            /> */}
            <Stack gap={6} orientation="horizontal">
              <TextInput
                autoComplete="off"
                id="email"
                type="text"
                className="inputfields1"
                labelText="Contact Information (email)"
                onChange={handleChange}
                value={patientData.email}
              />
              <TextInput
                autoComplete="off"
                id="phone_number"
                type="text"
                className="inputfields1"
                labelText="Contact Information (Phone number)"
                onChange={handleChange}
                value={patientData.phone_number}
              />
            </Stack>
            <TextInput
              autoComplete="off"
              id="address"
              type="text"
              className="inputfields1"
              labelText="Address"
              onChange={handleChange}
              value={patientData.address}
            />
            <TextInput
              id="city"
              type="text"
              className="inputfields1"
              labelText="City"
              onChange={handleChange}
              value={patientData.city}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextInput
              autoComplete="off"
              id="emergency_contact_name"
              type="text"
              className="inputfields1"
              labelText="Emergency Contact Name"
              onChange={handleChange}
              value={patientData.emergency_contact_name}
            />
            <TextInput
              autoComplete="off"
              id="emergency_contact_relationship"
              type="text"
              className="inputfields1"
              labelText="Emergency Contact Relationship"
              onChange={handleChange}
              value={patientData.emergency_contact_relationship}
            />
            <TextInput
              autoComplete="off"
              id="emergency_contact_phone"
              type="text"
              className="inputfields1"
              labelText="Emergency Contact Phone Number"
              onChange={handleChange}
              value={patientData.emergency_contact_phone}
            />
            <TextInput
              autoComplete="off"
              id="emergency_contact_email"
              type="text"
              className="inputfields1"
              labelText="Emergency Contact Email"
              onChange={handleChange}
              value={patientData.emergency_contact_email}
            />
          </>
        );
      case 2:
        return (
          <>
            <Dropdown
              id="current_health_conditions"
              titleText="Current Health Conditions"
              label="Select a health condition"
              items={healthConditions}
              itemToString={(item) => (item ? item.text : "")}
              selectedItem={healthConditions.find(
                (condition) =>
                  condition.text === patientData.current_health_conditions
              )}
              onChange={(event) =>
                handleChange({
                  target: {
                    id: "current_health_conditions",
                    value: event.selectedItem.text,
                  },
                })
              }
            />
            <TextInput
              autoComplete="off"
              id="past_medical_history"
              type="text"
              className="inputfields1"
              labelText="Past Medical History (major illnesses, surgeries)"
              onChange={handleChange}
              value={patientData.past_medical_history}
            />
            <TextInput
              autoComplete="off"
              id="allergies"
              type="text"
              className="inputfields1"
              labelText="Allergies (medications, food, environmental)"
              onChange={handleChange}
              value={patientData.allergies}
            />
            <TextInput
              autoComplete="off"
              id="current_medications"
              type="text"
              className="inputfields1"
              labelText="Medications Currently Taking (name, dosage)"
              onChange={handleChange}
              value={patientData.current_medications}
            />
            <TextInput
              autoComplete="off"
              id="primary_care_physician"
              type="text"
              className="inputfields1"
              labelText="Primary Care Physician (name, contact)"
              onChange={handleChange}
              value={patientData.primary_care_physician}
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              autoComplete="off"
              id="family_health_conditions"
              type="text"
              className="inputfields1"
              labelText="Health Conditions that Run in the Family (e.g., diabetes, heart disease)"
              onChange={handleChange}
              value={patientData.family_health_conditions}
            />
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              autoComplete="off"
              id="lifestyle_habits"
              type="text"
              className="inputfields1"
              labelText="Lifestyle Habits (smoking, alcohol use)"
              onChange={handleChange}
              value={patientData.lifestyle_habits}
            />
            <TextInput
              autoComplete="off"
              id="exercise_routine"
              type="text"
              className="inputfields1"
              labelText="Exercise Routine"
              onChange={handleChange}
              value={patientData.exercise_routine}
            />
            <TextInput
              autoComplete="off"
              id="dietary_habits"
              type="text"
              className="inputfields1"
              labelText="Dietary Habits"
              onChange={handleChange}
              value={patientData.dietary_habits}
            />
          </>
        );
      case 5:
        return (
          <>
            <TextInput
              autoComplete="off"
              id="insurance_provider"
              type="text"
              className="inputfields1"
              labelText="Insurance Provider"
              onChange={handleChange}
              value={patientData.insurance_provider}
            />
            <TextInput
              autoComplete="off"
              id="policy_number"
              type="text"
              className="inputfields1"
              labelText="Policy Number"
              onChange={handleChange}
              value={patientData.policy_number}
            />
            <TextInput
              autoComplete="off"
              id="insurance_phone"
              type="text"
              className="inputfields1"
              labelText="Insurance Company Phone Number"
              onChange={handleChange}
              value={patientData.insurance_phone}
            />
          </>
        );
      case 7:
        return (
          <>
            <Heading
              style={{
                marginBottom: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Please review the following consent and authorization information.
              You must agree to the terms to proceed with the treatment and
              ensure compliance with privacy policies.
            </Heading>
            <Checkbox
              id="consent_to_treat"
              labelText="I give my consent to be treated."
              helperText="By checking this box, you agree to allow our medical team to provide necessary treatment."
              onChange={handleChange}
              checked={patientData.consent_to_treat}
            />
            <Checkbox
              id="privacy_policy"
              labelText="I acknowledge the privacy policy (HIPAA compliance)."
              helperText="By checking this box, you acknowledge that you have read and understood our privacy policy in compliance with HIPAA regulations."
              onChange={handleChange}
              checked={patientData.privacy_policy}
            />
          </>
        );
      case 6:
        return (
          <>
            <Heading
              style={{
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Create a Secure Password
            </Heading>
            <PasswordInput
              id="password"
              labelText="New Password"
              helperText="Your password must meet the following criteria: at least 8 characters long, include both uppercase and lowercase letters, and contain at least one number and one special character."
              autoComplete="off"
              onChange={handleChange}
              value={patientData.password}
            />
            <PasswordInput
              id="confirm_password"
              labelText="Confirm Password"
              helperText="Ensure this matches your new password."
              autoComplete="off"
              onChange={handleChange}
              value={patientData.confirm_password}
            />
            <Checkbox
              id="enable_2fa"
              labelText="Enable Two-Factor Authentication (2FA)"
              helperText="By selecting this option, you agree to enhance your account security by enabling two-factor authentication."
              onChange={handleChange}
              checked={patientData.enable_2fa}
            />
          </>
        );
      default:
        return null;
    }
  };
  const [isLoading, setIsLoading] = useState(false);
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
      )}
      <div className="patientreg1">
        <div className="regbody1">
          <Header>
            <section className="flexleft1">
              <Image
                width={70}
                height={70}
                alt="logo"
                src={"../../../../../../logov2.svg"}
              />
              <Link
                href={"../../auth/sign-up"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
                onClick={() => setIsLoading(true)}
              >
                {isLoading ? (
                  <>
                    <Loading withOverlay={false} small />
                    <BackBtn />
                  </>
                ) : (
                  <>
                    <BackBtn />
                  </>
                )}{" "}
              </Link>
            </section>
            <h4>Patient</h4>
          </Header>
          <section className="regform1">
            <div className="svgpart1" ></div>
            <div className="cont1">
              <h4 className="regtitle1">Register Patient Account</h4>
              <h4>Please fill in your details.</h4>
              <div className="myform1">
                {isSubmitting ? (
                  <div className="signinprogress1"></div>
                ) : (
                  <Form
                    aria-label="Registration form"
                    className="form1"
                    onSubmit={handleSubmit}
                  >
                    {renderFormFields()}
                    <div className="flexbtns1">
                      <Button
                        kind="secondary"
                        size="sm"
                        renderIcon={ArrowLeft}
                        className="someclass1"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                      >
                        Previous
                      </Button>
                      {currentStep < totalSteps - 1 ? (
                        <Button
                          kind="secondary"
                          size="sm"
                          renderIcon={ArrowRight}
                          className="someclass1"
                          type="button"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          kind="primary"
                          size="sm"
                          className="someclass1"
                          type="submit"
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </Form>
                )}
              </div>
            </div>
          </section>
        </div>
        <section className="regprogress1">
          <PatientProgressSteps currentStep={currentStep} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PatientRegistration;
