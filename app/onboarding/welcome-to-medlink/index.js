"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.sass";
import "./styles.scss";
import {
  Button,
  Modal,
  Loading,
  ProgressIndicator,
  ProgressStep,
  ContentSwitcher,
  Switch,
} from "@carbon/react";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/navigation";
import {
  Alarm,
  ArrowRight,
  Calendar,
  IbmTelehealth,
} from "@carbon/icons-react";
import { Header, HeaderName } from "@carbon/react";
import Link from "next/link";
import Card from "./card";
const useLoadingNavigation = (path) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(path);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return [isLoading, handleClick];
};

const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient &&
        ModalContent &&
        ReactDOM.createPortal(
          <ModalContent open={open} setOpen={setOpen} />,
          document.body
        )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

const FeaturesModal = ({ open, setOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const handleReturn = () => {
    setOpen(false);
  };

  const handleSkip = () => {
    router.push("/onboarding/welcome-to-medlink/auth/sign-up");
  };
  const switchContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <>
            <h3>Register and Schedule Appointments</h3>
            <p>Seamlessly book virtual or physical appointments.</p>
            <video controls muted loop autoPlay src="/videos/appointment.mp4" />
          </>
        );
      case 1:
        return (
          <>
            <h3>Connect with Watson</h3>
            <p>Experience real-time consultations.</p>
            <video controls muted loop autoPlay src="/videos/watsonx.mp4" />
          </>
        );
      case 2:
        return (
          <>
            <h3>Manage Prescriptions and Reminders</h3>
            <p>Set reminders for your medications.</p>
            <video controls muted loop autoPlay src="/videos/timeline.mp4" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      modalHeading="Explore Features"
      modalLabel="Medlink v 0.1.0"
      primaryButtonText="Skip"
      secondaryButtonText="Return"
      open={open}
      onRequestSubmit={handleSkip}
      onSecondarySubmit={handleReturn}
      onRequestClose={handleReturn}
      className="feature-modal"
    >
      <ContentSwitcher
        onChange={(e) => setSelectedIndex(e.index)}
        className="feature-switcher"
      >
        <Switch name="one" text="Appointments" />
        <Switch name="two" text="Connecting" />
        <Switch name="three" text="Reminders" />
      </ContentSwitcher>
      <div className="feature-content">{switchContent()}</div>
    </Modal>
  );
};

