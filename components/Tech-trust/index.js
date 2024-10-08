import { Heading } from "@carbon/react";
import React from "react";
import "./styles.scss";

function TechTrust() {
  return (
    <section className="tech-trust">
      <Heading className="trust-title">Trusted By growing Tech Companies</Heading>
      <div className="trust-containers">
  <div className="trust-container">
    <Heading className="tech-icon">IBM</Heading>
    <div className="tech-description">
      <p>
        WatsonX has revolutionized our business operations, making customer interactions more engaging and personalized, leading to a positive impact on our overall customer experience.
      </p>
    </div>
    <div className="ceo-info">
      <div className="ceo-img"><img className="img-ceo" src="../../ceo/IBM-ceo.jpg" /></div>
      <div className="ceo-name">
        <Heading className="name">Arvind Krishna</Heading>
        <p>CEO, IBM</p>
      </div>
    </div>
  </div>
  <div className="trust-container">
    <Heading className="tech-icon">Bank of America</Heading>
    <div className="tech-description">
      <p>
        WatsonX has significantly improved our customer service by providing personalized and efficient responses, enhancing our customer satisfaction.
      </p>
    </div>
    <div className="ceo-info">
      <div className="ceo-img"><img className="img-ceo" src="../../ceo/BOC-ceo.jpeg" /></div>
      <div className="ceo-name">
        <Heading className="name">Brian Moynihan</Heading>
        <p>CEO, Bank of America</p>
      </div>
    </div>
  </div>
  <div className="trust-container">
    <Heading className="tech-icon">KPMG</Heading>
    <div className="tech-description">
      <p>
        WatsonX has enabled us to streamline our processes and deliver more accurate and timely insights to our clients, transforming the way we do business.
      </p>
    </div>
    <div className="ceo-info">
      <div className="ceo-img"><img className="img-ceo" src="../../ceo/kmpg-ceo.jpeg" /></div>
      <div className="ceo-name">
        <Heading className="name">Bill Thomas</Heading>
        <p>CEO, KPMG</p>
      </div>
    </div>
  </div>
  <div className="trust-container">
    <Heading className="tech-icon">Samsung</Heading>
    <div className="tech-description">
      <p>
        With WatsonX, our customer engagement has become more interactive and personalized, driving higher satisfaction and loyalty among our customers.
      </p>
    </div>
    <div className="ceo-info">
      <div className="ceo-img"><img className="img-ceo" src="../../ceo/samsung-ceo.jpeg" /></div>
      <div className="ceo-name">
        <Heading className="name">Kim Ki Nam</Heading>
        <p>CEO, Samsung Electronics</p>
      </div>
    </div>
  </div>
</div>

    </section>
  );
}

export default TechTrust;
