import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';

const SettingsContainer = styled.div`
  padding: 20px;
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <Title>Ayarlar</Title>
      <p>Yakında eklenecek...</p>
    </SettingsContainer>
  );
};

export default Settings; 