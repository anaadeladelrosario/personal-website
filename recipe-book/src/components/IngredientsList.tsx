import React from "react";
import Ingredient, { IngredientProps } from "./Ingredient";
import { v4 as uuidv4 } from "uuid";

const IngredientsList: React.FC<{ ingredients: IngredientProps[] }> = ({
  ingredients,
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
      <h2>Ingredients</h2>
      {ingredients.map((ingredient) => (
        <Ingredient
          key={uuidv4()}
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
