import React from "react";
import "./styles.scss";
import OnboardingHeader from "@/app/onboarding/internals/header";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
function SignUp() {
  return (
    <div>
      <OnboardingHeader>
        <div className="logo">
          <Image
            width={70}
            height={70}
            src="../../../../../logov2.svg"
            alt="logo"
            className="logo-image"
          />
        </div>
        <section className="back">
          <ArrowLeft size={32} /> Back
        </section>
        <section className="log-in">
          <h4 className="log-in">
            Already have an Account?
            <Link className="link" href="#">
              Sign in
            </Link>
          </h4>
        </section>
      </OnboardingHeader>
      <section className="sign-up-container">
        <Image
        height={400}
          width={400}
          href="../../../../../auth-img/img1.jpg"
          alt="sign-up-image"
        />
      </section>
    </div>
  );
}

export default SignUp;
