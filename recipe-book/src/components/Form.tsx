import { useEffect, useState } from "react";
import "./Form.css";
import { Button } from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export enum Cuisine {
  Australian = "Australian",
  Brazilian = "Brazilian",
  Chinese = "Chinese",
  Cuban = "Cuban",
  Italian = "Italian",
  Japanese = "Japanese",
  Spanish = "Spanish",
  Swedish = "Swedish"
}
const cuisines = [
  Cuisine.Australian,
  Cuisine.Brazilian,
  Cuisine.Chinese,
  Cuisine.Cuban,
  Cuisine.Italian,
  Cuisine.Japanese,
  Cuisine.Spanish,
  Cuisine.Swedish,
];
export enum Categories {
  Appetizer = "Appetizer",
  MainCourse = "MainCourse",
  Dessert = "Dessert",
  Snack = "Snack",
}
const categories = [
  Categories.Appetizer,
  Categories.MainCourse,
  Categories.Dessert,
  Categories.Snack,
];

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
const difficulties = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];

export enum CostRange {
  Budget = "Budget",
  Moderate = "Moderate",
  Expensive = "Expensive",
}
const costRanges = [CostRange.Budget, CostRange.Moderate, CostRange.Expensive];

export enum Units {
  Gram = "g",
  Kilogram = "kg",
  Milliliter = "ml",
  Liter = "l",
  Ounce = "oz",
  Pound = "lb",
  Pinch = "pinch",
  Teaspoon = "tsp",
  Tablespoon = "tbsp",
  Cup = "cup",
  Pint = "pint",
  Quart = "quart",
  Gallon = "gallon",
}
const units = [
  Units.Gram,
  Units.Kilogram,
  Units.Milliliter,
  Units.Liter,
  Units.Ounce,
  Units.Pound,
  Units.Pinch,
  Units.Teaspoon,
  Units.Tablespoon,
  Units.Cup,
  Units.Pint,
  Units.Quart,
  Units.Gallon,
]

interface FormData {
  title: string;
  description: string;
  category: Categories;
  cuisine: Cuisine;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  difficulty: Difficulty;
  costRange: CostRange;
  ingredients: {
    name: string;
    quantity: number;
    unit: Units;
    optional: boolean;
    preparation?: string;
  }[];
  instructions: {
    step: number;
    description: string;
    image?: string;
  }[];
  tags: string[];
  isVegetarian: boolean;
  notes: string;
}

