import { Heading } from "@carbon/react";
import React from "react";
import "./styles.scss";
import { ModelTuned } from "@carbon/icons-react";
function Features() {
  return (
    <section className="key-features">
      <Heading className="title-feature">Key Features in a Glance</Heading>
      <div className="features">
        <div className="feature-container">
          <div className="feature-icon">
            <ModelTuned className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Quote Generator</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Effortlessly produce a variety of quotes in no time</p>
            </div>
          </section>
        </div>
        <div className="feature-container">
          <div className="feature-icon">
            <ModelTuned className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Quote Generator</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Effortlessly produce a variety of quotes in no time</p>
            </div>
          </section>
        </div>
        <div className="feature-container">
          <div className="feature-icon">
            <ModelTuned className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Quote Generator</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Effortlessly produce a variety of quotes in no time</p>
            </div>
          </section>
        </div>
        <div className="feature-container">
          <div className="feature-icon">
            <ModelTuned className="icon" size={64} />
          </div>
          <section className="feature-description">
            <div className="feature-title">
              <Heading>Quote Generator</Heading>
            </div>
            <div className="feature-descriptive">
              <p>Effortlessly produce a variety of quotes in no time</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Features;
