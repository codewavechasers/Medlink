import React from "react";
import "./styles.scss";
import { Heading } from "@carbon/react";
import Link from "next/link";
function Article({ icon, title, description, link }) {
  return (
    <div className="article-card">
      <Link target="_blank" href={link}>
        <div className="icon-section">{icon}</div>
        <div className="flex-info">
          <Heading className="title-section">{title}</Heading>
          <div className="description-section">
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Article;
