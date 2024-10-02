// src/components/Emoji.js
import React from 'react';

function Emoji({ src, alt }) {
  return (
    <img
      className="emoji"
      src={src}
      alt={alt}
    />
  );
}

export default Emoji;
