import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.tsx";
import { Recipe } from "./container/Recipe/Recipe.tsx";
import { NewRecipe } from "./container/Recipe/NewRecipe.tsx";
import { EditRecipe } from "./container/Recipe/EditRecipe.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Recipe />} />
          <Route path="/add" element={<NewRecipe />} />
          <Route path={"/:edit"} element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
