import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const EventsContainer = styled.div`
  padding: 20px;
`;

const Events = () => {
  return (
    <EventsContainer>
      <Title>Etkinlikler</Title>
      <p>Yakında eklenecek...</p>
    </EventsContainer>
  );
};

export default Events; 