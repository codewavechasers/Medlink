import { ArrowLeft } from '@carbon/icons-react';
import React from 'react';

function BackButton({ onClick }) {
  return (
    <div
      style={{
        background: "var(--primary-color)",
        padding: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
      }}
      onClick={onClick} // Call onClick prop when clicked
    >
      <ArrowLeft />
    </div>
  );
}

export default BackButton;
