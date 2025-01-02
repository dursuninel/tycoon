import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Logo = () => (
  <LogoContainer>
    <LogoIcon>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#2ecc71"/>
        <path d="M50 20L73.3 33.3V60L50 73.3L26.7 60V33.3L50 20Z" fill="#1a1a1a"/>
        <path d="M50 40L60 45V55L50 60L40 55V45L50 40Z" fill="#2ecc71"/>
        <rect x="20" y="70" width="60" height="10" fill="#1a1a1a"/>
        <circle cx="50" cy="50" r="5" fill="#fff"/>
      </svg>
    </LogoIcon>
    IndustrialEmpire
  </LogoContainer>
);

export default Logo; 