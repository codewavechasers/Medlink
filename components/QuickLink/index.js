import React from "react";
import { ClickableTile } from "@carbon/react";
import "./styles.scss";
import { Heading } from "@carbon/react";

function QuickLink({ icon, title, description, link }) {
  return (
    <ClickableTile href={link} className="quick-link">
      <div className="icon-section">{icon}</div>
      <Heading className="title-section">{title}</Heading>
      <div className="description-section">
        <p>{description}</p>
      </div>
    </ClickableTile>
  );
}

export default QuickLink;
