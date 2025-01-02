import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ProductIcon = ({ type }) => {
  const icons = {
    wood: '🌳',
    stone: '🗿',
    iron: '⛓️',
    gold: '🔶',
    diamond: '💎'
  };

  return <IconWrapper>{icons[type] || '📦'}</IconWrapper>;
};

export default ProductIcon; 