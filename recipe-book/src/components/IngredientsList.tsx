import Ingredient, { IngredientProps } from "./Ingredient";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const IngredientsList = ({
  ingredients,
}: {
  ingredients: IngredientProps[];
}) => {
  return (
    <IngredientListWrapper>
      <h2>Ingredients</h2>
      {ingredients ? (
        ingredients.map((ingredient) => (
          <Ingredient
            key={uuidv4()}
            quantity={ingredient.quantity}
            name={ingredient.name}
            unit={ingredient.unit}
            optional={ingredient.optional}
          />
        ))
      ) : (
        <></>
      )}
    </IngredientListWrapper>
  );
};

export default IngredientsList;

const IngredientListWrapper = styled.div`
  flex: 1 1 300px;
  border-left: 3px solid #d0d0d0;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  padding: var(--space-3xl);
  box-shadow: inset 0px 0px 100px rgba(0, 0, 0, 0.15);
  background: linear-gradient(
    to right,
    var(--color-background) 94%,
    #cccccc 100%
  );
  z-index: var(--z-dropdown);
  min-height: 50vh;
  text-align: center;

  @media (max-width: 635px) {
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-xs);
  }
`;
