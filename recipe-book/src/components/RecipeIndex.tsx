import { FC } from 'react';
import './RecipeIndex.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { organizeRecipesByCategory } from '../utils/RecipeUtils';
import { Link } from 'react-router-dom';

export interface RecipeProps {
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

export const RecipeIndex: FC = () => {

  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calculate the total number of pages
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  console.log(totalPages);

   // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Group recipes by category
  const organizedRecipes = organizeRecipesByCategory(currentItems);

useEffect(() => {
        axios.get('https://localhost:44369/api/Recipe')
            .then(response => {
                setRecipes(response.data.$values);
            }) 
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

  return (
    <div className="recipe-index">
         <div className="category-section">
           {organizedRecipes.map((category, categoryIndex) => (
             <div key={categoryIndex} className="category-item">
               <h3 className="category-title">{category.category}</h3>
               <div className="recipe-list">
 {category.recipes.map((recipe, recipeIndex) => (
              <div key={recipeIndex} className="recipe-item">
                 <Link to={`/recipe/${recipe.id}`} className="recipe-name">{recipe.title}</Link>
                <span className="recipe-dots"></span>
                 <span className="recipe-page">{1}</span>
              </div>
              ))}
               </div>
             </div>
           ))}
         </div>
     
      {/* Pagination */}
      <div className="pagination">
        <button  onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} className="prev-btn">Previous</button>
        <div className="page-numbers">
          <span className="active">{currentPage}</span>
          {currentPage !== totalPages && <span>{currentPage + 1}</span>}
          <span>...</span>
          <span>{totalPages}</span>
        </div>
        <button  onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages} className="next-btn">Next</button>
      </div>
    </div>
  );
}; 