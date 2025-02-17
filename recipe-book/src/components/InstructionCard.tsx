import React from "react";
import { InstructionsProps } from "../components/interfaces/Recipe";

const Instruction: React.FC<InstructionsProps> = ({
  step,
  description,
  image,
}) => {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {image && (
        <img
          src={image}
          alt={`Image for step ${step}`}
          style={{ width: "10%", fontWeight: "bold" }}
        />
      )}
      <div style={{ width: "10%", fontWeight: "bold" }}>{step}.</div>
      <div style={{ width: "90%", textAlign: "left" }}>{description}</div>
    </div>
  );
};

const InstructionCard: React.FC<{ instructions: InstructionsProps[] }> = ({
  instructions,
}) => {
  return (
    <div
      style={{
        flex: "1 1 300px",
        backgroundColor: "white",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-xl)",
        maxWidth: "800px",
      }}
    >
      <h2>Directions</h2>
      {instructions.map((instruction) => (
        <Instruction
          key={instruction.id}
          step={instruction.step}
          description={instruction.description}
          image={instruction.image}
        />
      ))}
    </div>
  );
};

export default InstructionCard;
