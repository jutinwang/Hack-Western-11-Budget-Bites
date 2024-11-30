export interface Ingredient {
  id: string;
  name: string;
  category?: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  servings: number;
  ingredients: Array<{ name: string; amount: string }>;
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  difficulty: "Easy" | "Medium" | "Hard";
}

export function calculateRecipeMatch(
  selectedIngredients: Ingredient[],
  recipe: Recipe,
): number {
  if (!selectedIngredients.length) return 0;

  const recipeIngredientNames = recipe.ingredients.map((ing) =>
    ing.name.toLowerCase(),
  );
  const selectedIngredientNames = selectedIngredients.map((ing) =>
    ing.name.toLowerCase(),
  );

  // Count matching ingredients
  const matchingIngredients = selectedIngredientNames.filter((ingredient) =>
    recipeIngredientNames.some(
      (recipeIng) =>
        recipeIng.includes(ingredient) || ingredient.includes(recipeIng),
    ),
  );

  // Calculate base match percentage
  const baseMatchPercentage =
    (matchingIngredients.length / recipe.ingredients.length) * 100;

  // Calculate coverage percentage (how many of selected ingredients are used)
  const coveragePercentage =
    (matchingIngredients.length / selectedIngredientNames.length) * 100;

  // Weighted average favoring recipes that use more of the selected ingredients
  const weightedMatch = baseMatchPercentage * 0.4 + coveragePercentage * 0.6;

  return Math.round(weightedMatch);
}

export function sortRecipesByMatch(
  recipes: Recipe[],
  selectedIngredients: Ingredient[],
): Recipe[] {
  return [...recipes]
    .map((recipe) => ({
      ...recipe,
      matchPercentage: calculateRecipeMatch(selectedIngredients, recipe),
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
