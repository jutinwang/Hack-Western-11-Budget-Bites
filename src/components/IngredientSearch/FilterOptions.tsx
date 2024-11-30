import React from "react";
import { SlidersHorizontal, ArrowUpDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterOptionsProps {
  onSortChange?: (value: string) => void;
  onDistanceFilterChange?: (value: string) => void;
  onPriceFilterChange?: (value: string) => void;
  className?: string;
}

const FilterOptions = ({
  onSortChange = () => {},
  onDistanceFilterChange = () => {},
  onPriceFilterChange = () => {},
  className = "",
}: FilterOptionsProps) => {
  return (
    <div
      className={cn(
        "w-full bg-background p-2 border rounded-md flex flex-col gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select defaultValue="price-asc" onValueChange={onSortChange}>
          <SelectTrigger className="min-w-[120px] text-xs">
            <div className="flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3 shrink-0" />
              <SelectValue placeholder="Sort" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low-High</SelectItem>
            <SelectItem value="price-desc">Price: High-Low</SelectItem>
            <SelectItem value="distance-asc">Nearest First</SelectItem>
            <SelectItem value="distance-desc">Farthest First</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="5" onValueChange={onDistanceFilterChange}>
          <SelectTrigger className="min-w-[110px] text-xs">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" />
              <SelectValue placeholder="Range" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">≤ 1 mile</SelectItem>
            <SelectItem value="5">≤ 5 miles</SelectItem>
            <SelectItem value="10">≤ 10 miles</SelectItem>
            <SelectItem value="25">≤ 25 miles</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all" onValueChange={onPriceFilterChange}>
          <SelectTrigger className="min-w-[100px] text-xs">
            <div className="flex items-center gap-1">
              <span className="shrink-0">$</span>
              <SelectValue placeholder="Price" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">$ Budget</SelectItem>
            <SelectItem value="medium">$$ Average</SelectItem>
            <SelectItem value="high">$$$ Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterOptions;
