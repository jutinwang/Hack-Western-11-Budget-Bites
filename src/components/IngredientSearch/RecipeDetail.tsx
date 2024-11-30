import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, X, Flame, Scale, Apple } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeDetailProps {
  recipe?: {
    id: string;
    title: string;
    image: string;
    cookTime: string;
    prepTime: string;
    totalTime: string;
    servings: number;
    ingredients: Array<{ name: string; amount: string }>;
    instructions: string[];
    matchPercentage: number;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
    difficulty: "Easy" | "Medium" | "Hard";
  };
  onClose?: () => void;
  className?: string;
}

const RecipeDetail = ({
  recipe = {
    id: "1",
    title: "Tomato Basil Pasta",
    image: "https://dummyimage.com/360x200/e5e7eb/666666.png&text=Recipe+Image",
    cookTime: "20 mins",
    prepTime: "10 mins",
    totalTime: "30 mins",
    servings: 4,
    ingredients: [
      { name: "Pasta", amount: "500g" },
      { name: "Tomatoes", amount: "4 large" },
      { name: "Fresh Basil", amount: "1 bunch" },
      { name: "Olive Oil", amount: "3 tbsp" },
      { name: "Garlic", amount: "3 cloves" },
      { name: "Parmesan", amount: "50g" },
      { name: "Salt", amount: "to taste" },
      { name: "Black Pepper", amount: "to taste" },
    ],
    instructions: [
      "Bring a large pot of salted water to boil. Add pasta and cook according to package instructions.",
      "Meanwhile, dice tomatoes and roughly chop the basil leaves.",
      "In a large pan, heat olive oil over medium heat. Add minced garlic and sauté until fragrant.",
      "Add diced tomatoes to the pan and cook for 5-7 minutes until they start to break down.",
      "Drain pasta, reserving 1/2 cup of pasta water.",
      "Add pasta to the pan with tomatoes, toss to combine. Add pasta water if needed.",
      "Stir in fresh basil and grated parmesan cheese.",
      "Season with salt and pepper to taste. Serve hot with extra parmesan if desired.",
    ],
    matchPercentage: 85,
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 65,
      fat: 14,
      fiber: 4,
    },
    difficulty: "Easy",
  },
  onClose = () => {},
  className = "",
}: RecipeDetailProps) => {
  return (
    <Card
      className={cn(
        "w-[360px] h-[600px] bg-background flex flex-col shadow-xl",
        className,
      )}
    >
      <div className="relative">
        <div
          className="w-full h-[200px] bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.image})` }}
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <Badge
          className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
          variant="secondary"
        >
          {recipe.difficulty}
        </Badge>
      </div>

      <div className="p-6 flex-1 overflow-hidden">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{recipe.title}</h2>
              <span className="text-primary font-medium">
                {recipe.matchPercentage}% match
              </span>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.totalTime}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {recipe.servings}
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                {recipe.ingredients.length} items
              </div>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-3 grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="flex justify-center">
                <Flame className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xs font-medium mt-1">Calories</div>
              <div className="text-sm">{recipe.nutrition.calories}</div>
            </div>
            <div>
              <div className="flex justify-center">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xs font-medium mt-1">Protein</div>
              <div className="text-sm">{recipe.nutrition.protein}g</div>
            </div>
            <div>
              <div className="flex justify-center">
                <Apple className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xs font-medium mt-1">Carbs</div>
              <div className="text-sm">{recipe.nutrition.carbs}g</div>
            </div>
            <div>
              <div className="flex justify-center">
                <div className="h-4 w-4 text-primary font-bold">F</div>
              </div>
              <div className="text-xs font-medium mt-1">Fat</div>
              <div className="text-sm">{recipe.nutrition.fat}g</div>
            </div>
          </div>

          <ScrollArea className="h-[240px] pr-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{ingredient.name}</span>
                      <span className="text-muted-foreground">
                        {ingredient.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <ol className="space-y-2">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="font-medium text-primary">
                        {index + 1}.
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default RecipeDetail;
