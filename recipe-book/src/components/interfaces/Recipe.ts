export interface InstructionsProps {
  id?: number;
  step: number;
  description: string;
  image: string | null;
}

export interface IngredientProps {
  id?: number;
  quantity: number;
  name: string;
  unit: string;
  optional: boolean;
  preparation: string | null;
}

export interface RecipeProps {
  id?: number;
  title: string;
  description: string;
  category: string;
  cuisine: string;
  preparationTime: number;
  notes: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  costRange: string;
  instructions: InstructionsProps[];
  ingredients: IngredientProps[];
  tags: string[];
  isVegetarian: boolean;
}
