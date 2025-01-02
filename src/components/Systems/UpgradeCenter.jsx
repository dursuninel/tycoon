import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const UpgradeCenterContainer = styled.div`
  padding: 20px;
`;

const UpgradeCenter = () => {
  return (
    <UpgradeCenterContainer>
      <Title>Geliştirme Merkezi</Title>
      <p>Yakında eklenecek...</p>
    </UpgradeCenterContainer>
  );
};

export default UpgradeCenter; 