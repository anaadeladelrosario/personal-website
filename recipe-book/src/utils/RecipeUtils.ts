import { RecipeProps } from "../components/RecipeIndex";

export function organizeRecipesByCategory(recipes: RecipeProps[]) {
    // Group recipes by category
    const groupedRecipes = recipes.reduce((acc, recipe) => {
        if (!acc[recipe.category]) {
            acc[recipe.category] = [];
        }
        acc[recipe.category].push(recipe);
        return acc;
    }, {} as { [key: string]: RecipeProps[] });

    // Sort categories alphabetically
    const sortedCategories = Object.keys(groupedRecipes).sort();

    // Sort recipes within each category alphabetically
    const organizedRecipes = sortedCategories.map(category => ({
        category,
        recipes: groupedRecipes[category].sort((a, b) => a.title.localeCompare(b.title))
    }));

    return organizedRecipes;
}