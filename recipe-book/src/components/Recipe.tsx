import { useState, useEffect } from 'react';
import axios from 'axios';

type RecipeProps = {
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
    };

const Recipe = () => {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);

    useEffect(() => {
        axios.get('https://localhost:44369/api/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);
    return (
         <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.title} - ${recipe.description}
          </li>
        ))}
      </ul>
    </div>
    )
}

export default Recipe;