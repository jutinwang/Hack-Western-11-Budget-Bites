import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

const SearchInput = ({
  onSearch = () => {},
  placeholder = "Search for ingredients...",
  className = "",
  suggestions = ["Tomatoes", "Onions", "Garlic", "Olive Oil", "Salt"],
  onSuggestionSelect = () => {},
}: SearchInputProps) => {
  const [value, setValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative w-full bg-background", className)}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(value.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-8 w-full"
        />
      </div>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {suggestions
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(value.toLowerCase()),
            )
            .map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-accent cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
