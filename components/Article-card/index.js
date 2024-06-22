import React from "react";
import "./styles.scss";
import { Heading } from "@carbon/react";
function Article({ icon, title, description }) {
  return (
    <div className="article-card">
      <div className="icon-section">{icon}</div>
      <div className="flex-info">
        <Heading className="title-section">{title}</Heading>
        <div className="description-section">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Article;
