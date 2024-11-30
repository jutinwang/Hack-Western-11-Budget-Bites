import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoreMap from "./StoreMap";
import PriceComparisonTable from "./PriceComparisonTable";
import FilterOptions from "./FilterOptions";
import { type Ingredient } from "@/lib/recipeMatching";

interface StorePanelProps {
  selectedStore?: string;
  selectedIngredients?: Ingredient[];
  onStoreSelect?: (storeId: string) => void;
  onSortChange?: (value: string) => void;
  onDistanceFilterChange?: (value: string) => void;
  onPriceFilterChange?: (value: string) => void;
  className?: string;
}

const StorePanel = ({
  selectedStore = "",
  selectedIngredients = [],
  onStoreSelect = () => {},
  onSortChange = () => {},
  onDistanceFilterChange = () => {},
  onPriceFilterChange = () => {},
  className = "",
}: StorePanelProps) => {
  return (
    <Card className="flex flex-col h-[982px] w-[500px] bg-background p-4 gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Store Locations
        </h2>
        <StoreMap
          selectedStore={selectedStore}
          onStoreSelect={onStoreSelect}
          className="w-full"
        />
      </div>

      <ScrollArea className="flex-1 w-full">
        <div className="space-y-4">
          <FilterOptions
            onSortChange={onSortChange}
            onDistanceFilterChange={onDistanceFilterChange}
            onPriceFilterChange={onPriceFilterChange}
            className="w-full"
          />
          <PriceComparisonTable
            selectedStore={selectedStore}
            onStoreSelect={onStoreSelect}
            selectedIngredients={selectedIngredients}
            className="w-full"
          />
        </div>
      </ScrollArea>
    </Card>
  );
};

export default StorePanel;
