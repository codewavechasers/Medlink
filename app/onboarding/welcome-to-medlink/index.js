import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import "./styles.sass"; 
import "./styles.scss";
import { Button, Modal, TextInput, Select, SelectItem } from "@carbon/react";
import Link from "next/link";
import Head from "next/head";
import { Space, PageHeader, Typography, Steps } from "@arco-design/web-react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Step = Steps.Step;

const ModalStateManager = ({ renderLauncher: LauncherContent, children: ModalContent }) => {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && ModalContent && ReactDOM.createPortal(<ModalContent open={open} setOpen={setOpen} />, document.body)}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

const FeaturesModal = ({ open, setOpen }) => (
  <Modal
    modalHeading="Explore Features"
    modalLabel="Medlink"
    primaryButtonText="Close"
    secondaryButtonText=""
    open={open}
    onRequestClose={() => setOpen(false)}
  >
    <Carousel showThumbs={false}>
      <div>
        <h3>Register and Schedule Appointments</h3>
        <p>Seamlessly book virtual or physical appointments.</p>
      </div>
      <div>
        <h3>Connect with Doctors</h3>
        <p>Experience real-time consultations.</p>
      </div>
      <div>
        <h3>Manage Prescriptions and Reminders</h3>
        <p>Set reminders for your medications.</p>
      </div>
    </Carousel>
  </Modal>
);

function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-body">
        <Head>
          <title>Medlink</title>
          <meta name="description" content="Virtual Medical Clinic" />
          <link rel="icon" href="/favicon.ico" />
          <style>{"body { overflow: auto !important; }"}</style>
        </Head>
        <div className="index-container">
          <PageHeader
            style={{
              background: "var(--color-bg-1)",
              position: "sticky",
              top: 0,
              boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
              zIndex: 2,
              fontWeight: "bold",
            }}
            title="Medlink"
            subTitle="Your Virtual Medical Clinic"
            extra={
              <Space>
                <section className="left-header">
                  <div className="navigations">
                    <ul>
                      <li>About</li>
                      <li>Features</li>
                      <li>Blog</li>
                    </ul>
                  </div>
                  <div className="onboarding-buttons">
                    <Link href="../../../onboarding/welcome-to-medlink/auth/sign-in">
                      <Button size="sm" kind="secondary">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="../../../onboarding/welcome-to-medlink/auth/sign-up">
                      <Button size="sm" kind="primary">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </section>
              </Space>
            }
          />
          <div className="index-bg">
            <Typography.Title className="tc" type="secondary">
              <p>Your Health, Simplified</p>
              <p className="mark">
                Bridging the Gap Between Patients and Doctors Virtually
              </p>
            </Typography.Title>
            <ModalStateManager
              renderLauncher={({ setOpen }) => (
                <Button
                  kind="primary"
                  size="sm"
                  className="start-button"
                  onClick={() => setOpen(true)}
                >
                  Explore our Features
                </Button>
              )}
            >
              {({ open, setOpen }) => (
                <FeaturesModal open={open} setOpen={setOpen} />
              )}
            </ModalStateManager>
          </div>

          <div className="index-steps">
            <Steps
              labelPlacement="vertical"
              current={5}
              style={{
                maxWidth: "1200px",
                margin: "100px auto",
              }}
            >
              <Step
                title="Register and Schedule Appointments"
                description="Seamlessly book virtual or physical appointments"
              />
              <Step
                title="Connect with Doctors"
                description="Experience real-time consultations"
              />
              <Step
                title="Manage Prescriptions and Reminders"
                description="Set reminders for your medications"
              />
            </Steps>
          </div>

          <div className="index-footer">
            <div>
              <strong>Medlink</strong> | Your Virtual Medical Clinic
            </div>
            <Link href="/applications">
              <Button type="text" kind="tertiary" size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
