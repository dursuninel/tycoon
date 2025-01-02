import React from 'react';
import styled from 'styled-components';
import { COURSES } from '../../../data/courses';

const TrainingContainer = styled.div`
  padding: 20px;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CourseCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin: 10px 0;
  overflow: hidden;

  div {
    height: 100%;
    background: #2ecc71;
    width: ${props => props.$progress}%;
    transition: width 0.3s ease;
  }
`;

const TrainingButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: ${props => props.disabled ? '#666' : '#2ecc71'};
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const TrainingCenter = ({ 
  worker,
  onStartTraining,
  canAfford,
  activeTraining
}) => {
  return (
    <TrainingContainer>
      <h3>Eğitim Merkezi - {worker.name}</h3>
      <CourseGrid>
        {Object.entries(COURSES).map(([id, course]) => {
          const isTraining = activeTraining?.courseId === id;
          const canTake = !course.requires || worker.completedCourses?.includes(course.requires);
          const alreadyCompleted = worker.completedCourses?.includes(id);

          return (
            <CourseCard key={id}>
              <h4>{course.name}</h4>
              <p>{course.description}</p>
              <p>Süre: {course.duration}s</p>
              <p>Maliyet: ${course.cost}</p>
              {isTraining && (
                <ProgressBar $progress={(activeTraining.progress / course.duration) * 100}>
                  <div />
                </ProgressBar>
              )}
              <TrainingButton
                onClick={() => onStartTraining(id, course)}
                disabled={
                  isTraining || 
                  !canTake || 
                  alreadyCompleted || 
                  !canAfford(course.cost)
                }
              >
                {alreadyCompleted ? 'Tamamlandı' : 
                  isTraining ? 'Eğitimde' : 
                  !canTake ? 'Kilit' :
                  'Eğitime Başla'}
              </TrainingButton>
            </CourseCard>
          );
        })}
      </CourseGrid>
    </TrainingContainer>
  );
};

export default TrainingCenter; 