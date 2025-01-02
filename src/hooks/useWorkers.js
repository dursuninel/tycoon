import { useState } from 'react';

export const useWorkers = () => {
  const [workers, setWorkers] = useState([]);

  const hireWorker = () => {
    const newWorker = {
      id: Date.now(),
      name: `İşçi #${workers.length + 1}`,
      avatar: '👷',
      productivity: 0.8,
      level: 1,
      isActive: true,
      hireDate: new Date().toLocaleDateString()
    };
    setWorkers(prev => [...prev, newWorker]);
  };

  const fireWorker = (workerId) => {
    setWorkers(prev => prev.filter(w => w.id !== workerId));
  };

  return { workers, hireWorker, fireWorker };
}; 