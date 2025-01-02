import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Logo from './Logo';
import TechTree from './Systems/Research/TechTree';
import { TECHNOLOGIES } from '../data/technologies';
import MarketSystem from './Systems/Market/MarketSystem';
import TrainingCenter from './Systems/Workers/TrainingCenter';
import { COURSES } from '../data/courses';

// Tema renk paletini tanımlayalım
const theme = {
  dark: {
    background: 'linear-gradient(135deg, #0f172a, #1e293b)', // Daha koyu ve sofistike
    surface: 'rgba(30, 41, 59, 0.7)', // Panel arkaplanı
    surfaceHover: 'rgba(51, 65, 85, 0.8)',
    border: 'rgba(148, 163, 184, 0.1)',
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      accent: '#38bdf8'
    },
    button: {
      background: 'linear-gradient(145deg, #1e293b, #0f172a)',
      hover: 'linear-gradient(145deg, #0f172a, #1e293b)',
      shadow: '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.02)'
    }
  },
  light: {
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    surface: 'rgba(255, 255, 255, 0.9)',
    surfaceHover: 'rgba(255, 255, 255, 1)',
    border: 'rgba(51, 65, 85, 0.1)',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#0284c7'
    },
    button: {
      background: 'linear-gradient(145deg, #ffffff, #f1f5f9)',
      hover: 'linear-gradient(145deg, #f1f5f9, #ffffff)',
      shadow: '5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(255, 255, 255, 0.8)'
    }
  }
};

const GameContainer = styled.div`
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

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(10, 15, 26, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  .stats-container {
    display: flex;
    align-items: center;
    gap: 20px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 8px;
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 500;

      .value {
        color: #f8fafc;
        font-weight: 600;
      }

      .icon {
        font-size: 1.1rem;
      }
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
  margin-top: 60px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    width: 250px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
    position: sticky;
    top: 80px;
  }
`;

