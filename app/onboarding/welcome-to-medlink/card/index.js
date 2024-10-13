import React from 'react';
import './Card.css'; 

const Card = ({ title, description, icon }) => {
  return (
    <div className="card">
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
