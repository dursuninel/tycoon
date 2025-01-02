import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { NeuButton } from '../../styles/components/Button.styles';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  cursor: ${props => props.$unlocked ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.$unlocked ? 1 : 0.5};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.$unlocked ? 'translateY(-5px)' : 'none'};
    background: ${props => props.$unlocked ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, #2c3440, #1a1f25);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const LicenseButton = styled(NeuButton)`
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
`;

const Products = ({
  products,
  selectedProduct,
  onSelectProduct,
  onUnlockProduct,
  canAfford
}) => {
  return (
    <div>
      <Title>Ürün Lisansları</Title>
      <ProductGrid>
        {Object.entries(products).map(([key, product]) => (
          <ProductCard 
            key={key}
            $unlocked={product.unlocked}
            onClick={() => product.unlocked && onSelectProduct(key)}
            style={selectedProduct === key ? { border: '2px solid #2ecc71' } : {}}
          >
            <ProductImage>{product.icon}</ProductImage>
            <h3>{product.name}</h3>
            <p>Satış Fiyatı: ${product.price}</p>
            <p>Üretim Süresi: {product.productionTime}s</p>
            {!product.unlocked && (
              <LicenseButton
                onClick={(e) => {
                  e.stopPropagation();
                  onUnlockProduct(key);
                }}
                disabled={!canAfford(product.licenseCost)}
              >
                Lisans Al (${product.licenseCost})
              </LicenseButton>
            )}
          </ProductCard>
        ))}
      </ProductGrid>
    </div>
  );
};

export default Products; 