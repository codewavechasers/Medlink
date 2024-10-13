
  "use client"
import React, { useState } from "react";
import PasswordRequest from "./index";
import './styles.scss'
import OnboardingHeader from "@/app/onboarding/internals/header";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
import { Heading, Loading } from "@carbon/react";
function Page() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div style={{ overflowX: "hidden" }}>
        <OnboardingHeader>
          <div className="logo-request">
            <Image
              width={70}
              height={70}
              src="/logov2.svg"
              alt="logo"
              className="logo-image"
            />
            <Link href="../../../welcome-to-medlink/auth/sign-in">
              {" "}
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
              </section>
            </Link>
          </div>

          <section className="log-in-request">
           <Heading>Reset Link</Heading>
          </section>
        </OnboardingHeader>
        <section className="signin-container-request">
          <PasswordRequest />
        </section>
      </div>
    </div>
  );
};

export default Page;
