import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { NeuButton } from '../../styles/components/Button.styles';

const MarketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MarketCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PriceDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  color: ${props => props.$trend > 0 ? '#22c55e' : props.$trend < 0 ? '#ef4444' : '#f8fafc'};

  .trend {
    font-size: 0.9rem;
    padding: 4px 8px;
    border-radius: 20px;
    background: ${props => props.$trend > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Market = ({
  products,
  marketPrices,
  resources,
  onBuy,
  onSell,
  canAfford
}) => {
  return (
    <div>
      <Title>Pazar</Title>
      <MarketGrid>
        {Object.entries(products).filter(([_, product]) => product.unlocked).map(([key, product]) => {
          const price = marketPrices[key];
          const trend = price?.trend || 0;
          
          return (
            <MarketCard key={key}>
              <div style={{ fontSize: '2rem', textAlign: 'center' }}>
                {product.icon}
              </div>
              <h3>{product.name}</h3>
              <PriceDisplay $trend={trend}>
                ${price?.currentPrice.toFixed(2)}
                <span className="trend">
                  {trend > 0 ? '↗' : '↘'} {Math.abs(trend).toFixed(1)}%
                </span>
              </PriceDisplay>
              <ButtonGroup>
                <NeuButton
                  onClick={() => onBuy(key)}
                  disabled={!canAfford(price?.currentPrice)}
                >
                  Satın Al
                </NeuButton>
                <NeuButton
                  onClick={() => onSell(key)}
                  disabled={resources.products < 1}
                >
                  Sat
                </NeuButton>
              </ButtonGroup>
            </MarketCard>
          );
        })}
      </MarketGrid>
    </div>
  );
};

export default Market; 