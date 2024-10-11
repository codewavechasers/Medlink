import React, { useState } from "react";
import "./styles.scss";
import { Heading } from "@carbon/react";
import CardModal from "@/app/home/help/CardModal";

function HelpCard({ icon, title, description, videoUrl }) {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleCardClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="help-card" onClick={handleCardClick}>
        <div className="icon-section">{icon}</div>
        <Heading className="title-section">{title}</Heading>
        <div className="description-section">
          <p>{description}</p>
        </div>
      </div>

      <CardModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        videoUrl={videoUrl}
      />
    </>
  );
}

export default HelpCard;
