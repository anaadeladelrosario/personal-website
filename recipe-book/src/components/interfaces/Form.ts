import {
  Categories,
  Cuisine,
  Difficulty,
  CostRange,
  Units,
} from "../enums/formEnums";

export interface FormData {
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
