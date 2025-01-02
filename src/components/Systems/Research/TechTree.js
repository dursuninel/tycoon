import React from 'react';
import styled from 'styled-components';

const TechTreeContainer = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
`;

const TechCategory = styled.div`
  margin-bottom: 30px;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const TechCard = styled.div`
  background: ${props => props.$unlocked ? 
    'linear-gradient(145deg, #2e2e2e, #1a1a1a)' : 
    'rgba(255, 255, 255, 0.03)'};
  padding: 15px;
  border-radius: 12px;
  cursor: ${props => props.$canResearch ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.$unlocked ? 1 : 0.7};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.$canResearch ? 'translateY(-5px)' : 'none'};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;

  div {
    height: 100%;
    background: #2ecc71;
    width: ${props => props.$progress}%;
    transition: width 0.3s ease;
  }
`;

const TechTree = ({ technologies, onResearch }) => {
  return (
    <TechTreeContainer>
      {Object.entries(technologies).map(([category, techs]) => (
        <TechCategory key={category}>
          <h3>{category}</h3>
          <TechGrid>
            {Object.entries(techs).map(([id, tech]) => (
              <TechCard
                key={id}
                $unlocked={tech.unlocked}
                $canResearch={tech.canResearch}
                onClick={() => tech.canResearch && onResearch(id)}
              >
                <h4>{tech.name}</h4>
                <p>{tech.description}</p>
                <p>Maliyet: ${tech.cost}</p>
                <p>Süre: {tech.researchTime}s</p>
                {tech.researching && (
                  <ProgressBar $progress={(tech.progress / tech.researchTime) * 100}>
                    <div />
                  </ProgressBar>
                )}
              </TechCard>
            ))}
          </TechGrid>
        </TechCategory>
      ))}
    </TechTreeContainer>
  );
};

export default TechTree; 