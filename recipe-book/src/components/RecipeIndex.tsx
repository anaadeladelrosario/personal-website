import { FC } from "react";
import "./RecipeIndex.css";
import "../styles/design-system.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { organizeRecipesByCategory } from "../utils/RecipeUtils";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { RecipeProps } from "./interfaces/Recipe";

export const RecipeIndex: FC = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calculate the total number of pages
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Group recipes by category
  const organizedRecipes = organizeRecipesByCategory(currentItems);

  useEffect(() => {
    axios
      .get("https://localhost:44369/api/Recipe")
      .then((response) => {
        setRecipes(response.data.$values);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div className="recipe-index">
      <h2>Index</h2>
      <div>
        {organizedRecipes.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="category-title">{category.category}</h3>
            <div>
              {category.recipes.map((recipe, recipeIndex) => (
                <div key={recipeIndex} className="recipe-item">
                  <Link to={`/Recipe/${recipe.id}`}>{recipe.title}</Link>
                  <span className="recipe-dots"></span>
                  <span>{1}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Button
          label="Previous"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          size="x-small"
        />
        <div className="page-numbers">
          <span className="active">{currentPage}</span>
          {currentPage !== totalPages && <span>{currentPage + 1}</span>}
          <span>...</span>
          <span>{totalPages}</span>
        </div>
        <Button
          label="Next"
          primary={true}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="x-small"
        />
      </div>
    </div>
  );
};
