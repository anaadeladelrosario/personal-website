import React from 'react';
import { InstructionsProps } from './Recipe';

const Instruction: React.FC<InstructionsProps> = ({ step, description, image }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      {image && <img src={image} alt={`Image for step ${step}`} style={{ width: '10%', fontWeight: 'bold' }} />}
      <div style={{ width: '10%', fontWeight: 'bold' }}>{step}.</div>
      <div style={{ width: '90%', textAlign: 'left' }}>{description}</div>
    </div>
  );
};

const InstructionCard: React.FC<{instructions: InstructionsProps[]}> = ({instructions}) => {

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Directions</h2>
      {instructions.map((instruction) => (
        <Instruction key={instruction.id} step={instruction.step} description={instruction.description} image={instruction.image} />
      ))}
    </div>
  );
};

export default InstructionCard;