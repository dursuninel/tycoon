import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { StatBox } from '../../styles/components/Panel.styles';
import { NeuButton } from '../../styles/components/Button.styles';

const ResourceDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

const ResourceItem = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
  
  h2, h3 {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 600;
    color: #f8fafc;
    margin-bottom: 4px;
  }
  
  p {
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin: 15px 0;

  @media (min-width: 768px) {
    gap: 15px;
  }
`;

const PriceTag = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${props => props.disabled ? 'rgba(102, 102, 102, 0.2)' : 'rgba(76, 217, 100, 0.15)'};
  color: ${props => props.disabled ? '#666' : '#4cd964'};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 10px;
    display: inline-block;
  }
`;

const Overview = ({ 
  resources, 
  money, 
  costs,
  canAfford,
  onHireWorker,
  onBuildFactory,
  stats
}) => {
  if (!resources || !stats) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ResourceDisplay>
        <ResourceItem>
          <h2>${Math.floor(money || 0)}</h2>
          <p>Toplam Para</p>
        </ResourceItem>
        <ResourceItem>
          <h3>{resources.workers || 0}</h3>
          <p>İşçiler</p>
        </ResourceItem>
        <ResourceItem>
          <h3>{resources.buildings || 0}</h3>
          <p>Binalar</p>
        </ResourceItem>
      </ResourceDisplay>

      <StatBox>
        <h4>Finansal Durum</h4>
        <div className="chart-header">
          <span>Son 30 Saniye</span>
          {stats.moneyHistory.length > 1 && (
            <div className={`trend ${stats.trend >= 0 ? 'positive' : 'negative'}`}>
              {stats.trend >= 0 ? '↗' : '↘'}
              {Math.abs(stats.trend).toFixed(1)}%
            </div>
          )}
        </div>
        {/* Chart bileşeni buraya gelecek */}
      </StatBox>

      <StatBox>
        <h4>Detaylı İstatistikler</h4>
        <div className="stats-grid">
          <div>💰 Saatlik Gelir: ${stats.hourlyIncome.toFixed(2)}</div>
          <div>⚡ Toplam Üretim: {stats.totalProduction.toFixed(1)}/s</div>
          <div>🏭 Fabrika Verimliliği: %{(stats.factoryEfficiency * 100).toFixed(1)}</div>
          <div>👥 İşçi Verimliliği: %{(stats.workerEfficiency * 100).toFixed(1)}</div>
        </div>
      </StatBox>

      <ButtonGroup>
        <div style={{ position: 'relative' }}>
          <PriceTag disabled={!canAfford(costs.worker.current)}>
            ${costs.worker.current}
          </PriceTag>
          <NeuButton 
            onClick={onHireWorker} 
            disabled={!canAfford(costs.worker.current)}
          >
            İşçi Kirala
          </NeuButton>
        </div>
        <div style={{ position: 'relative' }}>
          <PriceTag disabled={!canAfford(costs.building.current)}>
            ${costs.building.current}
          </PriceTag>
          <NeuButton 
            onClick={onBuildFactory} 
            disabled={!canAfford(costs.building.current)}
          >
            Fabrika İnşa Et
          </NeuButton>
        </div>
      </ButtonGroup>
    </>
  );
};

export default Overview; 