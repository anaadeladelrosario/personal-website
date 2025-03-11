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
import { NotFoundPage } from "./components/pages/NotFoundPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/add-recipe" element={<Form mode="create" />} />
        <Route path="/edit/:recipeId" element={<Form mode="edit" />} />
        <Route path="/Recipe/:id" element={<Recipe />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
