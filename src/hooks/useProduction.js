import { useState, useEffect } from 'react';

export const useProduction = (workers, buildings, products, autoSell) => {
  const [productionRate, setProductionRate] = useState(0);
  const [totalProduction, setTotalProduction] = useState(0);

  useEffect(() => {
    // Üretim mantığı
  }, [workers, buildings, products, autoSell]);

  return {
    productionRate,
    totalProduction,
  };
}; 