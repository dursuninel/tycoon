import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { IconButton } from '../../styles/components/Button.styles';
import { DetailsList, DetailCard, Avatar, InfoSection, ActionButtons, PriceTag, StatsDisplay } from './shared/StyledComponents';

const Buildings = ({ 
  buildings,
  products,
  onManage,
  onDemolish,
  canAfford
}) => {
  return (
    <DetailsList>
      <Title>Fabrika Listesi</Title>
      {buildings.map(building => (
        <DetailCard key={building.id}>
          <PriceTag disabled={!canAfford(building.upgradeCost)}>
            Geliştirme: ${building.upgradeCost}
          </PriceTag>
          <Avatar>🏭</Avatar>
          <InfoSection $isActive={building.isActive}>
            <h4>
              {building.name}
              <span className="status">
                {building.isActive ? 'Aktif' : 'Devre Dışı'}
              </span>
            </h4>
            <StatsDisplay>
              <div>⚡ Üretim: {(building.productivity / products[building.productType].productionTime).toFixed(1)}/s</div>
              <div>🔧 Durum: %{Math.floor(building.condition)}</div>
              <div>📦 Ürün: {products[building.productType].name} (${(building.productivity / products[building.productType].productionTime * products[building.productType].price).toFixed(1)}/s)</div>
              <div>⭐ Seviye: {building.level}</div>
            </StatsDisplay>
          </InfoSection>
          <ActionButtons>
            <IconButton 
              onClick={() => onManage(building)}
              title="Yönet"
            >
              ⚙️
            </IconButton>
            <IconButton 
              className="fire"
              onClick={() => onDemolish(building.id)}
              title="Yık"
            >
              💣
            </IconButton>
          </ActionButtons>
        </DetailCard>
      ))}
    </DetailsList>
  );
};

export default Buildings; 