import { FC } from 'react';
import { RecipeIndex } from './RecipeIndex';
import './Card.css';

export const Card: FC = () => {
  return (
    <div className="book-container">
        <div className="index-card">
          <h2 className="index-title">Index</h2>
          <RecipeIndex />
        </div>
    </div>
  );
}; 