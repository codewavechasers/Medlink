import { Heading } from "@carbon/react";
import React from "react";
import "./styles.scss";
import { Chat, HealthCross, ModelTuned, Calendar } from "@carbon/icons-react";
function Features() {
  return (
    <section className="key-features">
      <Heading className="title-feature">Key Features in a Glance</Heading>
      <div className="features">
        <div className="feature-container">
          <div className="feature-icon">
            <Chat className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Intelligent Chatbot</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Provides instant answers and personalized assistance</p>
            </div>
          </section>
        </div>
        <div className="feature-container">
          <div className="feature-icon">
            <HealthCross className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Health Information</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Access a wide range of medical information and advice</p>
            </div>
          </section>
        </div>
        <div className="feature-container">
          <div className="feature-icon">
            <Calendar className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Appointment Scheduling</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Seamlessly book appointments with healthcare professionals</p>
            </div>
          </section>
        </div>
        <div className="feature-container">
          <div className="feature-icon">
            <ModelTuned className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Symptom Checker</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Analyze symptoms to provide a potential diagnosis</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Features;
