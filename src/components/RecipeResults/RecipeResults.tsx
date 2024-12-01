import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Clock, MapPin } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  totalCost: number;
  servings: number;
  cookTime: string;
  ingredients: Array<{
    name: string;
    amount: string;
    price: number;
    store: string;
    distance: number;
  }>;
}

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Budget-Friendly Pasta Primavera",
    totalCost: 12.5,
    servings: 4,
    cookTime: "30 mins",
    ingredients: [
      {
        name: "Pasta",
        amount: "1 lb",
        price: 2.99,
        store: "GroceryMart",
        distance: 0.5,
      },
      {
        name: "Mixed Vegetables",
        amount: "2 cups",
        price: 3.99,
        store: "FreshMarket",
        distance: 1.2,
      },
      {
        name: "Olive Oil",
        amount: "2 tbsp",
        price: 5.52,
        store: "GroceryMart",
        distance: 0.5,
      },
    ],
  },
  // Add more mock recipes as needed
];

export default function RecipeResults() {
  const [searchParams] = useSearchParams();
  const budget = searchParams.get("budget");
  const mealType = searchParams.get("type");

  // Sort recipes by total cost
  const sortedRecipes = [...mockRecipes].sort(
    (a, b) => a.totalCost - b.totalCost,
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight gradient-text">
              Budget Bites Results
            </h1>
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
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">1. Browse Recipes</h2>
            <p className="text-muted-foreground">
              Recipes are sorted from cheapest to most expensive, all within
              your budget
            </p>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {sortedRecipes.map((recipe) => (
                <Card key={recipe.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{recipe.title}</h3>
                      <Badge className="text-lg">
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
                      <h4 className="font-medium">2. Get Ingredients From:</h4>
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
                      <h4 className="font-medium">3. Total Cost Breakdown</h4>
                      <div className="mt-2 flex items-center justify-between text-lg">
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
      </main>
    </div>
  );
}
