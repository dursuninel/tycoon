import styled from 'styled-components';

export const NeuButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(145deg, #1a1f2e, #0a0f1a);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  color: #f8fafc;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.4);
    background: linear-gradient(145deg, #1e2433, #0d121f);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: linear-gradient(145deg, #1a1f2e, #0a0f1a);
  }
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.05);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.02);
  }

  &.upgrade {
    background: linear-gradient(145deg, #2ebd59, #249c47);
    &:hover:not(:disabled) {
      background: linear-gradient(145deg, #249c47, #2ebd59);
    }
  }

  &.fire {
    background: linear-gradient(145deg, #dc2626, #b91c1c);
    &:hover:not(:disabled) {
      background: linear-gradient(145deg, #b91c1c, #dc2626);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AutoSellButton = styled(NeuButton)`
  position: relative;
  overflow: hidden;
  background: ${props => props.$active ? 'linear-gradient(145deg, #2ebd59, #249c47)' : 'linear-gradient(145deg, #1a1f2e, #0a0f1a)'};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: ${props => props.$active ? '2px solid #2ebd59' : '2px solid transparent'};
    border-radius: 12px;
    animation: ${props => props.$active ? 'rotate 2s linear infinite' : 'none'};
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`; 