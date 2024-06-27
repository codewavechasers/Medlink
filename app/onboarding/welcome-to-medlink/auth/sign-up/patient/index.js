"use client";
import React, { useState } from "react";
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
} from "@carbon/react";
import ProgressSteps from "../progress";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@carbon/icons-react";
import "./styles.scss";

function Patient() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // handle form submission
    alert("Form submitted!");
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <TextInput
              id="text-input-1"
              type="text"
              className="inputs"
              labelText="Enter your Full Name"
            />
            <Select
              className="inputs"
              id={`select-3`}
              labelText="Select your city"
              defaultValue="option-3"
            >
              <SelectItem value="option-1" text="Option 1" />
              <SelectItem value="Germany" text="Option 2" />
              <SelectItem value="option-3" text="Option 3" />
            </Select>
            <Select
              className="inputs"
              id={`select-3`}
              labelText="Select your Country"
              defaultValue="Kenya"
            >
              <SelectItem value="China" text="China" />
              <SelectItem value="Germany" text="Germany" />
              <SelectItem value="Brazil" text="Brazil" />
            </Select>
          </>
        );
      case 1:
        return (
          <>
            <TextInput
              id="text-input-2"
              type="email"
              className="inputs"
              labelText="Enter your Email"
            />
              <TextInput
              id="text-input-2"
              type="number"
              className="inputs"
              labelText="Enter your Phone Number"
            />
            <DatePicker
              datePickerType="single"
              onChange={function noRefCheck() {}}
              onClose={function noRefCheck() {}}
              onOpen={function noRefCheck() {}}
            >
              <DatePickerInput
                id="date-picker-single"
                labelText="Date of Birth"
                onChange={function noRefCheck() {}}
                onClose={function noRefCheck() {}}
                onOpen={function noRefCheck() {}}
                placeholder="mm/dd/yyyy"
              />
            </DatePicker>
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              id="text-input-4"
              type="text"
              className="inputs"
              labelText="Enter your Address"
            />
            <Select
              className="inputs"
              id={`select-4`}
              labelText="Select your Gender"
              defaultValue="option-1"
            >
              <SelectItem value="option-1" text="Male" />
              <SelectItem value="option-2" text="Female" />
              <SelectItem value="option-3" text="Other" />
            </Select>
            <TextInput
              id="text-input-6"
              type="text"
              className="inputs"
              labelText="Enter your Occupation"
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              id="text-input-6"
              type="text"
              className="inputs"
              labelText="Enter your Occupation"
            />
            <Select
              className="inputs"
              id={`select-4`}
              labelText="Select your Gender"
              defaultValue="option-1"
            >
              <SelectItem value="option-1" text="Male" />
              <SelectItem value="option-2" text="Female" />
              <SelectItem value="option-3" text="Other" />
            </Select>
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              id="text-input-7"
              type="text"
              className="inputs"
              labelText="Enter your Nationality"
            />
            <TextInput
              id="text-input-8"
              type="text"
              className="inputs"
              labelText="Enter your Age"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="patient-reg">
      <div className="reg-body">
        <Header>
          <section className="flex-left">
            {" "}
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
            >
              <BackBtn /> Back
            </Link>
          </section>
          <h4>Personal Information</h4>
        </Header>
        <section className="reg-form">
          <div className="cont">
          <h4 className="reg-title">Register Patient Account</h4>
          <h4>Please fill in your details.</h4>
          <div className="my-form">
            <Form aria-label="Registration form" className="form">
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
                {currentStep < totalSteps ? (
                  <Button
                    kind="secondary"
                    size="sm"
                    renderIcon={ArrowRight}
                    className="some-class"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    kind="primary"
                    size="sm"
                    className="some-class"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
                <Button kind="primary" size="sm" className="some-class">
                  Continue with Google
                </Button>
              </div>
            </Form>
          </div></div>
          <Footer />
        </section>
      </div>
      <section className="reg-progress">
        <ProgressSteps currentStep={currentStep} />
      </section>
    </div>
  );
}

export default Patient;
