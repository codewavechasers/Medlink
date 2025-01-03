
  "use client";
import React, { useState, Suspense } from "react";
import PasswordReset from "./index";
import "./styles.scss";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
import OnboardingHeader from "@/app/onboarding/internals/header";
import { Heading, Loading } from "@carbon/react";
function Page() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Suspense fallback={<Loading/>}>
    <div>
      <div style={{ overflowX: "hidden" }}>
        <OnboardingHeader>
          <div className="logo-reset">
            <Image
              width={70}
              height={70}
              src="/logov2.svg"
              alt="logo"
              className="logo-image"
            />
            <Link href="../../../welcome-to-medlink/auth/sign-in">
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

          <section className="log-in-reset">
           <Heading>Password</Heading>
          </section>
        </OnboardingHeader>
        <section className="signin-container-reset">
          <PasswordReset />
        </section>
      </div>
    </div>
    </Suspense>
  );
};

export default Page;
