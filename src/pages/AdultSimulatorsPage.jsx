import React, { useState } from 'react';
import SimulatorCard from '../components/SimulatorCard';
import Modal from '../components/Modal';
import './AdultSimulators.css';
import EuriborSimulator from '../components/simulators/EuriborSimulator';
import FinancialIndependence from '../components/simulators/FinancialIndependence';
import FirstMillion from '../components/simulators/FirstMillion';
import HousingLoan from '../components/simulators/HousingLoan';
import LifeTimeCost from '../components/simulators/LifeTimeCost';
import MaxHouseValue from '../components/simulators/MaxHouseValue';

function AdultSimulatorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSimulatorType, setSelectedSimulatorType] = useState(null); // Armazenar o tipo como string

  const simulators = [
    {
      id: 1,
      title: 'Simulador Euribor',
      description: 'Calcule o impacto da Euribor no seu crédito habitação.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/128/3487/3487141.png',
      type: 'EuriborSimulator' // Usar uma string para identificar o simulador
    },
    {
      id: 2,
      title: 'Simulador Independência Financeira',
      description: 'Descubra quanto tempo levará para alcançar a independência financeira.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/128/18234/18234121.png',
      type: 'FinancialIndependence'
    },
    {
      id: 3,
      title: 'Simulador Primeiro Milhão',
      description: 'Planeie a sua jornada para o primeiro milhão.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      type: 'FirstMillion'
    },
    {
      id: 4,
      title: 'Simulador de Crédito Habitação',
      description: 'Analise as condições do seu crédito habitação.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
      type: 'HousingLoan'
    },
    {
      id: 5,
      title: 'Simulador Custo de Vida',
      description: 'Calcule o custo total dos seus bens ao longo da vida útil.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      type: 'LifeTimeCost'
    },
    {
      id: 6,
      title: 'Simulador Valor Máximo da Casa',
      description: 'Determine o valor máximo que pode pagar por uma casa.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
      type: 'MaxHouseValue'
    },
  ];

  const getSimulatorComponent = (type) => {
    switch (type) {
      case 'EuriborSimulator': return <EuriborSimulator />;
      case 'FinancialIndependence': return <FinancialIndependence />;
      case 'FirstMillion': return <FirstMillion />;
      case 'HousingLoan': return <HousingLoan />;
      case 'LifeTimeCost': return <LifeTimeCost />;
      case 'MaxHouseValue': return <MaxHouseValue />;
      default: return null;
    }
  };

  const handleOpenModal = (simulatorType) => {
    setSelectedSimulatorType(simulatorType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSimulatorType(null);
  };

  return (
    <div className="adult-simulators-container">
      <h1>Simuladores para Adultos</h1>
      <p>Bem-vindo à área de simuladores. Aqui encontrará diversas ferramentas interativas.</p>
      <div className="simulators-grid">
        {simulators.map(simulator => (
          <SimulatorCard
            key={simulator.id}
            title={simulator.title}
            description={simulator.description}
            imageUrl={simulator.imageUrl}
            onAccessSimulator={() => handleOpenModal(simulator.type)} // Passar o tipo do simulador
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {getSimulatorComponent(selectedSimulatorType)}
      </Modal>
    </div>
  );
}

export default AdultSimulatorsPage;
