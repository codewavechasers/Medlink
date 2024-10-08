
  "use client"
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
import OnboardingHeader from "@/app/onboarding/internals/header";
import { Heading, Loading } from "@carbon/react";
import "./styles.scss";

// Dynamically import TwoFactorAuth to ensure client-side rendering
const TwoFactorAuth = dynamic(() => import("./index"), {
  ssr: false, // This ensures that it will only be rendered on the client side
});

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div>
      <div style={{ overflowX: "hidden" }}>
        <OnboardingHeader>
          <div className="logo">
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

          <section className="log-in">
            <Heading>2FA Verification</Heading>
          </section>
        </OnboardingHeader>
        
        {/* Wrap TwoFactorAuth in Suspense to handle client-side rendering */}
        <section className="signin-container">
          <Suspense fallback={<div>Loading 2FA...</div>}>
            <TwoFactorAuth />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default Page;
