// src/components/FloatingCard.js
import React from "react";
import Emoji from "../Emoji";  // Adjust the path as necessary
import "./styles.scss";

function FloatingCard({ emojiSrc, emojiAlt }) {
  return (
    <div className="floating-card">
      <Emoji src={emojiSrc} alt={emojiAlt} />
    </div>
  );
}

export default FloatingCard;
