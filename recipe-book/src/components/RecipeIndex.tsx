import { FC } from 'react';
import './RecipeIndex.css';

interface RecipeCategory {
  title: string;
  recipes: Array<{
    name: string;
    page: number;
  }>;
}

const categories: RecipeCategory[] = [
  {
    title: "Bread & Pastries",
    recipes: [
      { name: "Apple Pie", page: 2 },
      { name: "Bagels", page: 3 },
      { name: "Banana Bread", page: 4 },
      { name: "Bar Cookies", page: 5 },
      { name: "Biscotti", page: 6 },
      { name: "Biscuits", page: 7 },
      { name: "Blondies", page: 8 },
      { name: "Chocolate Chip Cookies", page: 9 },
      { name: "English Muffins", page: 10 },
      { name: "Flan", page: 11 },
      { name: "Garlic Bread", page: 12 }
    ]
  },
  {
    title: "Main Dishes",
    recipes: [
      { name: "Aussie Meat Pie", page: 14 },
      { name: "Eggplant Parmesan", page: 15 },
      { name: "Empanadas", page: 16 },
      { name: "Enchiladas", page: 17 },
      { name: "Fajitas", page: 18 }
    ]
  }
];

export const RecipeIndex: FC = () => {
  return (
    <div className="recipe-index">
      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <h3 className="category-title">{category.title}</h3>
          <div className="recipe-list">
            {category.recipes.map((recipe, recipeIndex) => (
              <div key={recipeIndex} className="recipe-item">
                <span className="recipe-name">{recipe.name}</span>
                <span className="recipe-dots"></span>
                <span className="recipe-page">{recipe.page}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Pagination */}
      <div className="pagination">
        <button className="prev-btn">Previous</button>
        <div className="page-numbers">
          <span>1</span>
          <span className="active">2</span>
          <span>3</span>
          <span>...</span>
          <span>68</span>
        </div>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
}; 