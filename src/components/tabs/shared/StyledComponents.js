import styled from 'styled-components';

export const DetailsList = styled.div`
  margin-top: 20px;
`;

export const DetailCard = styled.div`
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 10px;
  }

  &:hover {
    background: rgba(15, 23, 42, 0.5);
    transform: translateY(-3px);
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const PriceTag = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${props => props.disabled ? 'rgba(102, 102, 102, 0.2)' : 'rgba(76, 217, 100, 0.15)'};
  color: ${props => props.disabled ? '#666' : '#4cd964'};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1;
`;

export const StatsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 5px;
`; 