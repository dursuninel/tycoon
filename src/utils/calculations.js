export const calculateRepairCost = (condition) => {
  const baseCost = 100;
  const damageFactor = (100 - condition) / 100;
  return Math.floor(baseCost * damageFactor * 2);
};

export const calculateProduction = (worker, researchEffects) => {
  // Üretim hesaplama mantığı
};

// ... diğer hesaplama fonksiyonları 