import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IngredientsList from "./IngredientsList";
import InstructionCard from "./InstructionCard";
import styled from "styled-components";
import { Button } from "./Button";
import { RecipeProps } from "./interfaces/Recipe";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import test from "../assets/test.jpg";

export const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  const [recipeId, setRecipeItemId] = useState<RecipeProps | null>(null);
  const navigate = useNavigate(); // Initialize the navigation function

  useEffect(() => {
    axios
      .get<RecipeProps>(`https://localhost:44369/api/Recipe/${id}`)
      .then((response) => {
        setRecipeItemId(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [id]);

  const deleteProduct = async (id: number | string) => {
    try {
      const response = await axios.delete<RecipeProps>(
        `https://localhost:44369/api/Recipe/${id}`
      );

      if (response.status === 200) {
        console.log(`OK`);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (id: number | string) => {
    if (id) {
      deleteProduct(id);
      console.log(`Recipe ${id} deleted`);
    } else {
      console.log("Please provide a valid product ID");
    }
  };

  const handleEdit = (id: number | string) => {
    if (id) {
      navigate(`/edit/${id}`);
    }
  };

  return recipeId ? (
    <Hero
      title={recipeId?.title}
      subtitle={recipeId?.description}
      image={test}
      children={
        <ButtonSection>
          <Button
            size="small"
            label="Remove"
            onClick={() => id && handleDelete(id)}
          />
          <Button
            size="small"
            primary
            label="Edit"
            onClick={() => id && handleEdit(id)}
          />
        </ButtonSection>
      }
      cardChildren={
        <RecipeDiv>
          <IngredientsList ingredients={recipeId.ingredients.$values} />
          <InstructionCard instructions={recipeId.instructions.$values} />
        </RecipeDiv>
      }
    />
  ) : (
    <>{Error}</>
  );
};

export default Recipe;

const RecipeDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const ButtonSection = styled.div`
  margin: var(--space-lg) var(--space-lg);
  position: absolute;
  top: 0;
  right: 0;
`;
