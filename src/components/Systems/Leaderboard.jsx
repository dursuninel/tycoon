import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const LeaderboardContainer = styled.div`
  padding: 20px;
`;

const Leaderboard = ({ currentUser }) => {
  return (
    <LeaderboardContainer>
      <Title>Liderlik Tablosu</Title>
      <p>Yakında eklenecek...</p>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 