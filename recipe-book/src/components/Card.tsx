import "../styles/design-system.css";
import styled from "styled-components";

export const Card = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
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
