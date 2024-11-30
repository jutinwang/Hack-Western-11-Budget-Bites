import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";
import {
  type Recipe,
  type Ingredient,
  sortRecipesByMatch,
} from "@/lib/recipeMatching";

interface RecipePanelProps {
  recipes?: Recipe[];
  selectedIngredients?: Ingredient[];
  onRecipeSelect?: (recipeId: string) => void;
  selectedRecipe?: string;
  className?: string;
}

const defaultRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tomato Basil Pasta",
    image: "https://dummyimage.com/360x120/e5e7eb/666666.png&text=Recipe+1",
    cookTime: "20 mins",
    prepTime: "10 mins",
    totalTime: "30 mins",
    servings: 4,
    matchPercentage: 85,
    ingredients: [
      { name: "Pasta", amount: "500g" },
      { name: "Tomatoes", amount: "4 large" },
      { name: "Fresh Basil", amount: "1 bunch" },
      { name: "Olive Oil", amount: "3 tbsp" },
    ],
    instructions: [
      "Boil pasta according to package instructions",
      "Dice tomatoes and chop basil",
      "Combine all ingredients",
      "Season to taste",
    ],
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 65,
      fat: 14,
      fiber: 4,
    },
    difficulty: "Easy",
  },
  {
    id: "2",
    title: "Mediterranean Salad",
    image: "https://dummyimage.com/360x120/e5e7eb/666666.png&text=Recipe+2",
    cookTime: "10 mins",
    prepTime: "15 mins",
    totalTime: "25 mins",
    servings: 2,
    matchPercentage: 75,
    ingredients: [
      { name: "Cucumber", amount: "1 large" },
      { name: "Tomatoes", amount: "2 medium" },
      { name: "Red Onion", amount: "1/2" },
      { name: "Feta Cheese", amount: "100g" },
    ],
    instructions: [
      "Chop all vegetables",
      "Combine in a bowl",
      "Add feta cheese",
      "Drizzle with olive oil",
    ],
    nutrition: {
      calories: 320,
      protein: 15,
      carbs: 25,
      fat: 18,
      fiber: 6,
    },
    difficulty: "Easy",
  },
  {
    id: "3",
    title: "Garlic Bread",
    image: "https://dummyimage.com/360x120/e5e7eb/666666.png&text=Recipe+3",
    cookTime: "15 mins",
    prepTime: "5 mins",
    totalTime: "20 mins",
    servings: 6,
    matchPercentage: 60,
    ingredients: [
      { name: "Baguette", amount: "1" },
      { name: "Butter", amount: "100g" },
      { name: "Garlic", amount: "4 cloves" },
      { name: "Parsley", amount: "2 tbsp" },
    ],
    instructions: [
      "Mix butter with minced garlic and herbs",
      "Slice bread",
      "Spread mixture",
      "Bake until golden",
    ],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 22,
      fat: 8,
      fiber: 1,
    },
    difficulty: "Easy",
  },
];

const RecipePanel = ({
  recipes = defaultRecipes,
  selectedIngredients = [],
  onRecipeSelect = () => {},
  selectedRecipe = "",
  className = "",
}: RecipePanelProps) => {
  // Sort recipes based on ingredient matches
  const sortedRecipes = React.useMemo(
    () => sortRecipesByMatch(recipes, selectedIngredients),
    [recipes, selectedIngredients],
  );

  const selectedRecipeData = sortedRecipes.find((r) => r.id === selectedRecipe);

  return (
    <Card className="flex flex-col h-[982px] w-[320px] bg-background p-4 gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Recipe Ideas</h2>
        <p className="text-sm text-muted-foreground">
          {selectedIngredients.length
            ? `${sortedRecipes.length} recipes found with your ingredients`
            : "Select ingredients to find matching recipes"}
        </p>
      </div>

      <ScrollArea className="flex-1 w-full">
        <div className="space-y-4">
          {sortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onRecipeSelect(recipe.id)}
              className="w-full"
            />
          ))}
        </div>
      </ScrollArea>

      <Dialog
        open={!!selectedRecipeData}
        onOpenChange={() => onRecipeSelect("")}
      >
        <DialogContent className="p-0 border-0 max-w-[360px]">
          {selectedRecipeData && (
            <RecipeDetail
              recipe={selectedRecipeData}
              onClose={() => onRecipeSelect("")}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RecipePanel;
