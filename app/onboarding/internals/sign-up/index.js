"use client";
import { React, useState } from "react";
import "./styles.scss";
import OnboardingHeader from "@/app/onboarding/internals/header";
import Link from "next/link";
import { ArrowLeft, Hospital, HospitalBed } from "@carbon/icons-react";
import Image from "next/image";
import OptionCard from "./options-card/index";
import { Button, Heading, Loading } from "@carbon/react";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSigninLoading, setSigninLoading] = useState(false);
  const optionList = [
    {
      id: 1,
      title: "Patient",
      description: "Personal Account",
      icon: <HospitalBed size={32} />,
      link: "../../welcome-to-medlink/auth/sign-up/patient",
      disabled: false,
    },
    {
      id: 2,
      title: "Clinician",
      description: "Clinician and care center account",
      icon: <Hospital size={32} />,
      link: "../../welcome-to-medlink/auth/sign-up/doctor",
      disabled: true,
    },
  ];

  return (
    < >
      <OnboardingHeader>
        <div className="logo-option">
          <Image
            width={70}
            height={70}
            src="/logov2.svg"
            alt="logo"
            className="logo-image"
          />
          <Link href="../../welcome-to-medlink">
            {" "}
            <section className="back">
              <section className="back" onClick={() => setIsLoading(true)}>
                {isLoading ? (
                  <>
                    <Loading small withOverlay={false} />
                    <ArrowLeft size={32} /> 

                  </>
                ) : (
                  <>
                    <ArrowLeft size={32} /> 
                  </>
                )}
              </section>{" "}
            </section>
          </Link>
        </div>

        <section className="log-in-option">
          <h4 className="log-in-option">
            <Link
              className="link"
              href="../../welcome-to-medlink/auth/sign-in"
              onClick={() => setSigninLoading(true)}
            >
              {isSigninLoading ? (
                <div  style={{display:'flex', alignItems:'center', justifyContent:'center', width:'auto', gap:'20px'}}>
                  <Loading
                    small
                    withOverlay={false}
                    style={{ marginRight: "8px" }}
                  />
                  Signing in...
                </div>
              ) : (
                <Button kind="ghost"> Sign in</Button>
              )}
            </Link>
          </h4>
        </section>
      </OnboardingHeader>
      <section className="sign-up-container-options">
        <div className="form-part-options">
          <section className="join-us">
            <h4 className="signup-title">
              Join Us today and explore features made for you
            </h4>
            <h4 className="signup-description">
              We cater for clinicians and patients because we believe <br /> in
              providing access for all.
            </h4>
            <h4>Please select an option</h4>
            <div className="sign-up-option">
              {optionList.map((option) => (
                <OptionCard
                  href={option.link}
                  key={option.id}
                  icon={option.icon}
                  description={option.description}
                  title={option.title}
                  disabled={option.disabled}
                />
              ))}
            </div>
          </section>
        </div>
        <div className="svg-part-options" ></div>
      </section>
    </>
  );
}

export default SignUp;
