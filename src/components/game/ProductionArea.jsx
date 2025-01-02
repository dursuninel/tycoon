import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { NeuButton, AutoSellButton } from '../../styles/components/Button.styles';
import { GlassPanel } from '../../styles/components/Panel.styles';

const ProductionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;

  .auto-sell-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 8px;
    color: #22c55e;
    font-size: 0.9rem;
    font-weight: 500;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 500;
    text-align: center;
  }

  .products-info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    .product-price {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      color: #f8fafc;
      font-weight: 500;
      font-size: 0.9rem;
    }
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

const ProductionArea = ({
  productionRate = 0,
  resources = { products: 0 },
  products = {},
  buildings = [],
  autoSell = false,
  onSellProducts,
  onToggleAutoSell
}) => {
  return (
    <GlassPanel>
      <Title>Üretim Alanı</Title>
      <ProductionInfo>
        {autoSell && (
          <div className="auto-sell-info">
            🔄 Otomatik Satış Aktif - Her saniye ürünler otomatik satılıyor
          </div>
        )}
        
        <div className="stats-grid">
          <div>
            ⚡ Üretim Hızı: <span className="value">{(productionRate || 0).toFixed(1)}/s</span>
          </div>
          <div>
            📦 Depo Durumu: <span className="value">{Math.floor(resources.products || 0)} ürün</span>
          </div>
        </div>
        
        {buildings.length > 0 && (
          <>
            <p>Ürün Detayları:</p>
            <div className="products-info">
              {Array.from(new Set(buildings.map(b => b.productType))).map(productType => {
                const buildingsOfType = buildings.filter(b => b.productType === productType);
                const totalProduction = buildingsOfType.reduce((total, building) => {
                  if (building.isActive && building.condition > 20) {
                    return total + (building.productivity / products[productType].productionTime);
                  }
                  return total;
                }, 0);

                return (
                  <div key={productType} className="product-price">
                    <span>{products[productType].icon}</span>
                    <span>${products[productType].price}</span>
                    <span>({totalProduction.toFixed(1)}/s)</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </ProductionInfo>
      <ButtonGroup>
        <NeuButton 
          onClick={onSellProducts}
          disabled={resources.products < 1}
        >
          Ürünleri Sat (${(() => {
            if (resources.products < 1) return 0;
            
            let totalValue = 0;
            const productShare = Math.floor(resources.products / Math.max(1, buildings.length));
            
            if (buildings.length > 0) {
              buildings.forEach(building => {
                const product = products[building.productType];
                totalValue += product.price * productShare;
              });
            } else {
              totalValue = products.wood.price * Math.floor(resources.products);
            }
            
            return Math.floor(totalValue);
          })()})
        </NeuButton>
        <AutoSellButton
          $active={autoSell}
          onClick={onToggleAutoSell}
        >
          {autoSell ? '🔄 Otomatik Satış Aktif' : '⭕ Otomatik Satış'}
        </AutoSellButton>
      </ButtonGroup>
    </GlassPanel>
  );
};

export default ProductionArea; 