export function Form() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: Categories.MainCourse,
    cuisine: Cuisine.Australian,
    preparationTime: 0,
    cookingTime: 0,
    servings: 2,
    difficulty: Difficulty.Easy,
    costRange: CostRange.Budget,
    ingredients: [{ name: "", quantity: 0, unit: Units.Gram, optional: false, preparation: "" }],
    instructions: [{ step: 1, description: "", image: "" }],
    tags: [],
    isVegetarian: false,
    notes: "",
  });

    // State for tracking loading or errors
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Edit mode
  const { recipeId } = useParams(); // Get recipeId from the URL params
  const navigate = useNavigate(); // To navigate after submission

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
         { name: "", quantity: 0, unit: Units.Gram, optional: false, preparation: "" },
      ],
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step: prev.instructions.length + 1, description: "", image: "" },
      ],
    }));
  };

  // Handle form submission (update recipe)
  const handleUpdate = async () => {
    if (recipeId) {
      try {
        const response = await axios.put(`https://localhost:44369/api/Recipe/${recipeId}`, formData);

        if (response.status === 200) {
         console.log('Recipe updated successfully');
          // Navigate to the success page
          navigate(`/Recipe/${recipeId}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSubmitTest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recipe submitted:", formData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if(recipeId) {
      handleUpdate();
      navigate(`/Recipe/${recipeId}`);
    } else {
    try {
      const response = await fetch('https://localhost:44369/api/Recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  // Send the recipe object as the request body
      });

      if (!response.ok) {
        throw new Error('Failed to add the recipe');
      }

      const result = await response.json();
      console.log('Recipe added:', result);  // Log the response (new recipe with generated ID)
      setFormData({
        title: '',
        ingredients: [],
        instructions: [],
        cuisine: Cuisine.Australian,
        category: Categories.MainCourse,
        difficulty: Difficulty.Easy,
        costRange: CostRange.Budget,
        notes: '',
        tags: [],
        isVegetarian: false,
        description: "",
        preparationTime: 0,
        cookingTime: 0,
        servings: 0,
      });  // Reset form state after successful submit
      navigate('/');
    } catch (err) {
      setError('An error occurred while adding the recipe.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  };

    // Fetch recipe data when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        try {
          const response = await axios.get(`https://localhost:44369/api/Recipe/${recipeId}`);
           setFormData({
        title: response.data.title,
        ingredients:response.data.ingredients.$values,
        instructions:response.data.instructions.$values,
        cuisine: response.data.cuisine,
        category: response.data.category,
        difficulty: response.data.difficulty,
        costRange: response.data.costRange,
        notes: response.data.notes,
        tags: response.data.tags,
        isVegetarian: response.data.isVegetarian,
        description: response.data.description,
        preparationTime: response.data.preparationTime,
        cookingTime: response.data.cookingTime,
        servings: response.data.servings,
      });
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div className="gingham-bg">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <section className="basic-information">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label>Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Classic Chocolate Chip Cookies"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of your recipe"
              />
            </div>

            <div className="form-group">
              <label>Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cuisine*</label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
              >
                <option value="">Select cuisine</option>
                {cuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="recipe-details">
            <h3>Recipe Details</h3>

            <div className="form-group">
              <label>Preparation Time (minutes)*</label>
              <input
                type="number"
                id="preparationTime"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Cooking Time (minutes)*</label>
              <input
                type="number"
                id="cookingTime"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Servings*</label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Difficulty*</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value="">Select Difficulty</option>
                {difficulties.map((difficulty, index) => (
                  <option key={index} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="costRange">Cost Range</label>
              <select
                id="costRange"
                name="costRange"
                value={formData.costRange}
                onChange={handleChange}
              >
                <option value="">Select Cost Range</option>
                {costRanges.map((costRange, index) => (
                  <option key={index} value={costRange}>
                    {costRange}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="ingredients">
            <h3>Ingredients*</h3>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  placeholder="e.g., Flour"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  min="0"
                  required
                />
                <select
                  id="unit"
                  name="unit"
                  value={formData.ingredients[index].unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                  required
                >
                  <option value="">Select Unit</option>
                  {units.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <label>
                  <input
                    type="checkbox"
                    checked={ingredient.optional}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "optional",
                        e.target.checked
                      )
                    }
                  />
                  Optional
                </label>
              </div>
            ))}
            <Button label="+ Add Ingredient" type="button" onClick={addIngredient}/>
          </section>

          <section className="instructions">
            <h3>Instructions</h3>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instruction-step">
                <label>Step {instruction.step}</label>
                <textarea
                  value={instruction.description}
                  onChange={(e) => {
                    const newInstructions = [...formData.instructions];
                    newInstructions[index].description = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      instructions: newInstructions,
                    }));
                  }}
                  placeholder="Describe this step"
                />
                <Button label="+ Add Image" type="button"/>
              </div>
            ))}
            <Button label="+ Add Step" type="button" onClick={addInstruction}/>
          </section>

          <section className="additional-information">
            <h3>Additional Information</h3>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Type and press Enter to add tags"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={formData.isVegetarian}
                  onChange={handleChange}
                />
                Vegetarian
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional notes about the recipe..."
              />
            </div>
          </section>

          <div className="form-actions">
            <Button disabled={true} type="button" label="Save as Draft" />
            <Button primary={true} type="submit" label="Publish Recipe" disabled={isLoading} > {isLoading ? 'Adding...' : 'Add Recipe'}</Button>
          </div>
        </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Form;
