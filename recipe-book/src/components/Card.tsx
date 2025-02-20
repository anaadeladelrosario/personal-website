import "../styles/design-system.css";
import styled from "styled-components";

export const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <BookContainer className="container">
      {title && <p>{title}</p>}
      {children}
    </BookContainer>
  );
};

export default Card;

const BookContainer = styled.div`
  text-align: center;
  margin-bottom: var(--space-sm);
`;
