"use client";
import React, {useState} from "react";
import Verify from "./index";
import "./styles.scss";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
import "./styles.scss";
import OnboardingHeader from "@/app/onboarding/internals/header";
import { Button, Loading } from "@carbon/react";
function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSigninLoading, setSigninLoading] = useState(false);

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

          <section className="log-in">
            <h4 className="log-in">
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
        <section className="signin-container">
          <Verify />
        </section>
      </div>
    </div>
  );
}

export default Page;
