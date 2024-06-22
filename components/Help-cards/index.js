import React from "react";
import "./styles.scss";
import { Heading } from "@carbon/react";
function HelpCard({icon, title, description}) {
  return (
    <div className="help-card">
      <div className="icon-section">{icon}</div>
        <Heading className="title-section">{title}</Heading>
      <div className="description-section">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default HelpCard;
