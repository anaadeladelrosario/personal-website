import Hero from "../Hero";
import { RecipeIndex } from "../RecipeIndex";
import test from "../../assets/test.jpg";

export const HomePage = () => {
  return (
    <Hero
      title="Your Recipe Book"
      subtitle="Click on a recipe to view its details"
      image={test}
      cardChildren={<RecipeIndex />}
    />
  );
};
