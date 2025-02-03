import './Card.css';

export const Card: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="book-container">  
        <div className="index-card">
          {children}
        </div>
    </div>
  );
}; 