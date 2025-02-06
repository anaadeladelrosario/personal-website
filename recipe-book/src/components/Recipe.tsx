import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import spices from '../assets/spices.jpg'
import IngredientsList from './IngredientsList';
import InstructionCard from './InstructionCard';
import styled from 'styled-components';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

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

export interface Recipe {
        id?: number;
        title: string;
        description: string;
        category:string;
        cuisine:string;
        preparationTime: number;
        notes: string;
        cookingTime: number;
        servings: number;
        difficulty: string;
        costRange: string;
        instructions:InstructionsProps[];
        ingredients:IngredientProps[];
        tags: string[];
        isVegetarian: boolean;
      };

export const Recipe : React.FC = () => {
   const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
   const [recipeId, setRecipeItemId] = useState<Recipe | null>(null);
   const navigate = useNavigate(); // Initialize the navigation function

    useEffect(() => {
        axios.get<Recipe>(`https://localhost:44369/api/Recipe/${id}`)
            .then(response => {
                setRecipeItemId(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, [id]);

    const deleteProduct = async (id: number | string) => {
    try {
      const response = await  axios.delete<Recipe>(`https://localhost:44369/api/Recipe/${id}`);

      if (response.status === 200) {
        console.log(`OK`);
         navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (id: number | string) => {
    if (recipeId) {
      deleteProduct(id);
      console.log(`Recipe ${recipeId?.title} deleted`);
    } else {
      console.log('Please provide a valid product ID');
    }
  };

  const handleEdit = (id: number | string) => {
    if (recipeId) {
      navigate(`/edit/${id}`);
    }
  };

    return recipeId ? (
    <div className="gingham-bg">
      <div className="hero-section">
        <img src={spices} alt="Hero Image" className="hero-image" />
          <h1 className="book-title">{recipeId?.title}</h1>
      </div>
      <div style={{backgroundColor:'var(--color-warning)', padding:'var(--space-xs)'}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', }}>
         <Button size="small" primary label="Remove" onClick={()=> id && handleDelete(id)} />
         <Button size="small" primary label="Edit" onClick={()=> id && handleEdit(id)} />
        </div>
       <div style={{  borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warning)', margin: 'var(--space-xs)', padding:'var(--space-xs)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', gap: '10px' }} className="button-section">
         <p>{recipeId.description}</p> 
        </div>
        <RecipeDiv>
       <div style={{ flex: '1 1 300px', backgroundColor: 'white',borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-md)', maxWidth: '800px' }}>
        <IngredientsList ingredients={recipeId.ingredients.$values} />
      </div>
      <div style={{ flex: '1 1 300px', backgroundColor: 'white',borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', boxShadow: 'var(--shadow-md)', maxWidth: '800px' }}>
        <InstructionCard instructions={recipeId.instructions.$values} />
      </div>
        </RecipeDiv>
      </div>
   </div>

    ):(<>{Error}</>)
}

export default Recipe;

const RecipeDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: var(--space-xs);
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;