import React from "react";
import "./styles.scss";
import Header from "../internals/header";
import { Button, Heading } from "@carbon/react";
import { PillsSubtract, User } from "@carbon/icons-react";
function Welcome() {
  return (
    <div className="welcome-page">
      <Header>
        <div className="logo">
          <img src="../../../logov2.svg" alt="logo" className="logo-image" />
        </div>
        <section className="left-header">
          <div className="navigations">
            <ul>
              <li>About</li>
              <li>Features</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="onboarding-buttons">
            <Button kind="secondary"> Sign in</Button>
            <Button kind="primary"> Sign up</Button>
          </div>
        </section>
      </Header>
      <section className="welcome">
       
        <div className="welcome-image">
        <div className="welcome-text">
          <Heading className="head-text">
            The Best things in life are free
          </Heading>
          <p className="descriptive-text">Get access to healthcare for you</p>
          <div className="onboarding-buttons">
            <Button kind="secondary" size="sm">
              Create Account
            </Button>
            <Button kind="ghost" size="sm">
              See offers
            </Button>
          </div>
        </div>
          <img src="../../../medlink.png" alt="welcome image" />
        </div>
      </section>
      <section className="about">
        <div className="content-header">
          <Heading className="heading">About Us</Heading>
          <div className="flex-icons">
            <Heading className="heading">Medlink Care Hub</Heading>
            <div className="about-icons">
              <User className="icon" size={32} />
              <PillsSubtract className="icon" size={32} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
