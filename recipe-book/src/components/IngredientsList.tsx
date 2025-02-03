import React from 'react';
import Ingredient, { IngredientProps } from './Ingredient';
import { v4 as uuidv4 } from 'uuid';

const IngredientsList: React.FC<{ingredients: IngredientProps[]}> = ({ingredients}) =>{
  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Ingredients</h2>
      {ingredients.map((ingredient) => (
        <Ingredient key={uuidv4()}
          quantity={ingredient.quantity}
          name={ingredient.name}
          unit={ingredient.unit}
          optional={ingredient.optional}
        />
      ))}
    </div>
  );
};

export default IngredientsList;