function Welcome() {
  const [isLoadingSignUp, handleSignUpClick] = useLoadingNavigation(
    "/onboarding/welcome-to-medlink/auth/sign-up"
  );
  const [isLoadingSignIn, handleSignInClick] = useLoadingNavigation(
    "/onboarding/welcome-to-medlink/auth/sign-in"
  );
  const [isLoadingExplore, setIsLoadingExplore] = useState(false);
  const [isLoadingGetStarted, handleGetStartedClick] = useLoadingNavigation(
    "/onboarding/welcome-to-medlink/auth/sign-up"
  );

  const handleExploreClick = () => {
    setIsLoadingExplore(true);
    setTimeout(() => {
      setIsLoadingExplore(false);
    }, 2000);
  };

  const CardDetails = [
    {
      title: "Appointments",
      description:
        "Easily schedule your medical appointments with professionals and get reminders to stay on top of your health.",
      icon: <Calendar />,
    },
    {
      title: "Set Reminders",
      description:
        "Create reminders for medications, checkups, or follow-ups to ensure you never miss important tasks.",
      icon: <Alarm />,
    },
    {
      title: "Consultations",
      description:
        "Connect with medical experts for personalized consultations, advice, and answers to your health concerns.",
      icon: <IbmTelehealth />,
    },
  ];

  return (
    <div className="welcome-page">
      <div className="welcome-body">
        <Head>
          <title>Medlink v 0.1.0</title>
          <meta name="description" content="Virtual Medical Clinic" />
          <link rel="icon" href="/favicon.ico" />
          <style>{"body { overflow: auto !important; }"}</style>
        </Head>
        <div className="index-container">
          <Header
            className="medlink-header"
            aria-label="Medlink Platform"
            style={{ position: "sticky", top: 0, zIndex: 2, height: "auto" }}
          >
            <div className="logo-sec">
              <a href="#" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="../../../logov2.svg"
                  alt="Medlink Logo"
                  style={{ height: "70px" }}
                />
              </a>
              <HeaderName
                href="#"
                prefix="Your virtual home clinic assistant"
              ></HeaderName>
            </div>

            <div className="btn-sec">
              <Button
                size="sm"
                kind="secondary"
                onClick={handleSignInClick}
                disabled={isLoadingSignIn}
                style={{ marginLeft: "1rem" }}
              >
                {isLoadingSignIn ? (
                  <>
                    <Loading small={true} withOverlay={false} />
                    <span style={{ marginLeft: "8px" }}>Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <Button
                size="sm"
                kind="primary"
                onClick={handleSignUpClick}
                disabled={isLoadingSignUp}
                style={{ marginLeft: "1rem" }}
              >
                {isLoadingSignUp ? (
                  <>
                    <Loading small={true} withOverlay={false} />
                    <span style={{ marginLeft: "8px" }}>Signing up...</span>
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </Header>
          <div className="index-bg">
            <div className="bg-side"></div>
            <div className="text-side">
            <div
              className="tc"
              type="secondary"
              style={{ marginBottom: "30px !important" }}
            >
              <p className="p-tags">Your Health, Simplified</p>
              <p
                className="mark p-tags"
                style={{ color: "var(--primary-color" }}
              >
                Bridging the Gap Between Patients and Doctors <br></br>Virtually
              </p>
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Link href={"/onboarding/welcome-to-medlink/auth/sign-up"}>
                <Button kind="secondary" size="sm">
                  Get Started
                </Button>
              </Link>
              <ModalStateManager
                renderLauncher={({ setOpen }) => (
                  <Button
                    kind="primary"
                    size="sm"
                    className="start-button"
                    onClick={() => {
                      handleExploreClick();
                      setOpen(true);
                    }}
                  >
                    {isLoadingExplore ? (
                      <>
                        <Loading
                          small={true}
                          className={"some-class"}
                          withOverlay={false}
                        />
                        <span style={{ marginLeft: "8px" }}>Loading...</span>
                      </>
                    ) : (
                      "our Features"
                    )}
                  </Button>
                )}
              >
                {({ open, setOpen }) => (
                  <FeaturesModal open={open} setOpen={setOpen} />
                )}
              </ModalStateManager>
            </div>
          </div></div>

          {/* <ProgressIndicator
            spaceEqually
            className="index-steps"
            style={{
              height: "400px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProgressStep
              complete
              label="Appointments"
              description="Seamlessly book virtual or physical appointments"
            />
            <ProgressStep
              complete
              label="Consultations"
              description="Experience real-time consultations"
            />
            <ProgressStep
              complete
              label="Reminders"
              description="Set reminders for your medications"
            />
          </ProgressIndicator> */}
          <div
            className="index-steps"
            style={{ display: "flex", gap: "20px", margin: "10px" }}
          >
            {CardDetails.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>
          {/* start */}
          <div className="index-footer">
            <div className="my-footer">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontSize: "1.5em",
                    marginBottom: "50px",
                  }}
                >
                  <strong>Medlink</strong>
                  <div> | Your Virtual Medical Clinic</div>
                </div>
                <Button
                  type="text"
                  kind="secondary"
                  renderIcon={ArrowRight}
                  size="sm"
                  onClick={handleGetStartedClick}
                  disabled={isLoadingGetStarted}
                >
                  {isLoadingGetStarted ? (
                    <>
                      <Loading
                        small={true}
                        className={"some-class"}
                        withOverlay={false}
                      />
                      <span style={{ marginLeft: "8px" }}>Loading...</span>
                    </>
                  ) : (
                    "Get started free"
                  )}
                </Button>
              </div>
              <div className="footer-container">
                <div className="footer-column">
                  <h4 className="footer-headers">Medlink</h4>
                  <ul>
                    <li>
                      <a href="/onboarding/welcome-to-medlink/auth/sign-up">
                        Sign Up
                      </a>
                    </li>
                    <li>
                      <a href="/onboarding/welcome-to-medlink/auth/sign-in">
                        SIgn in
                      </a>
                    </li>
                    <li>
                      <a href="/">features</a>
                    </li>
                  </ul>
                </div>

                <div className="footer-column">
                  <h4 className="footer-headers">Support</h4>
                  <ul>
                    <li>
                      <a href="/home">FAQ</a>
                    </li>

                    <li>
                      <a href="/home">Help Center</a>
                    </li>
                  </ul>
                </div>

                <div className="footer-column">
                  <h4 className="footer-headers">Social</h4>
                  <ul>
                    <li>
                      <a href="https://twitter.com">Twitter</a>
                    </li>
                    <li>
                      <a href="https://facebook.com">Facebook</a>
                    </li>
                    <li>
                      <a href="https://linkedin.com">LinkedIn</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Medlink. All Rights Reserved.</p>
            </div>
          </div>

          {/* end */}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
