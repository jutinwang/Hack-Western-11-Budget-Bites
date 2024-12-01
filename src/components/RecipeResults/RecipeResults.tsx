import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Clock, MapPin, ChefHat } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  totalCost: number;
  servings: number;
  cookTime: string;
  category: "quick" | "protein" | "vegetarian" | "global" | "comfort";
  dietaryTypes: Array<
    "vegetarian" | "vegan" | "gluten-free" | "keto" | "dairy-free"
  >;
  ingredients: Array<{
    name: string;
    amount: string;
    price: number;
    store: string;
    distance: number;
  }>;
}

const mockRecipes: Recipe[] = [
  // Quick & Easy Category
  {
    id: "1",
    title: "15-Minute Stir-Fry Noodles",
    category: "quick",
    dietaryTypes: ["vegetarian"],
    totalCost: 12.5,
    servings: 4,
    cookTime: "15 mins",
    ingredients: [
      {
        name: "Rice Noodles",
        amount: "1 lb",
        price: 3.99,
        store: "AsianMarket",
        distance: 1.2,
      },
      {
        name: "Mixed Vegetables",
        amount: "2 cups",
        price: 3.99,
        store: "FreshMarket",
        distance: 0.8,
      },
      {
        name: "Tofu",
        amount: "14 oz",
        price: 2.99,
        store: "AsianMarket",
        distance: 1.2,
      },
    ],
  },
  {
    id: "2",
    title: "Quick Mediterranean Bowl",
    category: "quick",
    dietaryTypes: ["vegetarian", "gluten-free"],
    totalCost: 14.75,
    servings: 3,
    cookTime: "20 mins",
    ingredients: [
      {
        name: "Quinoa",
        amount: "1.5 cups",
        price: 4.99,
        store: "WholeFoods",
        distance: 1.5,
      },
      {
        name: "Chickpeas",
        amount: "2 cans",
        price: 3.98,
        store: "GroceryMart",
        distance: 0.5,
      },
      {
        name: "Feta Cheese",
        amount: "4 oz",
        price: 3.99,
        store: "FreshMarket",
        distance: 0.8,
      },
    ],
  },
  // Add more recipes...
];

export default function RecipeResults() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const budget = searchParams.get("budget");
  const mealType = searchParams.get("type");

  // Sort recipes by total cost
  const sortedRecipes = [...mockRecipes].sort(
    (a, b) => a.totalCost - b.totalCost,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#45bed4] via-[#2a9b75] to-[#df591f]/40">
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight gradient-text">
                Budget Bites Results
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg">
                Budget: ${budget}
              </Badge>
              <Badge variant="outline" className="text-lg capitalize">
                {mealType?.replace("-", " ")}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="space-y-8">
          {/* Steps 1-2 would go here */}

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                3. Browse Recipes
              </h2>
              <p className="text-white/80">
                Recipes are sorted from cheapest to most expensive, all within
                your budget
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[
                    "All",
                    "Quick",
                    "Protein",
                    "Vegetarian",
                    "Global",
                    "Comfort",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category.toLowerCase()
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setSelectedCategory(category.toLowerCase())
                      }
                      className="min-w-[100px]"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedRecipes
                      .filter((recipe) =>
                        selectedCategory === "all"
                          ? true
                          : recipe.category === selectedCategory,
                      )
                      .map((recipe) => (
                        <Card
                          key={recipe.id}
                          className="p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-xl font-semibold">
                                  {recipe.title}
                                </h3>
                                <div className="flex gap-2 mt-1">
                                  {recipe.dietaryTypes.map((type) => (
                                    <Badge
                                      key={type}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {type}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Badge className="text-lg bg-primary">
                                ${recipe.totalCost.toFixed(2)}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Serves {recipe.servings}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {recipe.cookTime}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium">
                                Ingredients & Stores:
                              </h4>
                              <div className="grid gap-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 rounded-md bg-accent/10"
                                  >
                                    <div className="space-y-1">
                                      <div className="font-medium">
                                        {ingredient.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {ingredient.amount}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                      <div className="text-right">
                                        <div className="font-medium">
                                          ${ingredient.price.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {ingredient.store}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {ingredient.distance} mi
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t">
                              <div className="flex items-center justify-between text-lg">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-5 w-5 text-primary" />
                                  <span>Total Cost</span>
                                </div>
                                <span className="font-bold text-primary">
                                  ${recipe.totalCost.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
