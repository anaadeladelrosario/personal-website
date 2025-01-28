import { FC } from 'react';
import { RecipeIndex } from './RecipeIndex';
import './Card.css';

export const Card: FC = () => {
  return (
    <div className="book-container">
        <div className="index-card">
          <h1 className="index-title">Index</h1>
          <RecipeIndex />
        </div>
    </div>
  );
}; 