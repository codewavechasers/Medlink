"use client"
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
} from "@carbon/react";
import Head from "next/head";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import {
  Search,
  Notification,
  Switcher as SwitcherIcon,
} from "@carbon/icons-react";
// const Step = Steps.Step;

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
  const router = useRouter();

  const handleReturn = () => {
    setOpen(false);
  };

  const handleSkip = () => {
    router.push("/onboarding/welcome-to-medlink/auth/sign-up");
  };

  return (
    <Modal
      modalHeading="Explore Features - You can swipe"
      modalLabel="Medlink v 0.1.0"
      primaryButtonText="Skip"
      secondaryButtonText="Return"
      open={open}
      onRequestSubmit={handleSkip}
      onSecondarySubmit={handleReturn}
      onRequestClose={handleReturn}
      className="feature-modal"
    >
      <Carousel showThumbs={false} className="carousel">
        <div className="feature">
          <h3>Register and Schedule Appointments</h3>
          <p>Seamlessly book virtual or physical appointments.</p>
          <img src="../../../auth-img/img1.jpg" />
        </div>
        <div className="feature">
          <h3>Connect with Doctors</h3>
          <p>Experience real-time consultations.</p>
          <img src="../../../auth-img/img1.jpg" />
        </div>
        <div className="feature">
          <h3>Manage Prescriptions and Reminders</h3>
          <p>Set reminders for your medications.</p>
          <img src="../../../auth-img/img1.jpg" />
        </div>
        <div className="feature">
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "ink-jet",
            }}
          >
            Welcome to Medlink
          </h3>
          <p>Your Virtual Medical Clinic!</p>
          <img className="feature-img" src="../../../logov2.svg" />
        </div>
      </Carousel>
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
          <Header className="medlink-header"
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
            <HeaderName href="#" prefix="Your virtual home clinic assistant">
            </HeaderName>
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
            <div className="tc" type="secondary">
              <p className="p-tags">Your Health, Simplified</p>
              <p className="mark p-tags">
                Bridging the Gap Between Patients and Doctors Virtually
              </p>
            </div>
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
                    "Explore our Features"
                  )}
                </Button>
              )}
            >
              {({ open, setOpen }) => (
                <FeaturesModal open={open} setOpen={setOpen} />
              )}
            </ModalStateManager>
          </div>

          <ProgressIndicator
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
          </ProgressIndicator>

          <div className="index-footer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
        </div>
      </div>
    </div>
  );
}

export default Welcome;
