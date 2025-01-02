import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const MissionsContainer = styled.div`
  padding: 20px;
`;

const Missions = () => {
  return (
    <MissionsContainer>
      <Title>Görevler</Title>
      <p>Yakında eklenecek...</p>
    </MissionsContainer>
  );
};

export default Missions; 