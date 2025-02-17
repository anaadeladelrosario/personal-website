import { AppHeader } from "./components/AppHeader";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Recipe from "./components/Recipe";
import test from "./assets/test.jpg";
import { RecipeIndex } from "./components/RecipeIndex";

function App() {
  return (
    <Router>
      <div className="landing-page">
        <AppHeader username="Ana" onLogout={() => {}} />
        <Routes>
          <Route
            path="/"
            element={
              <Hero
                title="Your Recipe Book"
                image={test}
                cardTitle="Click on a recipe to view more details"
                cardChildren={<RecipeIndex />}
              />
            }
          />
          <Route path="/add-recipe" element={<Form />} />
          <Route path="/edit/:recipeId" element={<Form />} /> {/* Edit route */}
          <Route path="/Recipe/:id" element={<Recipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
