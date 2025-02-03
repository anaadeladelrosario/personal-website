import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import spices from '../assets/spices.jpg'
import IngredientsList from './IngredientsList';
import InstructionCard from './InstructionCard';
import styled from 'styled-components';

export interface InstructionsProps {
  id?: number,
  step: number,
  description: string,
  image: string | null,
}

export interface IngredientProps {
  id?: number,
  quantity: number,
  name: string,
  unit: string,
  optional: boolean,
  preparation: string | null,
}

interface Recipe {
        id: number;
        title: string;
        description: string;
        category:string;
        cuisine:string;
        preparationTime: number;
        cookingTime: number;
        servings: number;
        difficulty: string;
        costRange: string;
        instructions:InstructionsProps[];
        ingredients:IngredientProps[];
      };

export const Recipe : React.FC = () => {
   const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
   const [recipeId, setRecipeItemId] = useState<Recipe | null>(null);

    useEffect(() => {
        axios.get<Recipe>(`https://localhost:44369/api/Recipe/${id}`)
            .then(response => {
                setRecipeItemId(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, [id]);

    return recipeId ? (
    <div className="gingham-bg">
      <div className="hero-section">
        <img src={spices} alt="Hero Image" className="hero-image" />
          <h1 className="book-title">{recipeId?.title}</h1>
      </div>
       <div style={{  maxWidth: "800px", width: '90%', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warning)', margin: 'var(--space-sm)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }} className="button-section">
         <p>{recipeId.description}</p> 
        </div>
        <RecipeDiv>
       <div style={{ flex: '1 1 300px', backgroundColor: 'white',borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-md)', maxWidth: '800px', margin: '0 auto' }}>
        <IngredientsList ingredients={recipeId.ingredients.$values} />
      </div>
      <div style={{ flex: '1 1 300px', backgroundColor: 'white',borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-md)', maxWidth: '800px', margin: '0 auto' }}>
        <InstructionCard instructions={recipeId.instructions.$values} />
      </div>
        </RecipeDiv>
      </div>
   
    ):(<>{Error}</>)
}

export default Recipe;

const RecipeDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  width: 90%;
  max-width: 1024px;
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;