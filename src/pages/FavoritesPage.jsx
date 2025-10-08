import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SimulatorCard from '../components/SimulatorCard';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

// Importe todos os simuladores para obter os detalhes completos
import EuriborSimulator from '../components/simulators/EuriborSimulator';
import FinancialIndependence from '../components/simulators/FinancialIndependence';
import FirstMillion from '../components/simulators/FirstMillion';
import HousingLoan from '../components/simulators/HousingLoan';
import LifeTimeCost from '../components/simulators/LifeTimeCost';
import MaxHouseValue from '../components/simulators/MaxHouseValue';

function FavoritesPage() {
  const { currentUser, loading, userFavorites, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  // Lista completa de simuladores (reutilizada da AdultSimulatorsPage)
  const allSimulators = [
    {
      id: 'euribor',
      title: 'Simulador Euribor',
      description: 'Calcule o impacto da Euribor no seu crédito habitação.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/128/3487/3487141.png',
      type: 'EuriborSimulator'
    },
    {
      id: 'financial-independence',
      title: 'Simulador Independência Financeira',
      description: 'Descubra quanto tempo levará para alcançar a independência financeira.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/128/18234/18234121.png',
      type: 'FinancialIndependence'
    },
    {
      id: 'first-million',
      title: 'Simulador Primeiro Milhão',
      description: 'Planeie a sua jornada para o primeiro milhão.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      type: 'FirstMillion'
    },
    {
      id: 'housing-loan',
      title: 'Simulador de Crédito Habitação',
      description: 'Analise as condições do seu crédito habitação.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
      type: 'HousingLoan'
    },
    {
      id: 'lifetime-cost',
      title: 'Simulador Custo de Vida',
      description: 'Calcule o custo total dos seus bens ao longo da vida útil.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      type: 'LifeTimeCost'
    },
    {
      id: 'max-house-value',
      title: 'Simulador Valor Máximo da Casa',
      description: 'Determine o valor máximo que pode pagar por uma casa.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
      type: 'MaxHouseValue'
    },
  ];

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login'); // Redireciona se não estiver logado
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return <div className="favorites-loading">A carregar favoritos...</div>;
  }

  if (!currentUser) {
    return null; // Já redirecionado pelo useEffect
  }

  const favoriteSimulators = allSimulators.filter(simulator => userFavorites.includes(simulator.id));

  const handleAccessSimulator = (simulatorType) => {
    // Implementar a lógica para abrir o modal do simulador aqui, se desejar.
    // Por enquanto, apenas para exemplo, podemos navegar para a página de simuladores e abrir o modal lá.
    // ou passar esta lógica para a FavoritesPage também, incluindo o Modal component.
    // Para simplificar, neste momento não faremos nada, mas podemos expandir.
    alert(`Acessar simulador: ${simulatorType}`);
  };

  return (
    <div className="favorites-container">
      <h1>Meus Simuladores Favoritos</h1>
      {favoriteSimulators.length === 0 ? (
        <p>Você ainda não adicionou nenhum simulador aos favoritos.</p>
      ) : (
        <div className="simulators-grid">
          {favoriteSimulators.map(simulator => (
            <SimulatorCard
              key={simulator.id}
              simulatorId={simulator.id}
              title={simulator.title}
              description={simulator.description}
              imageUrl={simulator.imageUrl}
              onAccessSimulator={() => handleAccessSimulator(simulator.type)}
              isFavorite={userFavorites.includes(simulator.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
