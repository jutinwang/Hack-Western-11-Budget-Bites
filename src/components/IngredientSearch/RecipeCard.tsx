import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe?: {
    id: string;
    title: string;
    image: string;
    cookTime: string;
    servings: number;
    matchPercentage: number;
    ingredients?: string[];
  };
  onClick?: () => void;
  className?: string;
}

const RecipeCard = ({
  recipe = {
    id: "1",
    title: "Tomato Basil Pasta",
    image: "https://dummyimage.com/360x120/e5e7eb/666666.png&text=Recipe+Image",
    cookTime: "30 mins",
    servings: 4,
    matchPercentage: 85,
    ingredients: ["Tomatoes", "Basil", "Pasta", "Olive Oil"],
  },
  onClick = () => {},
  className = "",
}: RecipeCardProps) => {
  return (
    <Card
      className={cn(
        "w-[360px] h-[200px] bg-background overflow-hidden cursor-pointer hover:shadow-lg transition-all group",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className="w-full h-[120px] bg-cover bg-center group-hover:scale-105 transition-transform"
          style={{ backgroundImage: `url(${recipe.image})` }}
        />
        <Badge
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
          variant="secondary"
        >
          {recipe.matchPercentage}% match
        </Badge>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold truncate">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.cookTime}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {recipe.servings}
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary hover:text-primary/80">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.ingredients?.length || 0} items</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
