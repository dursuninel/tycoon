import styled from 'styled-components';

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ProductIcon = ({ type }) => {
  const icons = {
    wood: <svg>...</svg>, // SVG ikon
    stone: <svg>...</svg>, // SVG ikon
    iron: <svg>...</svg>,
    gold: <svg>...</svg>,
    diamond: <svg>...</svg>
  };

  return <IconWrapper>{icons[type]}</IconWrapper>;
};

export default ProductIcon; 