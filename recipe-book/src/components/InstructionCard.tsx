import { InstructionsProps } from "../components/interfaces/Recipe";
import styled from "styled-components";

const Instruction = ({ step, description, image }: InstructionsProps) => {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {image && (
        <img
          src={image}
          alt={`Image for step ${step}`}
          style={{ width: "10%", fontWeight: "bold" }}
        />
      )}
      <div style={{ width: "10%" }}>
        <p style={{ fontWeight: "bold" }}>{step}.</p>
      </div>
      <div style={{ width: "90%", textAlign: "left" }}>
        <p>{description}</p>
      </div>
    </div>
  );
};

const InstructionCard = ({
  instructions,
}: {
  instructions: InstructionsProps[];
}) => {
  return (
    <InstructionWrapper>
      <h2>Directions</h2>
      {instructions ? (
        instructions.map((instruction) => (
          <Instruction
            key={instruction.id}
            step={instruction.step}
            description={instruction.description}
            image={instruction.image}
          />
        ))
      ) : (
        <></>
      )}
    </InstructionWrapper>
  );
};

export default InstructionCard;

const InstructionWrapper = styled.div`
  flex: 1 1 300px;
  border-right: 3px solid #d0d0d0;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  padding: var(--space-3xl);
  box-shadow: inset 0px 0px 100px rgba(0, 0, 0, 0.15);
  background: linear-gradient(
    to left,
    var(--color-background) 94%,
    #cccccc 100%
  );
  z-index: var(--z-dropdown);
  min-height: 50vh;
  text-align: center;
  @media (max-width: 635px) {
    border-radius: var(--radius-lg);
  }
`;
