import React from "react";
import SearchPanel from "./IngredientSearch/SearchPanel";
import StorePanel from "./IngredientSearch/StorePanel";
import RecipePanel from "./IngredientSearch/RecipePanel";
import { type Ingredient } from "@/lib/recipeMatching";

function Home() {
  const [selectedStore, setSelectedStore] = React.useState("");
  const [selectedRecipe, setSelectedRecipe] = React.useState("");
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    Ingredient[]
  >([]);

  const handleIngredientSelect = (ingredientName: string) => {
    const newIngredient: Ingredient = {
      id: Math.random().toString(36).substr(2, 9),
      name: ingredientName,
    };
    setSelectedIngredients([...selectedIngredients, newIngredient]);
  };

  const handleIngredientRemove = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== id));
  };

  return (
    <div className="min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="Budget Bites Logo" className="logo" />
            <h1 className="text-4xl font-bold tracking-tight gradient-text">
              Budget Bites
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex items-start justify-center gap-4">
          <SearchPanel
            selectedIngredients={selectedIngredients}
            onIngredientSelect={handleIngredientSelect}
            onIngredientRemove={handleIngredientRemove}
          />
          <StorePanel
            selectedStore={selectedStore}
            onStoreSelect={setSelectedStore}
            selectedIngredients={selectedIngredients}
          />
          <RecipePanel
            selectedRecipe={selectedRecipe}
            onRecipeSelect={setSelectedRecipe}
            selectedIngredients={selectedIngredients}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
