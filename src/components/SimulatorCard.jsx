import React from 'react';

function SimulatorCard({ title, description, imageUrl, onAccessSimulator }) {
  return (
    <div className="simulator-card">
      <img src={imageUrl} alt={title} className="simulator-card-image" />
      <div className="simulator-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="simulator-card-button" onClick={onAccessSimulator}>Acessar Simulador</button>
      </div>
    </div>
  );
}

export default SimulatorCard;
