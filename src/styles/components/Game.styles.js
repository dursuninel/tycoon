import styled from 'styled-components';

export const GameContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0f1a, #1a1f2e);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #e2e8f0;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 20px;
    gap: 20px;
  }
`;

// Diğer styled-components buraya taşınacak... 