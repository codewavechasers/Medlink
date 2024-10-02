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
} from "@carbon/react";
import { DoctorProgressSteps } from "../progress";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@carbon/icons-react";
import Notifications from "@/components/notification/index";

function DoctorRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [doctorData, setdoctorData] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    emergency_contact_email: "",
    medical_qualifications: "",
    years_of_experience: "",
    current_practice_location: "",
    professional_associations: "",
    research_interests: "",
    insurance_provider: "",
    policy_number: "",
    group_number: "",
    coverage_details: "",
    hospital_affiliation: "",
    languages_spoken: "",
    password: "",
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
    const savedData = localStorage.getItem("doctorData");
    if (savedData) {
      setdoctorData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    const updatedData = {
      ...doctorData,
      [id]: type === "checkbox" ? checked : value,
    };
    setdoctorData(updatedData);
    localStorage.setItem("doctorData", JSON.stringify(updatedData));
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
        fetch("http://127.0.0.1:8000/api/clinician/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
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
            localStorage.removeItem("doctorData");
          })
          .catch((error) => {
            Swal.close();
            setNotificationProps({
              kind: "error",
              caption: "",
              title: "Registration failed",
              subtitle: "Registration failed. Please try again.",
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
  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <TextInput
              id="name"
              type="text"
              className="inputs"
              labelText="Name"
              onChange={handleChange}
              value={doctorData.name}
            />
            <Stack>
              {" "}
              <TextInput
                id="gender"
                type="text"
                className="inputs"
                labelText="Gender"
                onChange={handleChange}
                value={doctorData.gender}
              />
              <TextInput
                id="address"
                type="text"
                className="inputs"
                labelText="Address"
                onChange={handleChange}
                value={doctorData.address}
              />
            </Stack>
            <DatePicker datePickerType="single" dateFormat="Y-m-d">
              <DatePickerInput
                id="date_of_birth"
                labelText="Date of Birth"
                placeholder="MM/DD/YYYY"
                onChange={handleChange}
                value={doctorData.date_of_birth}
              />
            </DatePicker>
            <TextInput
              id="specialization"
              type="text"
              className="inputs"
              labelText="Specialization"
              onChange={handleChange}
              value={doctorData.specialization}
            />
            <TextInput
              id="email"
              type="text"
              className="inputs"
              labelText="Contact Information (email)"
              onChange={handleChange}
              value={doctorData.email}
            />
            <TextInput
              id="phone_number"
              type="text"
              className="inputs"
              labelText="Contact Information (Phone number)"
              onChange={handleChange}
              value={doctorData.phone_number}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextInput
              id="emergency_contact_name"
              type="text"
              className="inputs"
              labelText="Emergency Contact Name"
              onChange={handleChange}
              value={doctorData.emergency_contact_name}
            />
            <TextInput
              id="emergency_contact_relationship"
              type="text"
              className="inputs"
              labelText="Emergency Contact Relationship"
              onChange={handleChange}
              value={doctorData.emergency_contact_relationship}
            />
            <TextInput
              id="emergency_contact_phone"
              type="text"
              className="inputs"
              labelText="Emergency Contact Phone Number"
              onChange={handleChange}
              value={doctorData.emergency_contact_phone}
            />
            <TextInput
              id="emergency_contact_email"
              type="text"
              className="inputs"
              labelText="Emergency Contact Email"
              onChange={handleChange}
              value={doctorData.emergency_contact_email}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              id="medical_qualifications"
              type="text"
              className="inputs"
              labelText="Medical Qualifications"
              onChange={handleChange}
              value={doctorData.medical_qualifications}
            />
            <TextInput
              id="years_of_experience"
              type="text"
              className="inputs"
              labelText="Years of Experience"
              onChange={handleChange}
              value={doctorData.years_of_experience}
            />
            <TextInput
              id="current_practice_location"
              type="text"
              className="inputs"
              labelText="Current Practice Location"
              onChange={handleChange}
              value={doctorData.current_practice_location}
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              id="professional_associations"
              type="text"
              className="inputs"
              labelText="Professional Associations"
              onChange={handleChange}
              value={doctorData.professional_associations}
            />
            <TextInput
              id="research_interests"
              type="text"
              className="inputs"
              labelText="Research Interests"
              onChange={handleChange}
              value={doctorData.research_interests}
            />
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              id="insurance_provider"
              type="text"
              className="inputs"
              labelText="Insurance Provider"
              onChange={handleChange}
              value={doctorData.insurance_provider}
            />
            <TextInput
              id="policy_number"
              type="text"
              className="inputs"
              labelText="Policy Number"
              onChange={handleChange}
              value={doctorData.policy_number}
            />
            <TextInput
              id="group_number"
              type="text"
              className="inputs"
              labelText="Group Number"
              onChange={handleChange}
              value={doctorData.group_number}
            />
            <TextInput
              id="coverage_details"
              type="text"
              className="inputs"
              labelText="Coverage Details"
              onChange={handleChange}
              value={doctorData.coverage_details}
            />
          </>
        );
      case 5:
        return (
          <>
            <TextInput
              id="hospital_affiliation"
              type="text"
              className="inputs"
              labelText="Hospital Affiliation"
              onChange={handleChange}
              value={doctorData.hospital_affiliation}
            />
            <TextInput
              id="languages_spoken"
              type="text"
              className="inputs"
              labelText="Languages Spoken"
              onChange={handleChange}
              value={doctorData.languages_spoken}
            />
          </>
        );
      case 6:
        return (
          <>
            <PasswordInput
              id="password"
              labelText="Password"
              onChange={handleChange}
              value={doctorData.password}
            />
            <PasswordInput
              id="confirm_password"
              labelText="Confirm Password"
              // onChange={handleChange}
              // value={doctorData.confirm_password}
            />
            <Checkbox
              id="enable_2fa"
              labelText="Enable Two-Factor Authentication"
              onChange={handleChange}
              checked={doctorData.enable_2fa}
            />
          </>
        );
      default:
        return null;
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="doctor-reg">
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}{" "}
      <div className="reg-body">
        <Header>
          <section className="flex-left">
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
                  <Loading withOverlay={false} small /> Back
                </>
              ) : (
                <>
                  <BackBtn /> Back
                </>
              )}
            </Link>
          </section>
          <h4>Doctor Registration</h4>
        </Header>
        <section className="reg-form">
          <div className="svg-part"></div>
          <div className="cont">
            <h4 className="reg-title">Register Doctor Account</h4>
            <h4>Please fill in your details.</h4>
            <div className="my-form">
              {isSubmitting ? (
                <div className="signin-progress">
                  {/* SweetAlert will handle the progress notification */}
                </div>
              ) : (
                <Form
                  aria-label="Registration form"
                  className="form"
                  onSubmit={handleSubmit}
                >
                  {renderFormFields()}
                  <div className="flex-btns">
                    <Button
                      kind="secondary"
                      size="sm"
                      renderIcon={ArrowLeft}
                      className="some-class"
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
                        className="some-class"
                        type="button"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        kind="primary"
                        size="sm"
                        className="some-class"
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
          {/* <Footer /> */}
        </section>
      </div>
      <section className="reg-progress">
        <DoctorProgressSteps currentStep={currentStep} />
      </section>
    </div>
  );
}

export default DoctorRegistration;
