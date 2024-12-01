import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import BudgetLanding from "./components/BudgetLanding/BudgetLanding";
import RecipeResults from "./components/RecipeResults/RecipeResults";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<BudgetLanding />} />
        <Route path="/recipes" element={<RecipeResults />} />
      </Routes>
    </Suspense>
  );
}

export default App;
