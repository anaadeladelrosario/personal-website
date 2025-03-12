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
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Recipe = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  const [recipeId, setRecipeItemId] = useState<RecipeProps | null>(null);
  const navigate = useNavigate(); // Initialize the navigation function
  const queryClient = useQueryClient();

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

  const deleteRecipeMutation = useMutation({
    mutationFn: (id: number | string) =>
      axios
        .delete<RecipeProps>(`https://localhost:44369/api/Recipe/${id}`)
        .catch((error) => {
          console.error("Error deleting recipe:", error);
          throw error;
        }),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["recipesKey"] });
    },
  });

  const handleDelete = (id: number | string) => {
    deleteRecipeMutation.mutate(id);
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
            label="Delete"
            size="small"
            onClick={() => id && handleDelete(id)}
            secondary={true}
          />
          <Button
            label="Edit"
            size="small"
            primary
            onClick={() => id && handleEdit(id)}
          />
        </ButtonSection>
      }
      cardChildren={
        <RecipeDiv>
          <IngredientsList ingredients={recipeId.ingredients.$values} />
          <Wire className="wire" />
          <InstructionCard instructions={recipeId.instructions.$values} />
        </RecipeDiv>
      }
    />
  ) : (
    <>{<p>Error</p>}</>
  );
};

export default Recipe;

const RecipeDiv = styled.div`
  position: relative;
  justify-content: space-between;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1px;
  @media (max-width: 610px) {
    gap: var(--space-xs);
  }
`;

const ButtonSection = styled.div`
  position: relative;
  float: right;
`;

const Wire = styled.div`
  position: absolute;
  top: 50%;
  left: 49.9%;
  width: 0.18em; /* Adjust the thickness of the wire */
  height: 96%; /* Make sure the wire connects both boxes */
  background: #333; /* Wire color */
  transform: translateY(-50%); /* Center the wire vertically */
  background: radial-gradient(circle at 0% center, #333 60%, #cccccc 100%);
  @media (max-width: 635px) {
    display: none;
  }
`;
