import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Ícone de coração preenchido
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Ícone de coração contornado
import { IconButton } from '@mui/material'; // Para o botão do ícone

function SimulatorCard({ simulatorId, title, description, imageUrl, onAccessSimulator, isFavorite, onToggleFavorite }) {
  return (
    <div className="simulator-card">
      <div className="simulator-card-header">
        <img src={imageUrl} alt={title} className="simulator-card-image" />
        <IconButton
          aria-label="adicionar aos favoritos"
          onClick={(e) => {
            e.stopPropagation(); // Evita que o clique no ícone abra o modal
            onToggleFavorite(simulatorId);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: isFavorite ? '#e74c3c' : '#bdc3c7', // Vermelho para favorito, cinza para não favorito
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              transform: 'scale(1.1)'
            },
            transition: 'transform 0.2s, background-color 0.2s',
            zIndex: 5, // Garante que o ícone esteja acima da imagem
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <div className="simulator-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="simulator-card-button" onClick={onAccessSimulator}>Acessar Simulador</button>
      </div>
    </div>
  );
}

export default SimulatorCard;
