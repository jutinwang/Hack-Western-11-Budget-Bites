import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./components/Login/Login";
import BudgetLanding from "./components/BudgetLanding/BudgetLanding";
import RecipeResults from "./components/RecipeResults/RecipeResults";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

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
