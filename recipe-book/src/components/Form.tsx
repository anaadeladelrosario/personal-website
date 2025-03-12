import { useEffect, useState } from "react";
import "./Form.css";
import "../styles/design-system.css";
import { Button } from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  categories,
  Categories,
  CostRange,
  costRanges,
  Cuisine,
  cuisines,
  difficulties,
  Difficulty,
  units,
  Units,
} from "./enums/formEnums";
import { FormData } from "./interfaces/Form";
import small from "../assets/small.jpg";
// import ImagePreview from "./ImagePreview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";

export function Form({ mode }: { mode: "create" | "edit" }) {
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
    ingredients: [
      {
        name: "",
        quantity: 0,
        unit: Units.Gram,
        optional: false,
        preparation: "",
      },
    ],
    instructions: [{ step: 1, description: "", image: "" }],
    tags: [],
    isVegetarian: false,
    notes: "",
  });

  // File state
  // const [file, setFile] = useState<File | null>(null);

  // State for tracking loading or errors
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>("");

  // Edit mode
  const { recipeId } = useParams(); // Get recipeId from the URL params
  const navigate = useNavigate(); // To navigate after submission
  const queryClient = useQueryClient();

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileList = event.target.files;
  //   if (fileList && fileList.length > 0) {
  //     setFile(fileList[0]);
  //   } else {
  //     setFile(null);
  //   }
  // };

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
        {
          name: "",
          quantity: 0,
          unit: Units.Gram,
          optional: false,
          preparation: "",
        },
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
        const response = await axios.put(
          `https://localhost:44369/api/Recipe/${recipeId}`,
          formData
        );

        if (response.status === 200) {
          console.log("Recipe updated successfully");
          navigate(`/Recipe/${recipeId}`);
        }
      } catch (error) {
        throw new Error("Failed to update the recipe");
      }
    }
  };

  const addRecipeMutation = useMutation({
    mutationFn: (formData: FormData) =>
      axios
        .post("https://localhost:44369/api/Recipe", formData)
        .then(() => {
          setFormData({
            title: "",
            ingredients: [],
            instructions: [],
            cuisine: Cuisine.Australian,
            category: Categories.MainCourse,
            difficulty: Difficulty.Easy,
            costRange: CostRange.Budget,
            notes: "",
            tags: [],
            isVegetarian: false,
            description: "",
            preparationTime: 0,
            cookingTime: 0,
            servings: 0,
          });
        })
        .catch((error) => {
          console.error("Error adding recipe:", error);
          throw error;
        }),
    onSuccess: () => {
      navigate("/");
      // Invalidate the "recipesKey" query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["recipesKey"] });
    },
  });
  const handleAddRecipe = () => {
    const newRecipe = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      cuisine: formData.cuisine,
      preparationTime: formData.preparationTime,
      cookingTime: formData.cookingTime,
      servings: formData.servings,
      difficulty: formData.difficulty,
      costRange: formData.costRange,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      tags: formData.tags,
      isVegetarian: formData.isVegetarian,
      notes: formData.notes,
    };
    addRecipeMutation.mutate(newRecipe);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    // setError("");

    if (recipeId) {
      handleUpdate();
      navigate(`/Recipe/${recipeId}`);
    } else {
      handleAddRecipe();
    }
  };

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(
        `https://localhost:44369/api/Recipe/${recipeId}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return {};
    }
  };

  const {
    data: recipeData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recipeDataKey"],
    queryFn: fetchRecipe,
    enabled: !!recipeId,
    refetchOnWindowFocus: true, // Refetch when the window is focused
  });

  // Fetch recipe data when the component mounts
  useEffect(() => {
    if (mode === "edit" && recipeId) {
      if (recipeData) {
        setFormData({
          title: recipeData.title,
          ingredients: recipeData.ingredients.$values,
          instructions: recipeData.instructions.$values,
          cuisine: recipeData.cuisine,
          category: recipeData.category,
          difficulty: recipeData.difficulty,
          costRange: recipeData.costRange,
          notes: recipeData.notes,
          tags: recipeData.tags,
          isVegetarian: recipeData.isVegetarian,
          description: recipeData.description,
          preparationTime: recipeData.preparationTime,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
        });
      }
    } else {
      setFormData({
        title: "",
        ingredients: [],
        instructions: [],
        cuisine: Cuisine.Australian,
        category: Categories.MainCourse,
        difficulty: Difficulty.Easy,
        costRange: CostRange.Budget,
        notes: "",
        tags: [],
        isVegetarian: false,
        description: "",
        preparationTime: 0,
        cookingTime: 0,
        servings: 0,
      });
    }
  }, [mode, recipeId, recipeData]);

  return (
    <div className="gingham-bg">
      <div className="container form-container">
        <form onSubmit={handleSubmit} className="form">
          <section className="form-section section1">
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
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Brief description of your recipe"
              />
            </div>
            <div className="form-group">
              <label>Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category || ""}
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
              <label htmlFor="cuisine">Cuisine*</label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine || ""}
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
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                placeholder="Any additional notes about the recipe..."
              />
            </div>
          </section>
          <section className="form-section section2">
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
                value={formData.difficulty || ""}
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
                value={formData.costRange || ""}
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
          </section>

          <section className="form-section section3">
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
                  value={formData.ingredients[index].unit || ""}
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
            <Button
              style={{ alignSelf: "center" }}
              label="+ Add Ingredient"
              type="button"
              onClick={addIngredient}
            />
          </section>

          <section className="form-section section4">
            <h3>Instructions</h3>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instruction-step">
                <label>Step {instruction.step}</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {instruction.image ? (
                    <>
                      <img
                        style={{
                          width: "20%",
                          fontWeight: "bold",
                        }}
                        src={small}
                        alt={`Step ${instruction.step} Image`}
                      />
                      <Button
                        className="remove-image-button"
                        style={{
                          borderRadius: "var(--radius-lg)",
                          position: "relative",
                        }}
                        size="x-small"
                        label="-"
                        type="button"
                        disabled={true}
                      >
                        <span className="tooltip">Remove image</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* <ImagePreview file={file} />
                      <input
                        type="file"
                        id="step-picture"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginBottom: "var(--space-xs)" }}
                      /> */}
                    </>
                  )}
                </div>

                <textarea
                  value={instruction.description || ""}
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
              </div>
            ))}
            <Button
              style={{ alignSelf: "center" }}
              label="+ Add Step"
              type="button"
              onClick={addInstruction}
            />
          </section>
          <div className="form-actions">
            <Button secondary type="reset" label="Cancel" />
            <Button disabled={true} type="button" label="Save as Draft" />
            <Button
              primary
              type="submit"
              label={isLoading ? "" : "Add Recipe"}
              disabled={isLoading}
            >
              {isLoading && <Spinner loading={isLoading} />}
            </Button>
          </div>
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
}

export default Form;
