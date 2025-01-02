import React from 'react';
import styled from 'styled-components';

const MarketContainer = styled.div`
  padding: 10px;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const MarketSection = styled.div`
  margin-bottom: 30px;
`;

const PriceChart = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 15px;
  border-radius: 12px;
  margin: 10px 0;
  height: 120px;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 150px;
  }
`;

const PriceLine = styled.div.attrs(props => ({
  style: {
    bottom: `${props.$bottom}%`,
    left: `${props.$left}%`,
    background: props.$trend > 0 ? '#2ecc71' : '#e74c3c'
  }
}))`
  position: absolute;
  width: 2px;
  height: ${props => props.$height}%;
  transition: all 0.3s ease;
`;

const MarketInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.05);
  }

  h4 {
    margin: 0;
    color: #fff;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  p {
    margin: 8px 0;
    font-size: 0.9rem;
    color: ${props => props.$trend > 0 ? '#4cd964' : '#ff3b30'};
  }
`;

const TradeButton = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$type === 'buy' ? '#4cd964' : '#ff3b30'};
  color: white;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  @media (min-width: 768px) {
    padding: 10px;
    font-size: 1rem;
  }
`;

const MarketSystem = ({ 
  products, 
  marketPrices, 
  priceHistory,
  onBuy,
  onSell,
  canAfford
}) => {
  if (!marketPrices || Object.keys(marketPrices).length === 0) {
    return <div>Pazar yükleniyor...</div>;
  }

  return (
    <MarketContainer>
      <MarketSection>
        <h3>Piyasa Durumu</h3>
        <MarketInfo>
          {Object.entries(products).map(([key, product]) => (
            <InfoCard 
              key={key}
              $trend={marketPrices[key]?.trend || 0}
            >
              <h4>{product.name} {product.icon}</h4>
              <p>Fiyat: ${marketPrices[key]?.currentPrice.toFixed(2)}</p>
              <p>Değişim: {marketPrices[key]?.trend > 0 ? '+' : ''}{marketPrices[key]?.trend.toFixed(2)}%</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <TradeButton
                  $type="buy"
                  onClick={() => onBuy(key)}
                  disabled={!canAfford(marketPrices[key]?.currentPrice)}
                >
                  Satın Al
                </TradeButton>
                <TradeButton
                  $type="sell"
                  onClick={() => onSell(key)}
                >
                  Sat
                </TradeButton>
              </div>
            </InfoCard>
          ))}
        </MarketInfo>
      </MarketSection>

      <MarketSection>
        <h3>Fiyat Grafikleri</h3>
        {Object.entries(products).map(([key, product]) => (
          <div key={key}>
            <h4>{product.name} Fiyat Grafiği</h4>
            <PriceChart>
              {priceHistory[key]?.map((price, index) => (
                <PriceLine
                  key={index}
                  $bottom={((price - product.price) / product.price) * 50 + 50}
                  $left={index * (100 / (priceHistory[key].length - 1))}
                  $height={1}
                  $trend={price > (priceHistory[key][index - 1] || price)}
                />
              ))}
            </PriceChart>
          </div>
        ))}
      </MarketSection>
    </MarketContainer>
  );
};

export default MarketSystem; 