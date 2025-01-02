import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const AchievementsContainer = styled.div`
  padding: 20px;
`;

const Achievements = () => {
  return (
    <AchievementsContainer>
      <Title>Başarımlar</Title>
      <p>Yakında eklenecek...</p>
    </AchievementsContainer>
  );
};

export default Achievements; 