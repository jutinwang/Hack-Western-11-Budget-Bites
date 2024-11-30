import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchInput from "./SearchInput";
import IngredientTags from "./IngredientTags";
import { type Ingredient } from "@/lib/recipeMatching";

interface SearchPanelProps {
  selectedIngredients?: Ingredient[];
  onSearch?: (value: string) => void;
  onIngredientSelect?: (ingredient: string) => void;
  onIngredientRemove?: (id: string) => void;
  className?: string;
}

const SearchPanel = ({
  selectedIngredients = [],
  onSearch = () => {},
  onIngredientSelect = () => {},
  onIngredientRemove = () => {},
  className = "",
}: SearchPanelProps) => {
  return (
    <Card className="flex flex-col h-[982px] w-[320px] bg-background p-4 gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Ingredients</h2>
        <SearchInput
          onSearch={onSearch}
          onSuggestionSelect={onIngredientSelect}
          className="w-full"
        />
      </div>

      <ScrollArea className="flex-1 w-full">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Selected Ingredients
            </h3>
            <IngredientTags
              ingredients={selectedIngredients}
              onRemove={onIngredientRemove}
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Vegetables",
                "Fruits",
                "Dairy",
                "Meat",
                "Pantry",
                "Spices",
              ].map((category) => (
                <button
                  key={category}
                  className="p-2 text-sm text-left hover:bg-accent rounded-md transition-colors"
                  onClick={() => onSearch(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SearchPanel;
