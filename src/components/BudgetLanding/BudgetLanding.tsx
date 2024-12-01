import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CookingPot } from "lucide-react";

const mealTypes = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snacks", label: "Snacks" },
  { value: "gluten-free", label: "Gluten Free" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "keto", label: "Keto" },
];

export default function BudgetLanding() {
  const navigate = useNavigate();
  const [budget, setBudget] = React.useState("");
  const [mealType, setMealType] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      navigate(`/recipes?budget=${budget}&type=${mealType}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#45bed4] via-[#2a9b75] to-[#df591f]/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight gradient-text">
            Budget Bites
          </h1>
          <p className="text-muted-foreground">
            Find delicious recipes within your budget
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                1. Set Your Budget
              </h2>
              <Input
                type="number"
                placeholder="Enter your budget in $"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                min="1"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                2. Choose Meal Type
              </h2>
              <Select value={mealType} onValueChange={setMealType} required>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-lg h-12"
            disabled={!budget || !mealType || isLoading}
          >
            {isLoading ? (
              <>
                <CookingPot className="mr-2 h-5 w-5 animate-bounce" />
                Cooking up results...
              </>
            ) : (
              "Make me cheap food 🍳"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
