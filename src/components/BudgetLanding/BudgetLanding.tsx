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
    <div className="min-h-screen relative overflow-hidden bg-[#45bed4] flex items-center justify-center p-4">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base Layer - Large Shapes */}
        <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] bg-[#2a9b75] rotate-12 transform-gpu rounded-[100px] opacity-70 blur-3xl" />
        <div className="absolute w-[120%] h-[120%] -bottom-[10%] -right-[10%] bg-[#df591f] -rotate-12 transform-gpu rounded-[100px] opacity-60 blur-3xl" />

        {/* Middle Layer - Geometric Patterns */}
        <div className="absolute inset-0">
          {/* Hexagonal Grid Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div
              className="absolute w-48 h-48 bg-white/20 rotate-45 transform-gpu"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            />
            <div
              className="absolute w-48 h-48 bg-white/20 rotate-45 transform-gpu left-48"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            />
            <div
              className="absolute w-48 h-48 bg-white/20 rotate-45 transform-gpu top-48"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            />
          </div>

          {/* Floating Geometric Elements */}
          <div className="absolute w-64 h-64 bg-[#45bed4]/40 rounded-3xl rotate-12 blur-xl animate-float-slow top-1/4 left-1/4 transform-gpu" />
          <div className="absolute w-72 h-72 bg-[#2a9b75]/40 rounded-3xl -rotate-12 blur-xl animate-float-medium bottom-1/4 right-1/4 transform-gpu" />
          <div className="absolute w-56 h-56 bg-[#df591f]/40 rounded-3xl rotate-45 blur-xl animate-float-fast top-1/3 right-1/3 transform-gpu" />
        </div>

        {/* Top Layer - Sharp Geometric Accents */}
        <div className="absolute inset-0">
          <div className="absolute w-32 h-32 border-4 border-white/10 rotate-45 top-20 left-20 transform-gpu" />
          <div className="absolute w-24 h-24 border-4 border-white/10 rotate-12 bottom-40 right-40 transform-gpu" />
          <div className="absolute w-40 h-40 border-4 border-white/10 -rotate-12 top-1/2 left-1/3 transform-gpu" />
        </div>

        {/* Overlay Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* Main Content */}
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
