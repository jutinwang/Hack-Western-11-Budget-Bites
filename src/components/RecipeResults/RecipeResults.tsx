import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ChefHat } from "lucide-react";
import { GeometricBackground } from "../shared/GeometricBackground";
import api from "@/api/axios.config";

interface Recipe {
  name: string;
  price_range: number;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  ingredients: Array<{
    name: string;
    price: number;
    store: string;
  }>;
}

export default function RecipeResults() {
  const [searchParams] = useSearchParams();
  const budget = searchParams.get("budget");
  const category = searchParams.get("category");
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    try {
      const response = await api.post("/meals", {
        budget,
        category,
      });
      setRecipes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, [budget, category]);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GeometricBackground />

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
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="space-y-6">
            {recipes.map((recipe) => (
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white/95 backdrop-blur-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{recipe.name}</h3>
                    </div>
                    <Badge className="text-lg bg-primary">
                      ${recipe.price_range.toFixed(2)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Ingredients & Stores:</h4>
                    <div className="grid gap-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md bg-accent/10"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{ingredient}</div>
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
                        ${recipe.price_range.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