const Tab = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: ${props => props.$active ? 
    'linear-gradient(145deg, #1a1f2e, #0a0f1a)' : 
    'rgba(255, 255, 255, 0.03)'};
  color: ${props => props.$active ? '#e2e8f0' : '#94a3b8'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  span {
    font-size: 1.2rem;
  }

  &:hover {
    background: ${props => props.$active ? 
      'linear-gradient(145deg, #1e2433, #0d121f)' : 
      'rgba(255, 255, 255, 0.05)'};
    transform: translateX(5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 60px;

  @media (min-width: 768px) {
    margin-top: 0;
    padding-top: 60px;
  }
`;

const GlassPanel = styled.div`
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

const ResourceDisplay = styled(GlassPanel)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

const ResourceItem = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
  
  h2, h3 {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 600;
    color: #f8fafc;
    margin-bottom: 4px;
  }
  
  p {
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin: 15px 0;

  @media (min-width: 768px) {
    gap: 15px;
  }
`;

const NeuButton = styled.button`
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

const DetailsList = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #f8fafc;
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const DetailCard = styled.div`
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

const Avatar = styled.div`
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

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #f8fafc;

    @media (max-width: 768px) {
      justify-content: center;
    }

    .status {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 20px;
      background: ${props => props.$isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
      color: ${props => props.$isActive ? '#22c55e' : '#ef4444'};
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const IconButton = styled.button`
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  cursor: ${props => props.$unlocked ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.$unlocked ? 1 : 0.5};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.$unlocked ? 'translateY(-5px)' : 'none'};
    background: ${props => props.$unlocked ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, #2c3440, #1a1f25);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const LicenseButton = styled(NeuButton)`
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
`;

const ModalTitle = styled(Title)`
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const ModalGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const StatBox = styled.div`
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

const SkillBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;

  div {
    height: 100%;
    background: #4cd964;
    width: ${props => props.$progress}%;
    transition: width 0.3s ease;
  }
`;

const MoneyDisplay = styled.div`
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

const ProductionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;

  .auto-sell-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 8px;
    color: #22c55e;
    font-size: 0.9rem;
    font-weight: 500;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 500;
    text-align: center;
  }

  .products-info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    .product-price {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      color: #f8fafc;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
`;

const PriceTag = styled.div`
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

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 10px;
    display: inline-block;
  }
`;

const StatsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 5px;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 500;

    span.value {
      color: #f8fafc;
      font-weight: 600;
    }
  }
`;

const CustomizeButton = styled(IconButton)`
  background: linear-gradient(145deg, #3b82f6, #2563eb);
  &:hover:not(:disabled) {
    background: linear-gradient(145deg, #2563eb, #3b82f6);
  }
`;

const CustomizeModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CustomizeField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      background: rgba(255, 255, 255, 0.05);
    }

    &::placeholder {
      color: #475569;
    }
  }
`;

const AvatarSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
  gap: 15px;
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const AvatarOption = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${props => props.$selected && `
    background: #3498db;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);

    &::after {
      content: attr(title);
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 0.05);
  }

  option {
    background: #1a1f2e;
    color: #f8fafc;
    padding: 8px;
  }
`;

const WORKER_AVATARS = [
  '👨', '👩', '🧑', // Temel
  '👨‍🔧', '👩‍🔧', '🧑‍🔧', // Teknisyen
  '👨‍🏭', '👩‍🏭', '🧑‍🏭', // Fabrika işçisi
  '👨‍💼', '👩‍💼', '🧑‍💼', // Yönetici
  '👨‍🔬', '👩‍🔬', '🧑‍🔬', // Uzman
  '👨‍💻', '👩‍💻', '🧑‍💻', // Teknoloji
  '👷', '💂', '🤵', // Diğer
  '🧙', '🦹', '🥷', // Özel
];

const Chart = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(15, 23, 42, 0.4);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #94a3b8;
    font-size: 0.9rem;

    .trend {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 500;
      
      &.positive {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
      }
      
      &.negative {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
    }
  }

  .chart-grid {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px 20px;

    .grid-line {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.05);

      &::after {
        content: attr(data-value);
        position: absolute;
        right: 5px;
        transform: translateY(-50%);
        color: #64748b;
        font-size: 0.75rem;
      }
    }
  }

  .chart-line {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    align-items: flex-end;
    gap: 2px;
    padding: 0 20px;

    .bar {
      flex: 1;
      background: rgba(34, 197, 94, 0.2);
      transition: all 0.3s ease;
      position: relative;
      border-radius: 3px 3px 0 0;

      &:hover {
        background: rgba(34, 197, 94, 0.3);
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: rgba(34, 197, 94, 0.5);
        border-radius: 3px 3px 0 0;
      }

      &:hover::after {
        content: attr(data-value);
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        white-space: nowrap;
        z-index: 10;
      }
    }
  }
`;

// Yeni styled component ekleyelim
const AutoSellButton = styled(NeuButton)`
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

const Game = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [money, setMoney] = useState(2000);
  const [resources, setResources] = useState({
    workers: 0,
    buildings: 0,
    products: 0
  });
  const [workers, setWorkers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [productionRate, setProductionRate] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [products, setProducts] = useState({
    wood: { 
      name: 'Odun', 
      icon: '🌳',
      unlocked: true, 
      price: 3, 
      productionTime: 2 
    },
    stone: { 
      name: 'Taş', 
      icon: '🗿',
      unlocked: false, 
      price: 5, 
      productionTime: 3, 
      licenseCost: 2000 
    },
    iron: { 
      name: 'Demir', 
      icon: '⛓️',
      unlocked: false, 
      price: 8, 
      productionTime: 4, 
      licenseCost: 5000 
    },
    gold: { 
      name: 'Altın', 
      icon: '🔶',
      unlocked: false, 
      price: 15, 
      productionTime: 6, 
      licenseCost: 10000 
    },
    diamond: { 
      name: 'Elmas', 
      icon: '💎',
      unlocked: false, 
      price: 30, 
      productionTime: 8, 
      licenseCost: 20000 
    }
  });
  const [selectedProduct, setSelectedProduct] = useState('wood');
  const [modalContent, setModalContent] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [technologies, setTechnologies] = useState(TECHNOLOGIES);
  const [activeResearch, setActiveResearch] = useState(null);
  const [researchEffects, setResearchEffects] = useState({
    productionEfficiency: 1,
    factoryOutput: 1,
    workerEfficiency: 1,
    workerHappiness: 1,
    resourceEfficiency: 1
  });
  const [marketPrices, setMarketPrices] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [marketDemand, setMarketDemand] = useState({});
  const [activeTrainings, setActiveTrainings] = useState({});
  const [workerStats, setWorkerStats] = useState({});
  const [costs, setCosts] = useState({
    worker: {
      base: 200,
      current: 200,
      increment: 1.15 // Her alımda %15 artış
    },
    building: {
      base: 1000,
      current: 1000,
      increment: 1.25 // Her alımda %25 artış
    },
    workerUpgrade: {
      base: 100,
      current: 100,
      increment: 1.1 // Her geliştirmede %10 artış
    },
    buildingUpgrade: {
      base: 500,
      current: 500,
      increment: 1.2 // Her geliştirmede %20 artış
    },
    buildingMaintenance: 20
  });
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [moneyHistory, setMoneyHistory] = useState([2000]);
  const [hourlyIncome, setHourlyIncome] = useState(0);
  const [avgFactoryEfficiency, setAvgFactoryEfficiency] = useState(0);
  const [avgWorkerEfficiency, setAvgWorkerEfficiency] = useState(0);
  const [totalProduction, setTotalProduction] = useState(0);
  const [autoSell, setAutoSell] = useState(false);


  // autoSell state değişimini yönetecek fonksiyonu güncelleyelim
const toggleAutoSell = () => {
    setAutoSell(prev => {
      if (!prev && resources.products >= 1) {
        // Eğer otomatik satış açılıyorsa ve depoda ürün varsa, hepsini sat
        sellProducts();
      }
      return !prev;
    });
  };


  const canAfford = (cost) => money >= (typeof cost === 'object' ? cost.current : cost);

  const createWorker = () => ({
    id: Date.now(),
    name: `İşçi #${resources.workers + 1}`,
    avatar: '👷', // Varsayılan avatar
    productivity: 0.8,
    level: 1,
    experience: 0,
    maxExperience: 100,
    upgradeCost: 100,
    skills: {
      production: 1,
      management: 1,
      quality: 1,
      leadership: 1
    },
    completedCourses: [],
    stats: {
      producedItems: 0,
      hoursWorked: 0,
      successRate: 100
    },
    traits: generateWorkerTraits(),
    hireDate: new Date().toLocaleDateString(),
    isActive: true
  });

  const generateWorkerTraits = () => {
    const traits = [
      'Hızlı Öğrenen',
      'Detaycı',
      'Takım Oyuncusu',
      'Lider Ruhlu',
      'Yenilikçi',
      'Çalışkan',
      'Analitik'
    ];
    
    return Array(2).fill().map(() => 
      traits[Math.floor(Math.random() * traits.length)]
    );
  };

  const createFactory = () => ({
    id: Date.now(),
    name: `Fabrika #${resources.buildings + 1}`,
    productivity: 1,
    level: 1,
    condition: 100,
    maintenanceWorker: null,
    productType: selectedProduct,
    buildDate: new Date().toLocaleDateString(),
    isActive: true,
    maintenanceCost: costs.buildingMaintenance,
    upgradeCost: 500
  });

  const assignWorkerToMaintenance = (workerId, buildingId) => {
    setWorkers(prev => prev.map(worker => ({
      ...worker,
      assignedTo: worker.id === workerId ? buildingId : worker.assignedTo
    })));

    setBuildings(prev => prev.map(building => ({
      ...building,
      maintenanceWorker: building.id === buildingId ? workerId : building.maintenanceWorker
    })));
  };

  const handleWorkerUpgrade = (workerId) => {
    const worker = workers.find(w => w.id === workerId);
    setSelectedWorker(worker);
    setModalContent('workerUpgrade');
  };

  const upgradeWorkerSkill = (skill) => {
    if (selectedWorker && canAfford(selectedWorker.upgradeCost)) {
      setMoney(prev => prev - selectedWorker.upgradeCost);
      setWorkers(prev => prev.map(worker => {
        if (worker.id === selectedWorker.id) {
          const newSkills = { ...worker.skills };
          const currentLevel = newSkills[skill] || 1;
          
          if (currentLevel < 10) {
            newSkills[skill] = currentLevel + 1;
            
            let newProductivity = worker.productivity;
            if (skill === 'production') {
              newProductivity = 0.8 + (newSkills.production - 1) * 0.1;
            }
            
            return {
              ...worker,
              skills: newSkills,
              productivity: newProductivity,
              level: worker.level + 1,
              upgradeCost: Math.floor(worker.upgradeCost * 1.1)
            };
          }
        }
        return worker;
      }));
    }
  };

  const hireWorker = () => {
    if (canAfford(costs.worker)) {
      setMoney(prev => prev - costs.worker.current);
      setResources(prev => ({
        ...prev,
        workers: prev.workers + 1
      }));
      
      const newWorker = createWorker();
      setWorkers(prev => [...prev, newWorker]);
      setProductionRate(prev => prev + 0.8);

      // İşçi fiyatını güncelle
      setCosts(prev => ({
        ...prev,
        worker: {
          ...prev.worker,
          current: Math.floor(prev.worker.current * prev.worker.increment)
        }
      }));
    }
  };

  const buildFactory = () => {
    if (canAfford(costs.building)) {
      setMoney(prev => prev - costs.building.current);
      setResources(prev => ({
        ...prev,
        buildings: prev.buildings + 1
      }));
      
      const newBuilding = createFactory();
      setBuildings(prev => [...prev, newBuilding]);
      setProductionRate(prev => prev + 2);

      // Fabrika fiyatını güncelle
      setCosts(prev => ({
        ...prev,
        building: {
          ...prev.building,
          current: Math.floor(prev.building.current * prev.building.increment)
        }
      }));
    }
  };

  const sellProducts = () => {
    if (resources.products >= 1) {
      let totalValue = 0;
      const productShare = Math.floor(resources.products / Math.max(1, buildings.length));
      
      buildings.forEach(building => {
        const product = products[building.productType];
        totalValue += product.price * productShare;
      });

      if (buildings.length === 0) {
        totalValue = products.wood.price * Math.floor(resources.products);
      }

      if (totalValue > 0) {
        setMoney(prev => prev + totalValue);
        setResources(prev => ({
          ...prev,
          products: 0
        }));
      }
    }
  };

  const upgradeWorker = (workerId) => {
    const worker = workers.find(w => w.id === workerId);
    if (worker && canAfford(worker.upgradeCost)) {
      setMoney(prev => prev - worker.upgradeCost);
      setWorkers(prev => prev.map(w => {
        if (w.id === workerId) {
          const newProductivity = w.productivity + 0.2;
          return { 
            ...w, 
            productivity: newProductivity,
            level: w.level + 1,
            upgradeCost: Math.floor(w.upgradeCost * 1.1)
          };
        }
        return w;
      }));
    }
  };

  const fireWorker = (workerId) => {
    setWorkers(prev => prev.filter(worker => worker.id !== workerId));
    setResources(prev => ({
      ...prev,
      workers: prev.workers - 1
    }));
    const worker = workers.find(w => w.id === workerId);
    setProductionRate(prev => prev - worker.productivity);
  };

  const upgradeBuilding = (buildingId) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building && canAfford(building.upgradeCost)) {
      setMoney(prev => prev - building.upgradeCost);
      setBuildings(prev => prev.map(b => {
        if (b.id === buildingId) {
          const newProductivity = b.productivity + 0.5;
          return {
            ...b,
            productivity: newProductivity,
            level: b.level + 1,
            upgradeCost: Math.floor(b.upgradeCost * 1.2)
          };
        }
        return b;
      }));
    }
  };

  const demolishBuilding = (buildingId) => {
    setBuildings(prev => prev.filter(building => building.id !== buildingId));
    setResources(prev => ({
      ...prev,
      buildings: prev.buildings - 1
    }));
    const building = buildings.find(b => b.id === buildingId);
    setProductionRate(prev => prev - building.productivity);
  };

  const unlockProduct = (productKey) => {
    const product = products[productKey];
    if (!product.unlocked && canAfford(product.licenseCost)) {
      setMoney(prev => prev - product.licenseCost);
      setProducts(prev => ({
        ...prev,
        [productKey]: { ...prev[productKey], unlocked: true }
      }));
    }
  };

  const selectProduct = (productKey) => {
    if (products[productKey].unlocked) {
      setSelectedProduct(productKey);
    }
  };

  const startResearch = (techId) => {
    let tech;
    Object.values(technologies).forEach(category => {
      if (techId in category) {
        tech = category[techId];
      }
    });

    if (tech && tech.canResearch && money >= tech.cost) {
      setMoney(prev => prev - tech.cost);
      setActiveResearch({ id: techId, startTime: Date.now() });
      
      setTechnologies(prev => {
        const newTech = { ...prev };
        Object.keys(newTech).forEach(category => {
          if (techId in newTech[category]) {
            newTech[category][techId] = {
              ...newTech[category][techId],
              researching: true,
              progress: 0
            };
          }
        });
        return newTech;
      });
    }
  };

  const startTraining = (workerId, courseId, course) => {
    if (canAfford(course.cost)) {
      setMoney(prev => prev - course.cost);
      setActiveTrainings(prev => ({
        ...prev,
        [workerId]: {
          courseId,
          progress: 0,
          startTime: Date.now()
        }
      }));
    }
  };

  useEffect(() => {
    const trainingInterval = setInterval(() => {
      setActiveTrainings(prev => {
        const newTrainings = { ...prev };
        let updated = false;

        Object.entries(newTrainings).forEach(([workerId, training]) => {
          const course = COURSES[training.courseId];
          const elapsed = (Date.now() - training.startTime) / 1000;
          
          if (elapsed >= course.duration) {
            // Eğitimi tamamla
            const worker = workers.find(w => w.id === parseInt(workerId));
            if (worker) {
              completeTraining(worker, training.courseId, course);
            }
            delete newTrainings[workerId];
            updated = true;
          } else {
            newTrainings[workerId] = {
              ...training,
              progress: elapsed
            };
            updated = true;
          }
        });

        return updated ? newTrainings : prev;
      });
    }, 1000);

    return () => clearInterval(trainingInterval);
  }, [workers]);

  const completeTraining = (worker, courseId, course) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === worker.id) {
        const newSkills = { ...w.skills };
        Object.entries(course.effect).forEach(([skill, value]) => {
          newSkills[skill] = (newSkills[skill] || 1) + value;
        });

        return {
          ...w,
          skills: newSkills,
          completedCourses: [...(w.completedCourses || []), courseId],
          experience: w.experience + 10
        };
      }
      return w;
    }));
  };

  useEffect(() => {
    if (activeResearch) {
      const interval = setInterval(() => {
        let tech;
        Object.values(technologies).forEach(category => {
          if (activeResearch.id in category) {
            tech = category[activeResearch.id];
          }
        });

        if (tech) {
          const elapsed = (Date.now() - activeResearch.startTime) / 1000;
          const progress = Math.min(elapsed, tech.researchTime);

          setTechnologies(prev => {
            const newTech = { ...prev };
            Object.keys(newTech).forEach(category => {
              if (activeResearch.id in newTech[category]) {
                newTech[category][activeResearch.id] = {
                  ...newTech[category][activeResearch.id],
                  progress
                };
              }
            });
            return newTech;
          });

          if (progress >= tech.researchTime) {
            completeResearch(activeResearch.id);
            setActiveResearch(null);
            clearInterval(interval);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeResearch, technologies]);

  const completeResearch = (techId) => {
    let tech;
    Object.values(technologies).forEach(category => {
      if (techId in category) {
        tech = category[techId];
      }
    });

    if (tech) {
      setResearchEffects(prev => ({
        ...prev,
        ...tech.effects
      }));

      setTechnologies(prev => {
        const newTech = { ...prev };
        Object.keys(newTech).forEach(category => {
          if (techId in newTech[category]) {
            newTech[category][techId] = {
              ...newTech[category][techId],
              unlocked: true,
              researching: false,
              completed: true
            };
            
            Object.values(newTech).forEach(catTechs => {
              Object.entries(catTechs).forEach(([id, t]) => {
                if (t.requirements.includes(techId)) {
                  catTechs[id] = {
                    ...t,
                    canResearch: true
                  };
                }
              });
            });
          }
        });
        return newTech;
      });
    }
  };

  useEffect(() => {
    const marketInterval = setInterval(() => {
      setMarketPrices(prev => {
        const newPrices = { ...prev };
        Object.keys(products).forEach(key => {
          // Eğer fiyat henüz set edilmemişse, başlangıç fiyatını kullan
          const currentPrice = newPrices[key]?.currentPrice || products[key].price;
          const basePrice = products[key].price;
          const demand = marketDemand[key] || 0.5; // Varsayılan talep
          
          // Fiyat değişimi hesapla
          const demandEffect = (demand - 0.5) * 0.1;
          const randomEffect = (Math.random() - 0.5) * 0.05;
          const totalChange = demandEffect + randomEffect;
          
          // Yeni fiyat hesapla
          const newPrice = Math.max(
            basePrice * 0.5,
            Math.min(basePrice * 2, currentPrice * (1 + totalChange))
          );
          
          newPrices[key] = {
            ...newPrices[key],
            currentPrice: newPrice,
            trend: ((newPrice - currentPrice) / currentPrice) * 100
          };
        });
        return newPrices;
      });

      // Talep güncelleme
      setMarketDemand(prev => {
        const newDemand = { ...prev };
        Object.keys(products).forEach(key => {
          newDemand[key] = prev[key] || 0.5; // Varsayılan talep
          const change = (Math.random() - 0.5) * 0.1;
          newDemand[key] = Math.max(0.1, Math.min(0.9, newDemand[key] + change));
        });
        return newDemand;
      });
    }, 5000);

    return () => clearInterval(marketInterval);
  }, [products]);

  const buyProduct = (productKey) => {
    const price = marketPrices[productKey]?.currentPrice;
    if (canAfford(price)) {
      setMoney(prev => prev - price);
      setResources(prev => ({
        ...prev,
        products: prev.products + 1
      }));
    }
  };

  const sellProduct = (productKey) => {
    if (resources.products >= 1) {
      const price = marketPrices[productKey]?.currentPrice;
      setMoney(prev => prev + price);
      setResources(prev => ({
        ...prev,
        products: prev.products - 1
      }));
    }
  };

 // Üretim useEffect'ini güncelleyelim
useEffect(() => {
  const productionInterval = setInterval(() => {
    // İşçi üretimi
    const workerProduction = workers.reduce((total, worker) => {
      if (!worker.isActive || worker.assignedTo) return total;
      const baseProduction = worker.productivity;
      const researchBonus = researchEffects.workerEfficiency;
      const skillBonus = 1 + (worker.skills.production - 1) * 0.1;
      const leadershipBonus = getLeadershipBonus(worker);
      return total + (baseProduction * researchBonus * skillBonus * leadershipBonus);
    }, 0);

    // Fabrika üretimi
    const factoryProduction = buildings.reduce((total, building) => {
      if (!building.isActive || building.condition <= 20) return total;
      const product = products[building.productType];
      const baseProduction = building.productivity / product.productionTime;
      const researchBonus = researchEffects.factoryOutput;
      
      let maintenanceBonus = 1;
      if (building.maintenanceWorker) {
        const worker = workers.find(w => w.id === building.maintenanceWorker);
        if (worker?.isActive) {
          maintenanceBonus = 1 + (worker.skills.maintenance || 1) * 0.1;
        }
      }

      return total + (baseProduction * researchBonus * maintenanceBonus);
    }, 0);

    const newTotalProduction = workerProduction + factoryProduction;
    setTotalProduction(newTotalProduction);
    
    if (newTotalProduction > 0) {
      if (autoSell) {
        // Otomatik satış aktifse direkt sat
        let totalValue = 0;
        
        if (buildings.length > 0) {
          buildings.forEach(building => {
            if (building.isActive && building.condition > 20) {
              const product = products[building.productType];
              const buildingProduction = (building.productivity / product.productionTime) * 
                researchEffects.factoryOutput * 
                (building.maintenanceWorker ? 1.1 : 1);
              totalValue += product.price * buildingProduction;
            }
          });
        }

        // İşçi üretimi için değer hesapla
        const workerValue = workerProduction * products.wood.price;
        totalValue += workerValue;

        if (totalValue > 0) {
          setMoney(prev => prev + totalValue);
        }
      } else {
        // Otomatik satış aktif değilse depola
        setResources(prev => ({
          ...prev,
          products: prev.products + newTotalProduction
        }));
      }
      setProductionRate(newTotalProduction);
    }
  }, 1000);

  return () => clearInterval(productionInterval);
}, [workers, buildings, products, researchEffects, autoSell]);


  useEffect(() => {
    const maintenanceInterval = setInterval(() => {
      setBuildings(prev => prev.map(building => {
        let conditionChange = -2; // Varsayılan bozulma hızı
        let isActive = building.condition > 20;

        if (building.maintenanceWorker) {
          const worker = workers.find(w => w.id === building.maintenanceWorker);
          if (worker?.isActive) {
            // Bakım işçisinin beceri seviyesine göre iyileştirme
            const maintenanceSkill = worker.skills.maintenance || 1;
            conditionChange = maintenanceSkill * 1.5;
          } else {
            // İşçi aktif değilse veya yoksa bakım işçisini kaldır
            building.maintenanceWorker = null;
          }
        }

        const newCondition = Math.max(0, Math.min(100, building.condition + conditionChange));
        
        return {
          ...building,
          condition: newCondition,
          isActive: newCondition > 20
        };
      }));
    }, 10000);

    return () => clearInterval(maintenanceInterval);
  }, [workers]);

  const getLeadershipBonus = (worker) => {
    const nearbyLeaders = workers.filter(w => 
      w.id !== worker.id && 
      w.skills.leadership > 1 && 
      w.isActive
    );
    const leadershipEffect = nearbyLeaders.reduce((total, leader) => 
      total + (leader.skills.leadership - 1) * 0.05, 1);
    return Math.min(1.5, leadershipEffect);
  };

  const customizeWorker = (workerId, updates) => {
    if (updates.name !== undefined) {
      // İsim güncellemesi
      const newName = updates.name.trim();
      if (newName.length === 0) return; // Boş isim kontrolü

      setWorkers(prev => prev.map(worker => {
        if (worker.id === workerId) {
          return { ...worker, name: newName };
        }
        return worker;
      }));
    } else {
      // Diğer güncellemeler (avatar vb.)
      setWorkers(prev => prev.map(worker => {
        if (worker.id === workerId) {
          return { ...worker, ...updates };
        }
        return worker;
      }));
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'workers':
        return (
          <DetailsList>
            <Title>İşçi Listesi</Title>
            {workers.map(worker => (
              <DetailCard key={worker.id}>
                <PriceTag disabled={!canAfford(worker.upgradeCost)}>
                  Geliştirme: ${worker.upgradeCost}
                </PriceTag>
                <Avatar>{worker.avatar}</Avatar>
                <InfoSection $isActive={worker.isActive}>
                  <h4>
                    {worker.name}
                    <span className="status">
                      {worker.isActive ? 'Aktif' : 'Devre Dışı'}
                    </span>
                  </h4>
                  <StatsDisplay>
                    <div>🔨 Üretim: {worker.productivity.toFixed(1)}/s</div>
                    <div>📅 İşe Alım: {worker.hireDate}</div>
                    <div>⭐ Seviye: {worker.level}</div>
                  </StatsDisplay>
                </InfoSection>
                <ActionButtons>
                  <CustomizeButton
                    onClick={() => {
                      setSelectedWorker(worker);
                      setModalContent('workerCustomize');
                    }}
                    title="Özelleştir"
                  >
                    ✏️
                  </CustomizeButton>
                  <IconButton 
                    className="upgrade"
                    onClick={() => upgradeWorker(worker.id)}
                    disabled={!canAfford(worker.upgradeCost)}
                    title={`Geliştir (${worker.upgradeCost}$)`}
                  >
                    ⬆️
                  </IconButton>
                  <IconButton 
                    className="fire"
                    onClick={() => fireWorker(worker.id)}
                    title="İşten Çıkar"
                  >
                    🚫
                  </IconButton>
                </ActionButtons>
              </DetailCard>
            ))}
          </DetailsList>
        );
      case 'buildings':
        return (
          <DetailsList>
            <Title>Fabrika Listesi</Title>
            {buildings.map(building => (
              <DetailCard key={building.id}>
                <PriceTag disabled={!canAfford(building.upgradeCost)}>
                  Geliştirme: ${building.upgradeCost}
                </PriceTag>
                <Avatar>🏭</Avatar>
                <InfoSection $isActive={building.isActive}>
                  <h4>
                    {building.name}
                    <span className="status">
                      {building.isActive ? 'Aktif' : 'Devre Dışı'}
                    </span>
                  </h4>
                  <StatsDisplay>
                    <div>⚡ Üretim: {(building.productivity / products[building.productType].productionTime).toFixed(1)}/s</div>
                    <div>🔧 Durum: %{Math.floor(building.condition)}</div>
                    <div>📦 Ürün: {products[building.productType].name} (${(building.productivity / products[building.productType].productionTime * products[building.productType].price).toFixed(1)}/s)</div>
                    <div>⭐ Seviye: {building.level}</div>
                  </StatsDisplay>
                </InfoSection>
                <ActionButtons>
                  <IconButton 
                    onClick={() => {
                      setSelectedBuilding(building);
                      setModalContent('buildingManagement');
                    }}
                    title="Yönet"
                  >
                    ⚙️
                  </IconButton>
                  <IconButton 
                    className="fire"
                    onClick={() => demolishBuilding(building.id)}
                    title="Yık"
                  >
                    💣
                  </IconButton>
                </ActionButtons>
              </DetailCard>
            ))}
          </DetailsList>
        );
      case 'products':
        return (
          <DetailsList>
            <Title>Ürün Lisansları</Title>
            <ProductGrid>
              {Object.entries(products).map(([key, product]) => (
                <ProductCard 
                  key={key}
                  $unlocked={product.unlocked}
                  onClick={() => product.unlocked && selectProduct(key)}
                  style={selectedProduct === key ? { border: '2px solid #2ecc71' } : {}}
                >
                  <ProductImage>{product.icon}</ProductImage>
                  <h3>{product.name}</h3>
                  <p>Satış Fiyatı: ${product.price}</p>
                  <p>Üretim Süresi: {product.productionTime}s</p>
                  {!product.unlocked && (
                    <LicenseButton
                      onClick={(e) => {
                        e.stopPropagation();
                        unlockProduct(key);
                      }}
                      disabled={!canAfford(product.licenseCost)}
                    >
                      Lisans Al (${product.licenseCost})
                    </LicenseButton>
                  )}
                </ProductCard>
              ))}
            </ProductGrid>
          </DetailsList>
        );
      case 'research':
        return (
          <DetailsList>
            <Title>Araştırma ve Geliştirme</Title>
            <TechTree 
              technologies={technologies}
              onResearch={startResearch}
            />
          </DetailsList>
        );
      case 'market':
        return (
          <DetailsList>
            <Title>Pazar</Title>
            <MarketSystem
              products={products}
              marketPrices={marketPrices}
              priceHistory={priceHistory}
              onBuy={buyProduct}
              onSell={sellProduct}
              canAfford={canAfford}
            />
          </DetailsList>
        );
      case 'training':
        return (
          <>
            <ModalTitle>Eğitim Merkezi</ModalTitle>
            <TrainingCenter
              worker={selectedWorker}
              onStartTraining={(courseId, course) => 
                startTraining(selectedWorker.id, courseId, course)
              }
              canAfford={canAfford}
              activeTraining={activeTrainings[selectedWorker?.id]}
            />
          </>
        );
      default:
        return (
          <>
            <ResourceDisplay>
              <ResourceItem>
                <h2>${Math.floor(money)}</h2>
                <p>Toplam Para</p>
              </ResourceItem>
              <ResourceItem>
                <h3>{resources.workers}</h3>
                <p>İşçiler</p>
              </ResourceItem>
              <ResourceItem>
                <h3>{resources.buildings}</h3>
                <p>Binalar</p>
              </ResourceItem>
            </ResourceDisplay>
            
            <StatBox>
              <h4>Finansal Durum</h4>
              <Chart>
                <div className="chart-header">
                  <span>Son 30 Saniye</span>
                  {moneyHistory.length > 1 && (
                    <div className={`trend ${moneyHistory[moneyHistory.length - 1] >= moneyHistory[moneyHistory.length - 2] ? 'positive' : 'negative'}`}>
                      {moneyHistory[moneyHistory.length - 1] >= moneyHistory[moneyHistory.length - 2] ? '↗' : '↘'}
                      {Math.abs(((moneyHistory[moneyHistory.length - 1] - moneyHistory[moneyHistory.length - 2]) / moneyHistory[moneyHistory.length - 2]) * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
                <div className="chart-grid">
                  {[...Array(5)].map((_, i) => {
                    const maxValue = Math.max(...moneyHistory);
                    const value = maxValue - (i * (maxValue / 4));
                    return (
                      <div 
                        key={i} 
                        className="grid-line" 
                        data-value={`$${Math.floor(value).toLocaleString()}`}
                      />
                    );
                  })}
                </div>
                <div className="chart-line">
                  {moneyHistory.map((value, index) => {
                    const maxValue = Math.max(...moneyHistory);
                    const minValue = Math.min(...moneyHistory);
                    const range = maxValue - minValue;
                    const normalizedHeight = ((value - minValue) / (range || 1)) * 100;
                    
                    return (
                      <div
                        key={index}
                        className="bar"
                        style={{ height: `${normalizedHeight}%` }}
                        data-value={`$${value.toLocaleString()}`}
                      />
                    );
                  })}
                </div>
              </Chart>
            </StatBox>

            <StatBox>
              <h4>Detaylı İstatistikler</h4>
              <StatsDisplay>
                <div>💰 Saatlik Gelir: ${hourlyIncome.toFixed(2)}</div>
                <div>⚡ Toplam Üretim: {totalProduction.toFixed(1)}/s</div>
                <div>🏭 Fabrika Verimliliği: %{(avgFactoryEfficiency * 100).toFixed(1)}</div>
                <div>👥 İşçi Verimliliği: %{(avgWorkerEfficiency * 100).toFixed(1)}</div>
              </StatsDisplay>
            </StatBox>

            <ButtonGroup>
              <div style={{ position: 'relative' }}>
                <PriceTag disabled={!canAfford(costs.worker)}>
                  ${costs.worker.current}
                </PriceTag>
                <NeuButton onClick={hireWorker} disabled={!canAfford(costs.worker)}>
                  İşçi Kirala
                </NeuButton>
              </div>
              <div style={{ position: 'relative' }}>
                <PriceTag disabled={!canAfford(costs.building)}>
                  ${costs.building.current}
                </PriceTag>
                <NeuButton onClick={buildFactory} disabled={!canAfford(costs.building)}>
                  Fabrika İnşa Et
                </NeuButton>
              </div>
            </ButtonGroup>
          </>
        );
    }
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'workerUpgrade':
        return (
          <>
            <ModalTitle>İşçi Geliştirme - {selectedWorker.name}</ModalTitle>
            <ModalGrid>
              <StatBox>
                <div>
                  <h4>Üretim Becerisi</h4>
                  <SkillBar $progress={selectedWorker.skills.production * 10}>
                    <div />
                  </SkillBar>
                </div>
                <NeuButton
                  onClick={() => upgradeWorkerSkill('production')}
                  disabled={!canAfford(selectedWorker.upgradeCost)}
                >
                  Geliştir (${selectedWorker.upgradeCost}$)
                </NeuButton>
              </StatBox>
              <StatBox>
                <div>
                  <h4>Yönetim Becerisi</h4>
                  <SkillBar $progress={selectedWorker.skills.management * 10}>
                    <div />
                  </SkillBar>
                </div>
                <NeuButton
                  onClick={() => upgradeWorkerSkill('management')}
                  disabled={!canAfford(selectedWorker.upgradeCost)}
                >
                  Geliştir (${selectedWorker.upgradeCost}$)
                </NeuButton>
              </StatBox>
            </ModalGrid>
          </>
        );
      case 'buildingManagement':
        // Güncel fabrika bilgilerini al
        const currentBuilding = buildings.find(b => b.id === selectedBuilding.id);
        
        return (
          <>
            <ModalTitle>Fabrika Yönetimi - {currentBuilding.name}</ModalTitle>
            <ModalGrid>
              <StatBox>
                <CustomizeField>
                  <label>Fabrika Adı</label>
                  <input
                    type="text"
                    defaultValue={currentBuilding.name}
                    onChange={(e) => {
                      const newName = e.target.value.trim();
                      if (newName.length > 0) {
                        setBuildings(prev => prev.map(b => 
                          b.id === currentBuilding.id ? { ...b, name: newName } : b
                        ));
                      }
                    }}
                    maxLength={20}
                    placeholder="Fabrika adını girin"
                  />
                </CustomizeField>
              </StatBox>

              <StatBox>
                <h4>Bakım Durumu</h4>
                <StatsDisplay>
                  <div>🔧 Durum: %{Math.floor(currentBuilding.condition)}</div>
                  <div>⚡ Verimlilik: %{Math.floor((currentBuilding.condition / 100) * 100)}</div>
                </StatsDisplay>
                <NeuButton
                  onClick={() => repairBuilding(currentBuilding.id)}
                  disabled={!canAfford(calculateRepairCost(currentBuilding.condition))}
                >
                  Manuel Bakım Yap (${calculateRepairCost(currentBuilding.condition)})
                </NeuButton>
              </StatBox>

              <StatBox>
                <h4>Bakım İşçisi</h4>
                <select
                  value={currentBuilding.maintenanceWorker || ''}
                  onChange={(e) => assignWorkerToMaintenance(parseInt(e.target.value), currentBuilding.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    marginBottom: '10px'
                  }}
                >
                  <option value="">İşçi Seç</option>
                  {workers.map(worker => (
                    <option 
                      key={worker.id} 
                      value={worker.id}
                      disabled={worker.assignedTo && worker.assignedTo !== currentBuilding.id}
                    >
                      {worker.name} (Verim: {worker.productivity.toFixed(1)})
                    </option>
                  ))}
                </select>
                {currentBuilding.maintenanceWorker && (
                  <NeuButton
                    onClick={() => assignWorkerToMaintenance(null, currentBuilding.id)}
                    className="fire"
                  >
                    İşçiyi Çıkar
                  </NeuButton>
                )}
              </StatBox>

              <StatBox>
                <h4>Ürün Yönetimi</h4>
                <select
                  value={currentBuilding.productType}
                  onChange={(e) => changeFactoryProduct(currentBuilding.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                >
                  {Object.entries(products)
                    .filter(([_, product]) => product.unlocked)
                    .map(([key, product]) => (
                      <option key={key} value={key}>
                        {product.name} - ${(currentBuilding.productivity / product.productionTime * product.price).toFixed(1)}/s
                      </option>
                    ))}
                </select>
                <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#8899ac' }}>
                  Mevcut Kazanç: ${(currentBuilding.productivity / products[currentBuilding.productType].productionTime * products[currentBuilding.productType].price).toFixed(1)}/s
                </div>
              </StatBox>
            </ModalGrid>
          </>
        );
      case 'workerCustomize':
        return (
          <>
            <ModalTitle>İşçi Özelleştirme</ModalTitle>
            <CustomizeModal>
              <CustomizeField>
                <label>İşçi Adı</label>
                <input
                  type="text"
                  defaultValue={selectedWorker.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    if (newName.length > 0) {
                      customizeWorker(selectedWorker.id, { name: newName });
                    }
                  }}
                  onBlur={(e) => {
                    const newName = e.target.value.trim();
                    if (newName.length === 0) {
                      e.target.value = selectedWorker.name;
                    }
                  }}
                  maxLength={20}
                  placeholder="İşçi adını girin"
                />
              </CustomizeField>
              <CustomizeField>
                <label>Avatar Seç</label>
                <AvatarSelect>
                  {WORKER_AVATARS.map(avatar => (
                    <AvatarOption
                      key={avatar}
                      onClick={() => customizeWorker(selectedWorker.id, { avatar })}
                      $selected={selectedWorker.avatar === avatar}
                      title={getAvatarTitle(avatar)}
                    >
                      {avatar}
                    </AvatarOption>
                  ))}
                </AvatarSelect>
              </CustomizeField>
            </CustomizeModal>
          </>
        );
      default:
        return null;
    }
  };

  const changeFactoryProduct = (buildingId, newProductType) => {
    if (!products[newProductType].unlocked) return;

    setBuildings(prev => prev.map(building => {
      if (building.id === buildingId) {
        // Ürün değişiminde üretim hızını yeniden hesapla
        const oldProduct = products[building.productType];
        const newProduct = products[newProductType];
        const productionRateAdjustment = oldProduct.productionTime / newProduct.productionTime;
        
        return {
          ...building,
          productType: newProductType,
          productivity: building.productivity * productionRateAdjustment
        };
      }
      return building;
    }));
  };

  useEffect(() => {
    // Pazar fiyatlarını başlat
    const initialPrices = {};
    Object.keys(products).forEach(key => {
      initialPrices[key] = {
        currentPrice: products[key].price,
        trend: 0,
        volatility: Math.random() * 0.5 + 0.5
      };
    });
    setMarketPrices(initialPrices);
  }, [products]); // products değiştiğinde çalışsın

  const getAvatarTitle = (avatar) => {
    const titles = {
      '👨': 'Erkek İşçi',
      '👩': 'Kadın İşçi',
      '🧑': 'İşçi',
      '👨‍🔧': 'Erkek Teknisyen',
      '👩‍🔧': 'Kadın Teknisyen',
      '🧑‍🔧': 'Teknisyen',
      '👨‍🏭': 'Erkek Fabrika İşçisi',
      '👩‍🏭': 'Kadın Fabrika İşçisi',
      '🧑‍🏭': 'Fabrika İşçisi',
      '👨‍💼': 'Erkek Yönetici',
      '👩‍💼': 'Kadın Yönetici',
      '🧑‍💼': 'Yönetici',
      '👨‍🔬': 'Erkek Uzman',
      '👩‍🔬': 'Kadın Uzman',
      '🧑‍🔬': 'Uzman',
      '👨‍💻': 'Erkek Teknoloji Uzmanı',
      '👩‍💻': 'Kadın Teknoloji Uzmanı',
      '🧑‍💻': 'Teknoloji Uzmanı',
      '👷': 'İnşaat İşçisi',
      '💂': 'Güvenlik',
      '🤵': 'Yönetici',
      '🧙': 'Usta',
      '🦹': 'Süper İşçi',
      '🥷': 'Ninja İşçi'
    };
    return titles[avatar] || 'İşçi';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMoneyHistory(prev => {
        const newHistory = [...prev, money];
        if (newHistory.length > 30) newHistory.shift();
        return newHistory;
      });

      // Saatlik gelir hesaplama
      const hourlyInc = (money - moneyHistory[0]) * (3600 / (moneyHistory.length * 1000));
      setHourlyIncome(hourlyInc);

      // Verimlilik hesaplamaları
      const factoryEff = buildings.reduce((acc, b) => acc + (b.condition / 100), 0) / (buildings.length || 1);
      setAvgFactoryEfficiency(factoryEff);

      const workerEff = workers.reduce((acc, w) => acc + (w.productivity / 2), 0) / (workers.length || 1);
      setAvgWorkerEfficiency(workerEff);
    }, 1000);

    return () => clearInterval(interval);
  }, [money, buildings, workers]);

  const calculateRepairCost = (condition) => {
    const baseCost = 100;
    const damageFactor = (100 - condition) / 100;
    return Math.floor(baseCost * damageFactor * 2);
  };

  const repairBuilding = (buildingId) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      const repairCost = calculateRepairCost(building.condition);
      if (canAfford(repairCost)) {
        setMoney(prev => prev - repairCost);
        setBuildings(prev => prev.map(b => {
          if (b.id === buildingId) {
            return {
              ...b,
              condition: 100
            };
          }
          return b;
        }));
      }
    }
  };

  return (
    <>
      <Header>
        <Logo />
        <div className="stats-container">
          <div className="stat-item">
            <span className="icon">👥</span>
            <span>İşçiler:</span>
            <span className="value">{resources.workers}</span>
          </div>
          <div className="stat-item">
            <span className="icon">🏭</span>
            <span>Fabrikalar:</span>
            <span className="value">{resources.buildings}</span>
          </div>
          <div className="stat-item">
            <span className="icon">📦</span>
            <span>Ürünler:</span>
            <span className="value">{Math.floor(resources.products)}</span>
          </div>
          <MoneyDisplay>
            <span>💰</span>
            ${Math.floor(money).toLocaleString()}
          </MoneyDisplay>
        </div>
      </Header>
      <GameContainer>
        <TabContainer>
          <Tab 
            $active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Genel Bakış
            <span>📊</span>
          </Tab>
          <Tab 
            $active={activeTab === 'workers'} 
            onClick={() => setActiveTab('workers')}
          >
            İşçiler ({workers.length})
            <span>👥</span>
          </Tab>
          <Tab 
            $active={activeTab === 'buildings'} 
            onClick={() => setActiveTab('buildings')}
          >
            Fabrikalar ({buildings.length})
            <span>🏭</span>
          </Tab>
          <Tab 
            $active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')}
          >
            Ürünler
            <span>📦</span>
          </Tab>
          <Tab 
            $active={activeTab === 'research'} 
            onClick={() => setActiveTab('research')}
          >
            Araştırma
            <span>🔬</span>
          </Tab>
          <Tab 
            $active={activeTab === 'market'} 
            onClick={() => setActiveTab('market')}
          >
            Pazar
            <span>💹</span>
          </Tab>
        </TabContainer>

        <MainContent>
          <GlassPanel>
            {renderTabContent()}
          </GlassPanel>

          <GlassPanel>
            <Title>Üretim Alanı</Title>
            <ProductionInfo>
              {autoSell && (
                <div className="auto-sell-info">
                  🔄 Otomatik Satış Aktif - Her saniye ürünler otomatik satılıyor
                </div>
              )}
              <p>Üretim Hızı: {productionRate.toFixed(1)} /saniye</p>
              <p>Mevcut Ürünler: {Math.floor(resources.products)}</p>
              
              {buildings.length > 0 && (
                <>
                  <p>Ürün Fiyatları:</p>
                  <div className="products-info">
                    {Array.from(new Set(buildings.map(b => b.productType))).map(productType => (
                      <div key={productType} className="product-price">
                        {products[productType].icon} ${products[productType].price}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </ProductionInfo>
            <ButtonGroup>
              <NeuButton 
                onClick={sellProducts}
                disabled={resources.products < 1}
              >
                Ürünleri Sat (${(() => {
                  if (resources.products < 1) return 0;
                  
                  let totalValue = 0;
                  const productShare = Math.floor(resources.products / Math.max(1, buildings.length));
                  
                  if (buildings.length > 0) {
                    buildings.forEach(building => {
                      const product = products[building.productType];
                      totalValue += product.price * productShare;
                    });
                  } else {
                    totalValue = products.wood.price * Math.floor(resources.products);
                  }
                  
                  return Math.floor(totalValue);
                })()})
              </NeuButton>
              <AutoSellButton
  $active={autoSell}
  onClick={toggleAutoSell}
>
  {autoSell ? '🔄 Otomatik Satış Aktif' : '⭕ Otomatik Satış'}
</AutoSellButton>
            </ButtonGroup>
          </GlassPanel>
        </MainContent>
      </GameContainer>
      <Modal 
        isOpen={modalContent !== null} 
        onClose={() => {
          setModalContent(null);
          setSelectedWorker(null);
        }}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default Game; 