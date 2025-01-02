import styled from 'styled-components';

export const GlassPanel = styled.div`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.7);
  }
`;

export const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;

  h4 {
    color: #f8fafc;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
`; 