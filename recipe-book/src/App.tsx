import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { MainLayout } from "./components/layouts/MainLayout";
import { Form } from "./components/Form";
import { Recipe } from "./components/Recipe";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/add-recipe" element={<Form mode="create" />} />
      <Route path="/edit/:recipeId" element={<Form mode="edit" />} />{" "}
      {/* Edit route */}
      <Route path="/Recipe/:id" element={<Recipe />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
    // <Router>
    //   <div
    //     style={{
    //       backgroundSize: "30px 30px",
    //       backgroundPosition: "0 0, 15px 15px",
    //       backgroundImage:
    //         "linear-gradient(90deg,rgba(214, 79, 41, 0.4) 50%,transparent 0),linear-gradient(0deg, rgba(214, 79, 41, 0.4) 50%, transparent 0)",
    //     }}
    //     className="landing-page"
    //   >
    //     <AppHeader />
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           <Hero
    //             title="Your Recipe Book"
    //             subtitle="Click on a recipe to view its details"
    //             image={test}
    //             cardChildren={<RecipeIndex />}
    //           />
    //         }
    //       />
    //       <Route path="/add-recipe" element={<Form />} />
    //       <Route path="/edit/:recipeId" element={<Form />} /> {/* Edit route */}
    //       <Route path="/Recipe/:id" element={<Recipe />} />
    //     </Routes>
    //     <div className="footer">
    //       <p>Footer</p>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;
