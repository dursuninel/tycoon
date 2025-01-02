import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/components/Text.styles';
import { NeuButton } from '../../styles/components/Button.styles';

const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ResearchCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  opacity: ${props => props.$canResearch ? 1 : 0.5};
`;

const ProgressBar = styled.div`
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

const Research = ({
  technologies,
  activeResearch,
  onStartResearch,
  canAfford
}) => {
  return (
    <div>
      <Title>Araştırma ve Geliştirme</Title>
      <ResearchGrid>
        {Object.entries(technologies).map(([category, techs]) => (
          <div key={category}>
            <h3>{category}</h3>
            {Object.entries(techs).map(([id, tech]) => (
              <ResearchCard 
                key={id}
                $canResearch={tech.canResearch}
              >
                <h4>{tech.name}</h4>
                <p>{tech.description}</p>
                {tech.researching && (
                  <ProgressBar $progress={(tech.progress / tech.researchTime) * 100}>
                    <div />
                  </ProgressBar>
                )}
                {!tech.completed && !tech.researching && (
                  <NeuButton
                    onClick={() => onStartResearch(id)}
                    disabled={!tech.canResearch || !canAfford(tech.cost)}
                  >
                    Araştır (${tech.cost})
                  </NeuButton>
                )}
              </ResearchCard>
            ))}
          </div>
        ))}
      </ResearchGrid>
    </div>
  );
};

export default Research; 