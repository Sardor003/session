import { configureStore } from "@reduxjs/toolkit";
import { RecipeReducer } from "../features/recipes";

const store = configureStore({
  reducer: {
    recipe: RecipeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
