import React from "react";
import "./styles.scss";
import OnboardingHeader from "@/app/onboarding/internals/header";
import { Button, ClickableTile, Heading } from "@carbon/react";
import Link from "next/link";
import { ArrowLeft, Hospital, HospitalBed } from "@carbon/icons-react";
import Image from "next/image";
import OptionCard from './options-card/index';

function SignUp() {
  const optionList = [
    {
      id: 1,
      title: "Patient",
      description: "Personal Account",
      icon: <HospitalBed size={32} />,
      link:"../../welcome-to-medlink/auth/sign-up/patient"
    },
    {
      id: 2,
      title: "Clinician",
      description: "Clinician and care center account",
      icon: <Hospital size={32} />,
      link:"../../welcome-to-medlink/auth/sign-up/doctor"
    },
  ];

  return (
    <div>
      <OnboardingHeader>
        <div className="logo">
          <Image
            width={70}
            height={70}
            src="/logov2.svg"
            alt="logo"
            className="logo-image"
          />
        </div>
       <Link href='../../welcome-to-medlink'> <section className="back">
          <ArrowLeft size={32} /> Back
        </section></Link>
        <section className="log-in">
          <Heading className="log-in">
            Already have an Account?{" "}
            <Link className="link" href="../../welcome-to-medlink/auth/sign-in">
              Sign in
            </Link>
          </Heading>
        </section>
      </OnboardingHeader>
      <section className="sign-up-container">
        {/* <Image
          height={400}
          width={400}
          src="/img/img1.jpg"
          alt="sign-up-image"
        /> */}
        <section className="join-us">
          <Heading className="signup-title">Join Us</Heading>
          <Heading className="signup-description">
            We cater for clinicians and patients because we believe <br /> in providing
            access for all.
          </Heading>
          <Heading>Please select an option</Heading>
          <div className="sign-up-option">
            {optionList.map((option) => (
              <OptionCard
              href={option.link}
                key={option.id}
                icon={option.icon}
                description={option.description}
                title={option.title}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default SignUp;
