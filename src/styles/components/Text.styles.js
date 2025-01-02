import styled from 'styled-components';

export const Title = styled.h2`
  text-align: center;
  color: #f8fafc;
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const MoneyDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 8px;
  color: #22c55e;
  font-weight: 600;
  font-size: 0.95rem;

  span {
    font-size: 1.1rem;
  }
`; 