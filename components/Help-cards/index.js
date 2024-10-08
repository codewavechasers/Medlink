import React from "react";
import "./styles.scss";
import { Heading } from "@carbon/react";
import Link from "next/link";
function HelpCard({ icon, title, link, description }) {
  return (
    <div className="help-card">
      <Link target="_blank" href={link}>
        <div className="icon-section">{icon}</div>
        <Heading className="title-section">{title}</Heading>
        <div className="description-section">
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default HelpCard;
