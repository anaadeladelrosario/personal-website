import { useState } from "react";
import "./Form.css";
import { Button } from "./Button";

const cuisines = ["Argentinian", "Australian", "Cuban", "Italian", "Other"];
const categories = ["Main Dishes", "Desserts", "Bread & Pastries", "Beverages"];
const difficulties = ["Easy", "Medium", "Hard"];
const costRanges = ["Budget", "Moderate", "Expensive"];
const units = [
  "g",
  "kg",
  "ml",
  "l",
  "oz",
  "lb",
  "pinch",
  "tsp",
  "tbsp",
  "cup",
  "pint",
  "quart",
  "gallon",
  "ounce",
  "pound",
  "pinch",
  "teaspoon",
  "tablespoon",
  "cup",
  "pint",
  "quart",
  "gallon",
];

interface FormData {
  title: string;
  description: string;
  category: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  costRange: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
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

export function RecipeForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    cuisine: "",
    prepTime: 0,
    cookTime: 0,
    servings: 2,
    difficulty: "",
    costRange: "",
    ingredients: [{ name: "", quantity: 0, unit: "", optional: false }],
    instructions: [{ step: 1, description: "" }],
    tags: [],
    isVegetarian: false,
    notes: "",
  });

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
        { name: "", quantity: 0, unit: "", optional: false },
      ],
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step: prev.instructions.length + 1, description: "" },
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recipe submitted:", formData);
  };

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
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Cooking Time (minutes)*</label>
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
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
            <h3>Ingredients</h3>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  placeholder="e.g., Flour"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  min="0"
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
            <button type="button" onClick={addIngredient}>
              + Add Ingredient
            </button>
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
                <button disabled={true} type="button">
                  + Add Image
                </button>
              </div>
            ))}
            <button type="button" onClick={addInstruction}>
              + Add Step
            </button>
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
            <Button primary={true} type="submit" label="Publish Recipe" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
