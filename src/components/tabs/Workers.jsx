import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { IconButton } from '../../styles/components/Button.styles';

const DetailsList = styled.div`
  margin-top: 20px;
`;

const DetailCard = styled.div`
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 10px;
  }

  &:hover {
    background: rgba(15, 23, 42, 0.5);
    transform: translateY(-3px);
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #f8fafc;

    @media (max-width: 768px) {
      justify-content: center;
    }

    .status {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 20px;
      background: ${props => props.$isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
      color: ${props => props.$isActive ? '#22c55e' : '#ef4444'};
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
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

const StatsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 5px;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 500;

    span.value {
      color: #f8fafc;
      font-weight: 600;
    }
  }
`;

const Workers = ({ 
  workers,
  onUpgrade,
  onFire,
  onCustomize,
  canAfford
}) => {
  return (
    <DetailsList>
      <Title>İşçi Listesi</Title>
      {workers.map(worker => (
        <DetailCard key={worker.id}>
          <PriceTag disabled={!canAfford(worker.upgradeCost)}>
            Geliştirme: ${worker.upgradeCost}
          </PriceTag>
          <Avatar>{worker.avatar}</Avatar>
          <InfoSection $isActive={worker.isActive}>
            <h4>
              {worker.name}
              <span className="status">
                {worker.isActive ? 'Aktif' : 'Devre Dışı'}
              </span>
            </h4>
            <StatsDisplay>
              <div>🔨 Üretim: {worker.productivity.toFixed(1)}/s</div>
              <div>📅 İşe Alım: {worker.hireDate}</div>
              <div>⭐ Seviye: {worker.level}</div>
            </StatsDisplay>
          </InfoSection>
          <ActionButtons>
            <IconButton
              onClick={() => onCustomize(worker)}
              title="Özelleştir"
            >
              ✏️
            </IconButton>
            <IconButton 
              className="upgrade"
              onClick={() => onUpgrade(worker.id)}
              disabled={!canAfford(worker.upgradeCost)}
              title={`Geliştir (${worker.upgradeCost}$)`}
            >
              ⬆️
            </IconButton>
            <IconButton 
              className="fire"
              onClick={() => onFire(worker.id)}
              title="İşten Çıkar"
            >
              🚫
            </IconButton>
          </ActionButtons>
        </DetailCard>
      ))}
    </DetailsList>
  );
};

export default Workers; 