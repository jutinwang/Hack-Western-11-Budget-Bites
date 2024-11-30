import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Ingredient {
  id: string;
  name: string;
  category?: string;
}

interface IngredientTagsProps {
  ingredients?: Ingredient[];
  onRemove?: (id: string) => void;
  className?: string;
}

const IngredientTags = ({
  ingredients = [
    { id: "1", name: "Tomatoes", category: "Vegetables" },
    { id: "2", name: "Onions", category: "Vegetables" },
    { id: "3", name: "Olive Oil", category: "Pantry" },
  ],
  onRemove = () => {},
  className = "",
}: IngredientTagsProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 p-3 min-h-[60px] bg-background border rounded-md",
        className,
      )}
    >
      {ingredients.length === 0 ? (
        <div className="text-muted-foreground text-sm w-full text-center">
          No ingredients selected
        </div>
      ) : (
        ingredients.map((ingredient) => (
          <Badge
            key={ingredient.id}
            variant="secondary"
            className="inline-flex items-center h-6 text-xs px-2 gap-1 hover:bg-accent/80"
          >
            {ingredient.name}
            <button
              onClick={() => onRemove(ingredient.id)}
              className="inline-flex items-center justify-center hover:text-destructive focus:outline-none"
              aria-label={`Remove ${ingredient.name}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))
      )}
    </div>
  );
};

export default IngredientTags;
