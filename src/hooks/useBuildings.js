import { useState } from 'react';

export const useBuildings = () => {
  const [buildings, setBuildings] = useState([]);

  const buildFactory = () => {
    const newBuilding = {
      id: Date.now(),
      name: `Fabrika #${buildings.length + 1}`,
      productivity: 1,
      level: 1,
      condition: 100,
      isActive: true,
      buildDate: new Date().toLocaleDateString()
    };
    setBuildings(prev => [...prev, newBuilding]);
  };

  const demolishBuilding = (buildingId) => {
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
  };

  return { buildings, buildFactory, demolishBuilding };
}; 