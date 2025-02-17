import "./Card.css";
import "../styles/design-system.css";

export const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="container book-container">
      <div
        style={{
          marginBottom: "var(--space-xs)",
          textAlign: "center",
          padding: "var(--space-xs)",
        }}
      >
        {title && <p>{title}</p>}
      </div>
      {children}
    </div>
  );
};
