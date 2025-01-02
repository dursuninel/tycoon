import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const StatisticsContainer = styled.div`
  padding: 20px;
`;

const Statistics = () => {
  return (
    <StatisticsContainer>
      <Title>İstatistikler</Title>
      <p>Yakında eklenecek...</p>
    </StatisticsContainer>
  );
};

export default Statistics; 