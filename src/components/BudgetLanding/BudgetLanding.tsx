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
import { GeometricBackground } from "../shared/GeometricBackground";

const mealTypes = [
  { value: "breakfast", label: "🌅 Breakfast" },
  { value: "lunch", label: "🌞 Lunch" },
  { value: "dinner", label: "🌙 Dinner" },
];

export default function BudgetLanding() {
  const navigate = useNavigate();
  const [budget, setBudget] = React.useState("");
  const [mealType, setMealType] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/recipes?budget=${budget}&type=${mealType}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <GeometricBackground />

      <Card className="w-full max-w-[768px] p-12 space-y-10 bg-white/95 backdrop-blur-xl border-2 shadow-2xl relative z-10 hover:shadow-3xl transition-all duration-300">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#df591f] to-[#45bed4] opacity-20 rounded-full blur-xl animate-pulse" />
              <img
                src="/logo.png"
                alt="Budget Bites"
                className="relative w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight gradient-text">
            Budget Bites
          </h1>
          <p className="text-muted-foreground">
            Find delicious recipes within your budget
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-[#df591f]/10 rounded-full text-[#df591f]">
                  1
                </span>
                Set Your Budget
              </h2>
              <Input
                type="number"
                placeholder="Enter your budget in $"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                min="1"
                className="text-lg shadow-sm hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-[#45bed4]/10 rounded-full text-[#45bed4]">
                  2
                </span>
                Choose Meal Time
              </h2>
              <Select value={mealType} onValueChange={setMealType} required>
                <SelectTrigger className="text-lg shadow-sm hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Select meal time" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="text-lg"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#df591f] to-[#45bed4] hover:scale-[1.02]"
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
